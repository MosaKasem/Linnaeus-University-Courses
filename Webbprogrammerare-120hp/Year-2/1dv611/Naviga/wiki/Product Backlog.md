| ID      | Specification       | Description                                                              | Type           | Dependencies | Status      |
|---------|---------------------|--------------------------------------------------------------------------|----------------|--------------|-------------|
| 1       | Frontend            | React client                                                             | Functional     | 2            | Done |
| 1.1     | Upload              | Upload image from file                                                   | Functional     | 2.1          | Done        |
| 1.2     | Upload              | Upload image from url                                                    | Functional     | 2.1          | Not done / Failed  |
| 1.3     | Progressbar         | Progressbar when uploading images                                        | Functional     | 1            | Done        |
| 1.4     | Error handling      | If uploading invalid images or duplicate show user error messages        | Functional     | 1            | Done  |
| 1.5     | Upload              | Upload multiple images                                                   | Functional     | 2.1          | Done        |
| 1.6     | Add metadata        | When uploading images add metadata to file                               | Functional     | 2.1          | Done  |
| 1.7     | Show images         | Show all images in an bucket                                             | Functional     | 2            | Not done / Failed |
| 2       | Backend             | AWS Backend                                                              | Functional     |              | Done |
| 2.1     | API Gateway         | API Endpoint that returns an upload URI                                  | Functional     | 2            | Done        |
| 2.2     | State Machine       | AWS State machine that triggers on fileupload                            | Functional     | 2.1          | Done |
| 2.2.1   | imageTypeCheck      | Lambda function that validate mime type of uploaded file                 | Functional     | 2.2          | Done        |
| 2.2.2   | heicToJpegConverter | If uploading Heic convert to jpeg and delete heic file                   | Functional     | 2.2          | Done |
| 2.2.3   | renameFileToHash    | Calculate hash from uploaded file and rename it. Check for duplicate     | Functional     | 2.2          | Done |
| 2.2.4   | deleteFile          | Lambda function that deletes invalid file                                | Functional     | 2.2          | Done |
| 2.2.4.1 | deleteFile          | Send message to client if invalid file                                   | Functional     | 2.2          | Done  |
| 2.2.5   | exif                | Extract exif data from file                                              | Functional     | 2.2          | Done        |
| 2.2.6   | imageRecognition    | Extract image recognition data from file                                 | Functional     | 2.2          | Done |
| 2.2.7   | thumbnail           | Create thumbnails from uploaded image                                    | Functional     | 2.2          | Done |
| 2.2.8   | storeMetaData       | Receive metadata from file and store it as a seperate file in the bucket | Functional     | 2.2          | Done |
| 2.2.9   | finally             | Store in database that progress was successful                      | Functional     | 2.2, 1       | Done |
| 2.2.10  | failure             | Store in database on failure                                        | Functional
| 2.2, 1       | Done  |
| 2.3     | Cloudformation      | Automate deploy process with Cloudformation                              | Functional     | 1, 2         | Removed |
| 2.3.1   | Pipeline            | Bitbucket pipeline deploying everything                                  | Functional     | 1, 2         | Removed |
| 2.4     | Companion server    | Companion server for usage with frontend uppy component | Functional     | 1,2          | Done 
| 3       | Testing             |                                                                          | Non functional | 1, 2         | Done  |
| 3.1     | Unit tests          | Unit tests frontend                                                      | Non Functional | 1            | Done |
| 3.2     | Unit tests          | Unit tests backend                                                       | Non functional | 2.2          | Done  |
| 3.3     | Integration test    | Integration tests between lambda functions                               | Non functional | 2.2          | Done |
| 3.4     | Stress test         | Stress test the file uploading                                           | Non functional | 1,2          | Done  |
| 3.5     | Manual test         | Testing manually and see if any error occurs                             | Non Functional | 1, 2         | Done  |
| 4       | Documentation       | Documentation of the project                                             | Non functional |              | Done  |
| 5       | Meetings            | Meeting with employer and teacher                                        | Project        |              | Done  |
| 6       | Research            | Research AWS and Client                                                  | Project        |              | Done  |
| 7       | Companion server | Companion server for usage with frontend uppy component                     | Functional |