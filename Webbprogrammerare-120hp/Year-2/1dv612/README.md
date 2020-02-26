## About the course

This is the course book for the course “Web Application Architectures and Frameworks (1DV612)” at Linnaeus University.

---

### Assignments

#### Short System Design Report Assignment
The design report must be stored on the GitLab wiki associated with your private examination repository (https://gitlab.lnu.se/1dv612/student/[your-lnu-username]/examination).
The design report should describe the system structure chosen for the web application. A pictorial representation (using a UML component diagram?) of the architecture should be presented (showing the major subsystems and data repositories and their interconnections).
Develop a modular system structure and explain the relationships between the modules to achieve the complete functionality of the system. This is a high-level overview of how the responsibilities of the system were partitioned and then assigned to subsystems.
Identify each high-level subsystem and the roles or responsibilities assigned to it. Describe how these subsystems collaborate with each other in order to achieve the desired functionality. Don't go into too much detail about the individual subsystems. The main purpose is to gain a general understanding of how and why the system was decomposed and how the individual parts work together.
Don't throw away alternative design ideas. Write a description of design alternatives not chosen.

####  Web Application Development Assignment
The application is supposed to work as a notification hub and dashboard for a user's GitHub organizations. In the application, the user should be able to list and select his/her organizations as well as receive notifications, for example, the latest releases, latest commits, etc. for repositories in the selected organization.
The application should be able to notify the user about certain events that occur in the various organizations, even if the user is not running the application. This could, for instance, be solved using notifications sent to Slack, Facebook messenger, browser notifications, or SMS. Other alternatives could be discussed. The user should inside of the application be able to configure which organizations events will be sent as notifications in this way.
The user should be able to close the application and return at a later date. If so, the application should be able to show information that is new since the last execution.
The application should be deployed to/through a hosting service like https://www.digitalocean.com/, https://aws.amazon.com/, or https://azure.microsoft.com.
An example mockup is available. See this only as an example and not a requirement.
Please contact the course management if you have questions about the system.

---

### Seminar

#### 1 - Web Application Architectures Seminar

Task

Create an artifact describing the architecture of the examination application. The following requirements must be met.

    The documentation for your web application must be stored on the GitLab (https://gitlab.lnu.se/1dv612/student) wiki associated with your private examination repository.

    The documentation must contain a picture describing the overall system.

    The type of communication between subsystems must be documented.

    The behavior, interaction between subsystems and users must be documented.

#### 2 - Server-side Web Application Seminar

Task

Create an artifact describing the architecture of the server-side of the examination application. The following requirements must be met.

    The documentation for your web application must be stored on the GitLab (https://gitlab.lnu.se/1dv612/student) wiki associated with your private examination repository.

    The documentation must contain a picture describing the server-side subsystem.

    Describe (data flow diagram?) how the data is processed.

    If there is a need for persistent data on the server-side, it should be described.

#### 3 - Client-side Web Application Seminar

Task

Create an artifact describing the architecture of the client-side of the examination application. The following requirements must be met.

    The documentation for your web application must be stored on the GitLab (https://gitlab.lnu.se/1dv612/student) wiki associated with your private examination repository.

    The documentation must contain a picture describing the client-side subsystem.

    Describe (data flow diagram?) how the data is processed.

    If there is a need for persistent data on the client-side, it should be described.

    