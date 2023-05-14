// lambda.js
const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

// AWS Lambda can use same serverless-express instance for all concurrent running lambdas
let serverlessInstance;

function setup(event, context) {
    serverlessInstance = serverlessExpress({ app });
    return serverlessInstance(event, context);
}
async function handler(event, context) {
    console.log('event: %o', event);
    if (serverlessInstance) {
        return serverlessInstance(event, context);
    }
    return setup(event, context);
}

exports.handler = handler;
