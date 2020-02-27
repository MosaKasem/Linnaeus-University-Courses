# Milestones
## 1. Upload image - DONE
* Get presigned URL from the gateway.
* Upload the image to S3 bucket.
  
## 2. Invoke state machine - Done
* When an image is uploaded invoke step machine and process it.
* All the lambda functions should be uploaded manually and put together in AWS console.
* Upload image from URL - CANCELED DUE TO ISSUE WITH UPPY MODULE
  
## 3. Cloud formation/WebSocket - CANCELED
* Get started with cloud formation and add .yaml to the repository
* Bitbucket pipeline
* Stress test let a lot of users use the upload at the same time.
* WebSocket to client to tell the user if a file was uploaded correctly or failed.
  
## 4. Improvements - DONE
* Ability to send metadata in URL to the API gateway. Then add the metadata to the image in the state machine.
* Performance/Improvements
  
During this process with continuously will document the project and work on testing.