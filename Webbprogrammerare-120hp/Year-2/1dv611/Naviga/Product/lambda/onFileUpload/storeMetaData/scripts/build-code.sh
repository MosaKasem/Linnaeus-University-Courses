#!/bin/bash

# Delete old build
rm -R build/
mkdir -p ./build 

echo "Zipping code"
zip -r ./build/lambda.zip *
