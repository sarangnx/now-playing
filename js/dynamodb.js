import DynamoDB from 'aws-sdk/clients/dynamodb';

export default new DynamoDB({
    endpoint: process.env.NODE_ENV === 'development' ? process.env.AWS_ENDPOINT : undefined,
    region: process.env.AWS_REGION
});
