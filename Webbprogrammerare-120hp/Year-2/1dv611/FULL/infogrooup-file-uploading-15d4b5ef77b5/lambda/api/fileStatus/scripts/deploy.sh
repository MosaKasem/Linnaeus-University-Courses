#!/bin/bash

# Lambda function to return ping
LAMBDA_FUNCTION_NAME=fileStatus
HANDLER=index.status

echo "Check if lamba function exists..."
aws lambda get-function --function-name ${LAMBDA_FUNCTION_NAME} --region ${LAMBDA_FUNCTION_REGION}

if [ "$?" -eq "0" ]; then
# Lambda exists
    echo "Updating existing lambda function..."
    aws lambda update-function-code \
        --function-name ${LAMBDA_FUNCTION_NAME} \
        --zip-file fileb://build/lambda.zip \
        --region ${LAMBDA_FUNCTION_REGION}
else
# Lambda does not exist yet
    echo "Creating lambda function..."
    aws lambda create-function \
        --function-name ${LAMBDA_FUNCTION_NAME} \
        --region ${LAMBDA_FUNCTION_REGION} \
        --runtime=${LAMBDA_FUNCTION_RUNTIME} \
        --role=${LAMBDA_FUNCTION_ROLE_ARN} \
        --handler=${HANDLER} \
        --zip-file fileb://build/lambda.zip
fi

