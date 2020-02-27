#!/bin/bash

HANDLER=index.handler

echo "Check if lamba function exists..."
aws lambda get-function --function-name ${LAMBDA_FUNCTION_NAME} --region ${LAMBDA_FUNCTION_REGION}

if [ "$?" -eq "0" ]; then
echo "Updating Lambda Function"
aws lambda update-function-code \
    --function-name ${LAMBDA_FUNCTION_NAME} \
    --region ${LAMBDA_FUNCTION_REGION} \
    --zip-file fileb://build/lambda.zip
else
echo "Creating Lambda function"
aws lambda create-function \
    --function-name ${LAMBDA_FUNCTION_NAME} \
    --region ${LAMBDA_FUNCTION_REGION} \
    --zip-file fileb://build/lambda.zip \
    --handler ${HANDLER} \
    --runtime ${LAMBDA_FUNCTION_RUNTIME} \
    --timeout 10 \
    --memory-size 1024 \
    --role ${LAMBDA_FUNCTION_ROLE_ARN}
fi

# Policy only needs to be added once.
# Am no bash script expert sry, the if statement is failing.
# It's always adding the policy regardless whether it exists or not
# Uncomment below, npm run deploy, Recomment below.
# echo "Checking if Policy Exists"
# aws lambda get-policy --function-name ${LAMBDA_FUNCTION_NAME}

# if [ "$?" -eq "0" ]; then
# echo "Adding Policy"
# aws lambda add-permission --function-name ${LAMBDA_FUNCTION_NAME} --principal s3.amazonaws.com \
# --statement-id some-unique-id --action "lambda:InvokeFunction" \
# --source-arn ${BUCKET} \
# --source-account ${ACCOUNT_ID}
# else
# echo "Policy Already Exists"
# fi

