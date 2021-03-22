#!/bin/bash

echo "Running deploy script"

# Creating empty catalog
mkdir -p ./lambda/api/build

# Read environment variables from file if .env exists.
set -a
[ -f .env ] && . .env
set +a

# echo "Deploying function imageTypeCheck"
# cd lambda/onFileUpload/imageTypeCheck
# ./deploy.sh

# echo "Lambda - API"
# cd lambda/api
# ../../bitbucket-pipeline-scripts/lambda/install-dependencies.sh 
# ../../bitbucket-pipeline-scripts/lambda/build-code.sh 
# ../../bitbucket-pipeline-scripts/lambda/deploy.sh 

# echo "Client"
# echo "Client not done yet"
