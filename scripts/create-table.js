const DynamoDB = require('aws-sdk/clients/dynamodb');

const db = new DynamoDB({
    endpoint: process.env.NODE_ENV === 'development' ? process.env.AWS_ENDPOINT : undefined,
    region: process.env.DYNAMODB_REGION,
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY
});

// define table-name, primary key & secondary index
const schema = {
    AttributeDefinitions: [
        {
            AttributeName: 'user_id',
            AttributeType: 'S'
        },
        {
            AttributeName: 'spotify_id',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'user_id',
            KeyType: 'HASH'
        }
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'spotify_id_index',
            KeySchema: [
                {
                    AttributeName: 'spotify_id',
                    KeyType: 'HASH'
                }
            ],
            Projection: {
                ProjectionType: 'KEYS_ONLY'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'spotify_users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

db.createTable(schema, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
