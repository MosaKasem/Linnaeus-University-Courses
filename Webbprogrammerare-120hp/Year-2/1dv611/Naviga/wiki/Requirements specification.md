**[Using MoSCoW method for priority column](https://en.wikipedia.org/wiki/MoSCoW_method)**

1. Must have (Self-explanatory)
2. Should have ( Important but not necessary )
3. Could have ( desirable but not necessary )
4. Won't have ( Agreed by stakeholders as the least-critical, or not appropriate ) 

***

**In Progress**: under process, Något är oklart, ikke färdigt, att diskutera I mötet.

**Har Du Synpunkt?**: Gärna skriv I slack om du har förslag som skulle kunna förbättra meningen, så kan jag checka på det. ~~am no expert on writing~~.

***

| ID | Title | User Story | Type | Dependencies | Priority | 
| -- | ----- | ---------- | ---- | ------------ | -------- | 
| 1.0 | Upload Image | As a journalist, I want to be able to upload an image from my local storage | Functional  | - | Must Have |
| 1.0.1 | Upload Image | As a journalist, I want to be able to upload an image from google-drive or Instagram | Functional  | - | Could have |
| 1.1 | Upload Image from URL | As a journalist, I want to upload an image from URL | Functional  | - | Must Have |
| 1.2 | Upload multiple images with common metadata | As a journalist, I want to upload multiple images at the same time | Functional  | - | Must Have |
| 1.3 | Extract metadata from image | As a journalist, I want the metadata of the image | Functional  | - | Must Have |
| 1.4 | Create thumbnail | As a developer, I want to improve the user experience, thus, thumbnails, to minimize load and bandwidth? | Functional  | - | Must Have |
| 1.5 | Create a preview | Not done / failed | Functional  | - | Must Have |
| 1.6 | Show user upload progress | As a journalist, during the process of the uploading of the selected file or files, I want to see a progress bar | Functional  | - | Must Have |
| 1.7 | Handle upload errors | As a developer, in case of an error event on image upload, the application should continue to operate and doesn't collapse | Functional  | - | Must Have |
| 1.8 | Asynchronous upload from client | As a journalist, I don't want to wait for to long for my images to be uploaded | Functional | - | Must Have |
| 2.0 | Validate MIME Type (valid mimes gif, jpeg and png) | As a developer, I do not intend to trust the client, therefore I intend to validate the files are not in an incorrect format | Functional  | - | Must Have |
| 2.1 | Validate max size of images | As a developer, I do not intend to accept files the size of the Titanic, that's just going to sink, and drag the application down | Functional  | - | Must Have |
| 2.2 | Validate duplicate images | As a developer and a journalist, I do not want to see redundancy, as it serves no p | Functional  | - | Must Have |
| 2.3 | Validate unwanted overwrite of existing images | As a developer, if a file already exists in the storage the file will be deleted and no overwrite will occur. | Functional  | - | Must Have |
| 3.0 | Show uploaded images | As a journalist, I want to view my uploaded images after they are uploaded | Functional  | - | Must Have |
| 3.1 | Show metadata for uploaded image | As a journalist, I want to see the metadata of the image | Functional  | - | Must Have |
| 3.2 | Build process with pipelines on Bitbucket | As a developer, I set the rules ** Pipeline removed, failed **| Functional  | - | Must Have |
| 4.0 | Client and backend with API | **Done** | Technical | - | Must Have |
| 4.1 | AWS API Gateway,| **Done** | Technical | - | Must Have |
| 4.2 | Upload image to S3| **Done** | Technical | - | Must Have |
| 4.3 | Use aws Lambda for the function in the application | **Done** | Technical | - | Must Have |
| 4.4 | Use aws step functions for validate of image | **Done** | Technical | - | Must Have |
| 4.5 | Logging of progress that we can examine and find errors | ** Failed ** | Technical | - | Must Have | 
| 4.6 | Basic metrics for load | **Done** | Technical | - | Must Have