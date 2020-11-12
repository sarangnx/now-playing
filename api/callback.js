import axios from 'axios';
import querystring from 'querystring';
const DynamoDB = require('aws-sdk/clients/dynamodb');

const db = new DynamoDB({
    endpoint: process.env.NODE_ENV === 'development' ? process.env.AWS_ENDPOINT : undefined,
    region: process.env.AWS_REGION
});

export default async function(req, res) {
    const { code, state } = req.query;
    const { uid } = req.cookies;

    if (uid !== state) {
        return res.status(401).json({ error: 'state_mismatch' });
    }

    try {
        const bearer = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;

        // get access and refresh tokens
        const codes = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization: `Basic ${Buffer.from(bearer).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI
            })
        });

        const { access_token, refresh_token } = codes.data;

        // get spotify user profile
        const profile = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: { Authorization: `Bearer ${access_token}` }
        });

        // search for user with spotify.id in database
        const items = await db
            .query({
                TableName: 'spotify_users',
                IndexName: 'spotify_id_index',
                KeyConditionExpression: 'spotify_id = :id',
                ExpressionAttributeValues: { ':id': { S: profile.data.id } }
            })
            .promise();

        // prepare data to insert to database
        const data = {
            TableName: 'spotify_users',
            Item: {
                refresh_token: { S: refresh_token },
                spotify_id: { S: profile.data.id }
            }
        };

        // if user was already added to database, use old user_id
        // else use user_id passed through `state` after authorization
        if (items.Count > 0) {
            data.Item.user_id = items.Items[0].user_id;
        } else {
            data.Item.user_id = { S: state };
        }

        // add or update item
        await db.putItem(data).promise();

        res.json({ uid: data.Item.user_id.S });
    } catch (err) {
        return res.status(401).json({
            error: err.response && err.response.data ? err.response.data.error : 'invalid_code'
        });
    }
}
