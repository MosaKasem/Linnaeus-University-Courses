## Examination 2 - web API
### Mosa Kasem Rasol

***

## Installation & Getting Started
To run locally: 
1. ```git clone https://github.com/1dv527/kr222if-examination-2.git```
2. ```npm install```
3. ```npm start```
### Requirements to run locally:
  1. Mongodb **OR** mlab
  2. Provide your mongoDB/mlab string to **example.env**
  3. Rename **example.env** to **.env**
  
### Postman

##### **Postman test collections:**
1. For **online-server** **select** ```MangoQuid.postman_collection.json```
2. For **local** **select** ```MangoQuid-1dv527-local.postman_collection.json```

##### **Variable environment:**
1. For **online-server** **select** ```theToken.postman_environment.json```
2. For **local** **select** ```1dv527-localhost-theToken.postman_environment.json```

First we'll import the environment variable
#### Set up environment variables!
1. Open up **postman**
2. Click on options :gear: icon on top right corner
3. Choose manage environments
4. Click import, navigate whilst inside the root folder of the app and find folder named **PostManEnvironmentVariables**.
5. Select your [**variable environment**](#Variable-environment)

Now we import the test!

#### Getting Started with postman tests:
##### Pre-requisites
* **For Local:** Make sure app is running on **localhost:8080**
* **For Online-server:** Visit **http://mosesrestfulapi.herokuapp.com/api/v1** once! and wait for it to load (server could be in idle mode)
1. Open up **postman**
2. Click **import**
3. Click **choose files** and navigate to root-folder of the app and select your [Postman test collections](#Postman-test-collections)
4. Click on **run** (wait for collection loader to load) select the **environment variable** that you imported earlier
5. Click **Run MangoQuid**

*OBS!* Please take a note of this, one test case will give incorrect status if it's run twice and that's because the test will try to add to API an already registered URL and the API doesn't accept duplicated (already existing webhooks URL in database) webhooks url. (this is automation issue with postman and not the API)

***

## Report
#### Explain and defend your implementation of HATEOAS in your solution.
The implementation of hateoas: is presenting the current status and url of the current position such as `(self: {href: _url_})` and incase of a fail request, post, delete or put is to make it clear for the user that
something has gone wrong and what the next course of action is (nextUri). Presenting the state of the request (whenever possible and relevant)  
I could have cluttered every page with unrelevant information but it should be clear to the user through the sent status code and success status(true/false) and a message
whether the get/post/delete/put was successful or not, it's to know when it was successful and failure.

Another factor is the relevant information for the user, that's required to fulfil the a get/post/put/delete request.

For instance, adding something to database requires a token, this is shown by ```params{token}```. 

Also the type of the data, for example, weight and latitude can't be text.
Should user not do so, he will be instructed to go back <**:arrows_counterclockwise:\UPDATE!!/:arrows_counterclockwise:>** (sadly after reformating the code, this was not possible anymore, had I more time I would implement it again as I had it)

Under headers: it informs the user of the requirements.
Should user succeed in a post, he will be provided with an url to visit that newly registered catch and in turn the he will also be informed of the possibilities, like update or delete it and will be provided with href.
There was a mention about API'S providing versions of their API, and so I built my api behind /v1

#### If your solution should implement multiple representations of the resources. How would you do it?
This comes down to the clients/users needs (requirement).

currently the implementation supports objects or "json" representation, I did not think of including xml but coming 
across trafikAPI for trains (Johan showed the API), xml was used to filter times/dates/cities/others it was very nice implementation and a 
very creative user friendly experience, however, time only allowed for this much. 

#### Motivate and defend your authentication solution.
JwT, which is a JSON-object token. the object is hidden behind an HMAC algorithm.
This felt relevant, because of what we did was very similiar back then when trying it with github in previous course, something familiar. 
It felt like the right choice. Why risk using sensative information when making requests.

* What other authentication solutions could you implement? **Answer:** looked at passport but did not test it for this assignment.

* What pros/cons do this solution have? **Answer:** not easy following the documentation.

#### Explain how your web hook works.
The implementation for the hook is rather basic, authentication/token is requirement, once an url is registered, every fish that is added, a fetch('post') will be made to that url and it looks like this:
[*The webhook post to my url*](https://raw.githubusercontent.com/1dv527/kr222if-examination-2/master/webhook.png?token=Ad83tJ01jvnur7io4pdQy78qnsOFMlL7ks5chYCuwA%3D%3D)
all urls/webhooks are saved on mongodb(database), all links are retrieved from database then a map method is used to do fetch(post) on all the urls

WEBHOOK-TEST: It was not possible to automate this with postman, the website (https://webhook.site) which provides the webhook url, had the url hidden when I visited it with postman to try and automate it, I presume it's to prevent csruf/attacks/spam
* **To test the webhook:** 
  1. copy your webhook url from **https://webhook.site**
  2. open up postman and use the collection provided for the postman tests. ((**MangoQuid.postman_collection.json** or **MangoQuid-1dv527-local.postman_collection.json**))
  3. navigate to **webhookRegister**, select **Body**, then **x-www-form-urlencoded** and paste in the url under **value** for the payload key
  4. run **Login** test, to store the token in environment variable for verification.
  5. run **registerCatch** test
  6. check your payload url, you should see the newly registered fish data there as shown in the pic earilier.

#### Since this is your first own web API there are probably things you would solve in an other way looking back at this assignment. Write your down thoughts about this.
* Sending the version of the implementation to the user on homepage
* Sending the information about the API, what it's about, small description.
* Limit the amount of fetches(post) made per link for the payload.
* I have set up a regex to only allow actual url, but I would have liked to implement some sort of checker so prevent unnecessary links, to check that the payload did reach it's destination.
* Setup up validation for my API so it's not public, like a token, so everything inside the API is not public.. but that would be against the requirement of the assignment.

It was very tricky trying to present an object with the data in a form that's relevant to the user
and to the eye. if I could do it again I would do, this time /api/v2 and improve and implement more features and improve hateoas implementation.
I had validations and I would bring them back if time allowed (it's in commits), the app was refactored and validation was removed, due to refactor and (time constraint). 
it's refactored to implement async await methods, inside a try-catch block, readability enhanced, I hope so atleast, but I would'v liked to keep validations to prevent e.x. users from deleting other users registered catches (had it before refactor)

There were more things I would'v liked to implement, more validation, for the hook, I would'v limited the amount of links per account and per requests made, some sort of a limiter for the posts to avoid spamming the users ofc.
I would have implemented the feature of removing the webhook but it's really late and am trying to figure out how to get the postman to automate the tests for export without hardcoded ID's to avoid resulting in failure.

Reformatting code to enhance readability also meant I had to ditch the error handling with proper messages, I tried to include some but due to time, it wasn't implemented in every request, but the ones I felt were important, I did.

If time allowed, I would have liked to setup a function which returns an object of status code and error message that's.. ((BASICALLY an error handler method or class))


