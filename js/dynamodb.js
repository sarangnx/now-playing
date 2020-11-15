import DynamoDB from 'aws-sdk/clients/dynamodb';
import { decrypt } from './crypto';

const db = new DynamoDB({
    endpoint: process.env.NODE_ENV === 'development' ? process.env.AWS_ENDPOINT : undefined,
    region: process.env.DYNAMODB_REGION,
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY
});

export default db;

/**
 * Get user's refresh token from database
 *
 * @param {String} uid - User Id
 */
export async function getRefreshToken(uid) {
    const item = await db
        .getItem({
            Key: {
                user_id: { S: uid }
            },
            TableName: 'spotify_users'
        })
        .promise();

    if (item.Item && item.Item.refresh_token) {
        // decrypt refresh_token
        const refresh_token = decrypt(item.Item.refresh_token.S, item.Item.iv.S);

        return refresh_token;
    }
}
