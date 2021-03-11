# Would You Rather Project

This is the project for Udacity's React & Redux course. I build a React/Redux front end for the application. I used [Create React App](https://github.com/facebook/create-react-app) and [React-bootstrap](https://react-bootstrap.github.io/) to bootstrap this project.

The `_DATA.js` file represents a fake database and methods that let you access the data.

## App view

![Would You Rather App Sign In View](./WebImage/11.PNG)
### Sign In View
I implement a simple password check input on the sign-in page, the password for all 3 users is "123456".

![Home View](./WebImage/aa.PNG)
### Home View
You can click unanswered polls or answered polls buttons to see polls that are unanswered or answered. You can click the "view poll" button to see the details of each poll. For the unanswered poll, you can choose your answer and submit it, after submit, you will see the votes result for that poll. For the answered poll, you will just see the votes result for the poll.

![New Question View](./WebImage/dd.PNG)
### New Question View
You can create your new poll by writing your option 1 and option 2. By submitting it, you will get a newly created poll and you can view it on the home page.

![Leader Board View](./WebImage/ff.PNG)
### Leader Board View
You can see your score and other users' scores on the leader board. Users are ordered in descending order.

## Get Started

* To get this project, type `git clone https://github.com/cheerworld/WouldYouRather.git` in your terminal.

To get started developing right away:

* install all project dependencies with `npm install/yarn add`
* start the development server with `npm/yarn start`

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

My code talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|
