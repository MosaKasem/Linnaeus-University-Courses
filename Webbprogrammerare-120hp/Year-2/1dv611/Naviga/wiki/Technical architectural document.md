# Architecture #
In the project we are working with a serverless architecture since our customer wanted us to create this proof of concept using Amazon web services (AWS). We are creating a API in AWS using the arcitectural framework called [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).
In our architecture we are creating lambda functions where we chain them together using something called step-functions. We are creating a state machine that is used for creating paths for our chained lambda functions both so that all different outcomes are handled and to get an overview that we can follow in AWS. [AWS state machine](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-state-machine-structure.html). In AWS we are using their S3 buckets for saving our uploaded files and when a file is uploaded we will let this trigger our step-functions which then will analyse and work with the images. The functions are written in javascript and we are using the code standard "standard" to make sure that our code looks the same, since we have divided the work in the backend. 

# Frontend #
We are creating a frontend client which is built using javascript and the React framework since our customers preferred frontend framework is React and therefore felt like a natural choice for us as well. We are currently using classes in React but plan on moving away from this to use functions instead to make use of the new hooks introduced in React a short while ago. 
Together with React we are currently using a module called [Uppy](https://uppy.io/) for helping us with file uploading. We are currently working on a small companion server using NODEJS that will extend our uppy module to be able to integrate instagram, url and google drive file uploading to our client.

To get started using the client, follow the instructions found [here](https://bitbucket.org/infogrooup/file-uploading/src/development/). This will allow you to setup a local version of the client, but unfortunately there is no way to view the state machine and backend. 

# Bitbucket
We are using bitbucket for this project both for wiki and version handeling, but also for it's pipelines. With the usage of pipelines we can automated the process of our build process for easy running and testing. The usage of pipelines will also make it much easier for new developers or our customer to quickly get our project up and running to be able to view and understand the process and work with the code, which is a goal of ours to make this as easy as possible. 

# Current flow #
Here is a detailed flow description of how the project will work:

 * User wants to upload an image in the client that is built using React

 * User opens the upload image dashboard which is created using Uppy module 

 * User choose one or more images to upload from his device, instagram, google drive or url, all of which is made possible using Uppy and a small Uppy extension server called companion.

 * The system ask for a presigned url to an S3 bucket which it gets from a lambda function.

 * Lambda function validates the selected file/files to make sure that it actually is an image and an image mime type that is supported. 

 * If the image passes the validation a url is returned the client which uses that url to upload the image to an S3 bucket.

 * When an image is uploaded a step-function sequence will be triggered which first of all checks the mime type of the image.

* If the image is a valid mime type, the next step is to hash the image name using its binary to create a hashed file name. If the uploaded file is not a valid mime type, the file get's deleted from the S3 bucket.

* If the file is a valid image, we send it to the next step which branches out into three concurrent steps which is to automatically tag the image using AWS rekognition, to extract and edit meta data using [exifTool](https://www.sno.phy.queensu.ca/~phil/exiftool/) and to create thumbnails of the uploaded image. 

* When the automatic tagging and editing of meta data is done, the data is combined into one meta data file that is then stored in the S3 bucket together with the initial image. 
 
 * While all of the different steps above are done, the client will present progress to the user of what is happening and where in order to let the user know how much time left of the "upload" there is.

The system and flow can be understood using this diagram.

![sistaOverview.jpg](https://bitbucket.org/repo/4peK4Ko/images/3504238358-sistaOverview.jpg)

For more diagrams and versions of diagrams, please see our [diagram page.](https://bitbucket.org/infogrooup/file-uploading/wiki/Diagram)