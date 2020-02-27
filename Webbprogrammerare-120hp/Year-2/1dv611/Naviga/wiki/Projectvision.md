# V i s i o n #


*Our vision is to create a simple plugin to manage image upload from multiple sources, independently and
without much effort to use.*

### Background and problem areas ###
When a user is interacting with the UI, it is expected to be straight forward and not consume too much time,
but uploading images, in Naviga's case, is a time-consuming action and without any notification to the user of what is happening. Their current system requires a unnecessarily large number of processes and actions taking place in the background. The system has become hard to handle, a little "ball of mud" and that is why the request is to develop a new and better way of handling the upload processes was introduced. This project is a proof-of-concept and it will be up to our team to show other ways to manage image upload.  

Maintenance of a system is important for continuous refinement and requires a well thought out architecture to build upon. This is not always easy and a system can get cluttered after a
while which often leads to a number of issues. We would like to propose a new infrastructure where we solve
some current needs; multitasking, lightweight structure, cloud-based. As Naviga already uses Amazon Services in the overall system, it was a natural choice for us too, to keep it familiar and easily integrated with their own current system.

At last, we will include the user and expose the action while waiting for the processes to finish, to minimize confusion while waiting for this process to complete the upload and finally rendering the image onto the webpage.

### Market
There are other platforms with similar functionality as uploading files to a service. These are Dropbox, OneDrive, Google Drive, where a user has the ability to drag and drop a file or choose a file from the machine to upload it on to that service.

In our case, the application will focus mainly on image upload and is limited to png, jpg, jpeg, gif and heic/heif formats and will combine the ability to upload images from other web services like Google Drive, Instagram or the machine and also URL. A user will have the capability to upload multiple files and get feedback on each process, unlike any other platforms mentioned above. It will be scalable and reusable as a plugin.

### Target group ###
Our target group is our customer, *Naviga*. We will focus on creating and delivering the vision through the specification and problem-area specified by our customer. The end-customer would be the reporter/journalist, who is the main user of the plugin. When uploading an article the reporter is able to upload an image related to the content of that article. As this is a proof-of-concept the reporter is only a theoretical end-user, and our focus will be *Naviga* and their requirements of the system.

### Features ###
Our product is meant to be used as a plugin to handle all image uploads that will be a part of the complete article further on. The plugin is made to be easily integrated and flexible to use.   

* The product will handle both single and multiple uploads at the same time with no time delay!

* A user should be able to delete any image before finalizing the upload.

* The feedback will be in the form of a progress-bar showing the percentage and progress of the image when being uploaded.     

* There will also be a texted information about what current steps the image goes through while being processed.     

### Technologies 
The request is to build an API that handles image uploads, and our customer strongly suggested to use Amazon Serverless services to better suit their own systems. As Amazon will provide scaleability, we would reduce bottlenecking the system and will not waste time on building our own server.   

The application will be created with tools and technologies that have been suggested by the customer, and as this is a proof-of-concept, the team members are also encouraged to improvise and build our own solutions. 

#### Backend
We will use JavaScript to build the system.. 

The architecture is required to be Serverless and is built using Amazon various Services to handle function calls and be the backbone structure operating behind the API itself. We will use Amazon for storage as well.

#### Frontend
Our customer are happy with using React for their frontend, so we decided that it would be a natural choice for this project as well.
 
* JavaScript    
* ReactJS   
* AWS ( Lambda, S3, Step Functions, SAM, API Gateway )  
* ExifTool