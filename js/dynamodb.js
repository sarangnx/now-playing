import DynamoDB from 'aws-sdk/clients/dynamodb';

const db = new DynamoDB({
    endpoint: process.env.NODE_ENV === 'development' ? process.env.AWS_ENDPOINT : undefined,
    region: process.env.AWS_REGION
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
        return item.Item.refresh_token.S;
    }
}