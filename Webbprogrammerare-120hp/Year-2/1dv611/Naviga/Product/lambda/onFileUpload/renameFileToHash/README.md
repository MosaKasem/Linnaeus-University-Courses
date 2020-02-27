# Lambda functions in AWS

## Prerequisite 
* python
* Docker
* aws cli installed
* sam cli installed
  
```
   npm i            - install depedencies
   npm start        - run functions locally
   npm test         - run tests
   npm run deploy   - upload lambda to aws
```


## You need to manually add an .env file.
# .env - example
  
```
  LAMBDA_FUNCTION_NAME=imageTypeCheck
  LAMBDA_FUNCTION_REGION=eu-north-1
  LAMBDA_FUNCTION_ROLE_ARN=arn:aws:iam::364107138694:role/test
  LAMBDA_FUNCTION_RUNTIME=nodejs8.10
```
