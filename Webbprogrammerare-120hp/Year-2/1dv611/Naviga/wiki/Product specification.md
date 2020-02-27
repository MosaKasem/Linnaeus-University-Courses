# Product specification #

## Functional requirements
* Upload image
    * 1.1 Upload image
    * 1.2 Upload image from url
* Upload multiple images
    * 1.5 Upload multiple images with common metadata
* On file upload
    * 2.2.5 Extract metadata from image
    * 2.2.7 Create thumbnail
    * 2.2.7 Create a preview
    * 1.1 Show user upload progress
    * 1.1 Handle upload errors
    * 1.1 Asynchronous upload from client
* When file uploaded
    * 2.2.3 Validate MIME Type (valid mimes gif,jpeg and png)
    * 2.2.3 Validate max size of images
    * 2.2.3 Validate duplicate images
    * 2.2.3 Validate unwanted overwrite of existing images
* 1.7 Show uploaded images
* 1.7 Show metadata for uploaded image
* 2.3.1 Build process with pipelines on Bitbucket

## Technical requirements
* Client and backend with API
* AWS API Gateway, S3, Lambda (step functions)
* Logging of progress that we can examine and find errors
* Basic metrics for load