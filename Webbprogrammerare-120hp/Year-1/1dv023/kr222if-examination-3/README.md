# kr222if-examination-3
Examination assignment 3 for Kasem Mosa Rasol, WP2017

    What is the address to your application?
    https://159.65.63.205/
    -----------------------------------------------------------------------------------
    ###Describe what you have done to make your application secure, both in code and when configuring your application server?
    Stringified the content from github, used hashning and compared it with githubs hashnings code/body, if it is from github, then proceeded to reveal/notify the content to the user.
    the content to the client, Used a token from github so i wouldn't have to give my account's details, and a secret which only i and github knows for the payload request.
    -----------------------------------------------------------------------------------
    ###Describe the following parts, how you are using them and what their purpose is
        ###Reversed proxy
    _answer: It's a two ways journey, it makes the request on behalf of the client, it takes the load off of the server, and it protects from DDos attacks.
    if one reverse proxy gets shut down, the other open up.
        ###Process manager, there are others process managers, i'll use pm2 as an example:
    _answer: Simple and efficient process management (start/stop/restart/delete/show/monit)
    It's possible to set the amount of cpu's for server by using cluster mode, we can make more instances, but we need to store a session between them to share the state between the processors.
    to start cluster pm2 start app.js -i <instances> // it's also possible to manage cluster mode, reload without downtime, graceful reload (alerting the process) and scale the process number <instances>.
    It's possible to monitor real time, and inspect logs real time.
    There's a nifty way to start an application with JSON declaration, we can option set everything, without having to type the ugly commands.
    pm2 is able to install/use certain modules, that will extend it's capabilities or a worker process providing an api.
    Keep your application ALWAYS ONLINE with auto restarts and init system script generation.
    Clusterize Node.js Applications without code change to increase performance and reliability.
    Hot Reload Node.js Applications without extra configuration.
        ###TLS certificates
    _anser:it's the standard technology for keeping an internet connection secure and safeguarding any sensitive data that is being sent between two systems, preventing criminals from reading and modifying any information transferred
        ###Environment variables
    _answer: whenever we want to use things like passwords or database strings, then an enviroment variable is recommended to use.
    We can 
    -----------------------------------------------------------------------------------
    ###What differs in your application when running it in development from running it in production?
    Development is for developing the code, testing the code, testing the database, when running it in production, it has to be tested (there is production test stage/server), all lighs should be green before finally opening up it's gates.
    Also test it for vulnerability.
    -----------------------------------------------------------------------------------
    ###Which extra modules did you use in the assignment? Motivate the use of them and how you have make sure that they are secure enough for production
    Used two diffrent modules for token authentication, one for the request, one for the other request that github makes.
    used Crypto to hash the the content from requested request.
    **Removed** Used secure-compare but it decided to fail on me, i don't know why, sometimes it worked and sometimes not
    console.logged both the hashning and secret, and they were identical, but secure-compare decided it wasn't.
    -----------------------------------------------------------------------------------
    ###Have you implemented any extra features (see below)? If so, describe them.
        *If you are aiming for a higher grade here is also the chance to motivate it
        _answer: Added session timeout for nginx: ssl_session_timeout ((duration));
        Added session cache shared, cache is shared between all the connection workers. if the original worker that made the connection, and the 2nd connection
        gets to be made to a different nginx worker, it remains possible to resume these connections to speed things up.
        
