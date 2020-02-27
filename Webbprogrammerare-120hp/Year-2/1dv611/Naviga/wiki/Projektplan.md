# Codename Undefined #
Customer: Infomaker, Södra Långgatan 31, 392 32 Kalmar.

Contact person: Peter Persson, peter.persson@infomaker.se, +46 70-536 27 29

People in project: 

Sebastian Källstedt, 

Emil Larsson, 

Alex Hjortenkrans, 

Mosa Kasem Rasol, 

Yasmin Mushahdi

***

## Background for the project ##

InfoMaker has a system where users are able to upload images on their website, the final location of that image is located in an O.C.(original content, DB). 

The process of handling this request at has grown in complexity where the data is passing unnecessary steps. The result of the general process of uploading an image has become slow and inefficient. The system is a setup of Nodejs, Java, Lambda, and a number of databases. When an image is to be uploaded, each part in the setup has to process transforms and validates, image and send it back to the Writer in an XML format. This process consumes more time than needed, and is missing feedback while the user waits.

Their main request is to start from scratch and create a simpler more straight-forward flow where the data does not depend on all of the current processes, ultimately not requiring as much resources and time. The idea is to create a stand-alone API where the Writer(browser) can be a customer too, this would create a flexible, independent, easily maintainable system.

***

## Purpose of the project  ##

The purpose of this project is to create some sort of proof of concept of how the system that we have presented in the background topic could be rebuilt where we use systems and techniques that InfoMaker is already using or wants to use to simplify the current system. The focus should be on how to handle load i.e. large images and upload time and how this should be handled and presented while creating a solution that Infomaker could use and or integrate into their larger architecture. 

***

## Project goals ##
The goals of the project are to create a project that can be used as a proof of concept for how InfoMakers architecture for working with especially images in their writer service can be simplified and optimized. Included in the goals are also to learn to work as a larger group with the systems, techniques, and architectures that are used by InfoMaker.

***

## Timeplan
Because this project is a proof of concept we don't have any hard deadlines. Because only one of the project members have used serverless before we plan to start playing around with serverless and get that to work for every team member. After that, we start to upload photos and try to figure out the best and most effective way.  

***
  
## System size.
This one is hard to predict right now. We haven't got our use cases yet from the employer. But our estimate right now is not a lot of code more trial and error trying to figure out the best way to send the file through the system.  

***

## Communication plan
The team members already have a slack channel on coursepress where we can communicate with everyone one. Tuesdays our preliminary plan is to work at Infomaker getting direct contact with the employer, on that day we will also have a meeting showing our progress. We also have a separate slack channel with the employer where we could communicate on other occasions.

***

# Resources
## Project
| Tutors | Support | Duration |
|:----------|:-------------|:------|
| Tobias Olsson | Feedback on project&planning/documentation | 30 minutes
| Peter Persson | Guiding | ?undefined |
| **Others** | Help with AWS/Lambda/others | ?undefined |

## The Team
| Project Team | Operating System | Associated Tasks | Software Tools | Available time | Cost |
| ------- | ---------------- | ---------------- | -------------- | ----------------- | ----- |
| Alex | PC | Tester |  VS-code, Postman | 200h | 100$/h
| Sebastian | PC | Client manager & Frontend | VS-code React&Native | 200 h | 100$/h
| Mosa | PC | Backend | VS-code Nodejs | 200h | 100$/h
| Yasmin | PC | Backend | VS-code Nodejs | 200h | 100$/h
| Emil | Linux | Boss (will help where is needed) | Vim | 200h | 101$/h

## Locations
| Available Location | Floor | Availability |
|----------|-------------|------|
| Lnu - Hus Magna | 4 | 8am-11pm - all week |
| Infomakers - Head Office | 4 | Once a week |

***

## Responsibilities 
Sebastian: Customer/demand/specification responsible / frontend ,    
Emil: Project lead / backend ,  
Alex: Testing lead / backend ,  
Yasmin: Backend / frontend ,  
Mosa: Backend