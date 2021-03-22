# Infomaker upload project
This is a proof of concept with uploading files to AWS in collaboration with Infomaker. The client asks a lambda function for a presigned URL. Then the client uploads the file to a AWS S3 bucket. When the file is uploaded lambda functions will be triggered handling the file. Read EXIF data, rename the file with a hash generate generated from the binary and thumbnails will be created.  
  
The project is deployed to AWS with Bitbuckets pipelines. When we push to the development branch the pipeline will we triggered and deploy the code.  
  
You can find all the documentation in the [wiki](https://bitbucket.org/infogrooup/file-uploading/wiki/Home)  

![Architecture](https://bitbucket-assetroot.s3.amazonaws.com/repository/4peK4Ko/3504238358-sistaOverview.jpg?Signature=Nz8ZRCWPT9e1QutnRAYowFTqfO8%3D&Expires=1558937388&AWSAccessKeyId=AKIAIQWXW6WLXMB5QZAQ)
  
## File Structure
```
/client (React client)
/lambda/api (Lambda function returning presigned url)
/lambda/onFileUpload/imageTypeCheck (First function that triggers on file uploaded to bucket)
/lambda/onFileUpload/renameFileToHash (Calculate hash from filename, renaming file)
/lambda/onFileUpload/deleteFile (delete invalid file)
/lambda/onFileUpload/heicToJpegConverter (Convert heic to jpeg)
/lambda/onFileUpload/exif (Read exif data from image)
/lambda/onFileUpload/imageRecognition (Get image recognition data)
/lambda/onFileUpload/thumbnail (Creates thumbnails)
/lambda/onFileUpload/finally (Tell the client about the process)
/bitbucket-pipeline-scripts (Deployment scripts)
```
  
## To get started with the Client
`git clone git@bitbucket.org:infogrooup/file-uploading.git`
```
git checkout development
git pull
```

## Start React Client
```
cd client
npm i && npm start
```
