# Client/Uppy
  
# Statemachine
* On files over 10mb the event changes from `PUT` to multipart upload. Make sure you listen to all kinds of events to trigger state machine
* It is really easy to get an infinitive loop when using a state machine. We solved it by putting newly uploaded files to `/upload` and only trigger the state machine on that folder. Then `renameFileToHash` move the binary to `/` and the state machine will not be triggered again on other types of operations like adding a thumbnail.
* Don't lose the event!! on success or failure. Make sure you always forward the event
* CloudTrail-events in different regions can trigger the same Statemachine when fixed on the same S3-bucket.
* When using parallel processes the next lambda will receive all the events from the parallel processes like this `[ event, event, event ]`
* A lot of string dependencies when choosing path in the state machine :(
  
# Statemachine - imageTypeCheck
* When reading files from S3 Bucket you can set it to get the first 8 bytes to check mime type of a file. So even if a really big invalid file gets uploaded the state machine will find it fast and remove the file.
* When validating HEIC you need the first 24 bytes from a file.
  
# Statemachine - renameFileToHash
* AWS SDK doesn't support move files so we copy the binary to root. The copy functions don't support `åäö` so u need to `encodeURIComponent(filename)` to get support for special characters. The delete function in AWS SDK has no problems with `åäö` for some reason.
  
# Statemachine - heicToJepgConverter
* We compiled `ImageMagick` to convert from HEIC to JPEG and executed the command from `node`. You can't use Windows to deploy this lambda. Windows don't care about file permissions, and even if you `chmod +x` the executables when you zip the lambda and deploy it the file permissions will disappear.
  
# Statemachine - EXIF
* To get this function to work our solution today is to download the file to the lambda function. But what happens if it is a warm start of the lambda. Will the hard disk space be filled?
* To get exif data we need to download the file to get data from png and gif, but only 10% of the file when it is jpeg/jpg
* JPG store the EXIF data at the beginning of the file so you could only read the beginning to get all the EXIF data. But that is not the case with `png` and `gif` where you need to read the whole file to make sure you extract all the data.

# AWS - Lambda
* `/tmp` is the only folder you can write and modify files in. The folder is 512MB in size.
* We tried to fill the `/tmp` folder with images to see what happens. When you call a lambda function at anytime Amazon can decide to create a new version of the function and you get a separate file system. Our conclusion is that it can be filled but it is hard to do. In our state machine if any of the lambda that put files in the `/tmp` folder fails we have retries.

# Statemachine - Image recognition
* AWS image recognition tool doesn't work on .gif
* Image recognition has a max size of 15 MB.
* Doesn't work on `eu-north-1` region in AWS which is Stockholm, we had to move our functions to `eu-west-1` (Ireland) because of this.

# Serverless - Deploy&Deleting

 * When a service is deployed with `serverless deploy` , and if you wish to remove it `serverless remove` [Docs](Link URL) is not the way to go. Just remove the  `visitsTable` resource from your `serverless.yaml` and run `serverless deploy` again. The Serverless Framework uses AWS CloudFormation under the hood. So deleting things manually is no good idea. Just keep in mind: Resources created as part of an AWS CloudFormation stack must be managed and modified through stack updates. Maybe this is a [good read](https://virtualbonzo.com/2017/12/11/did-you-manually-delete-a-resource-created-by-aws-cloudformation/)