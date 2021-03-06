import axios from 'axios';
import querystring from 'querystring';
import db from '../js/dynamodb';
import { encrypt } from '../js/crypto';

export default async function (req, res) {
    const { code, state } = req.query;
    const { uid } = req.cookies;

    if (uid !== state) {
        return res.status(401).json({ error: 'state_mismatch' });
    }

    try {
        const basic = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;

        // get access and refresh tokens
        const codes = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization: `Basic ${Buffer.from(basic).toString('base64')}`,
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

        // encrypt refresh token
        const { code: encrypted_token, iv } = encrypt(refresh_token);

        // prepare data to insert to database
        const data = {
            TableName: 'spotify_users',
            Item: {
                refresh_token: { S: encrypted_token },
                iv: { S: iv },
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

        res.redirect(`/code?uid=${data.Item.user_id.S}`);
    } catch (err) {
        let message;
        if (err.response && err.response.data && err.response.data.error) {
            message = err.response && err.response.data.error;
        } else if (err.message) {
            message = err.message;
        } else {
            message = 'Something went Wrong';
        }

        return res.status(401).json({
            error: message
        });
    }
}
