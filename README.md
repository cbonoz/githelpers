GitHelpers
---

This is a project for the <a href="https://developercircles.devpost.com/">Developer Circles</a> challenge offered by Facebook.

GitHelpers is a platform for connecting with developers around the world building open source software.

## Description

Many people on facebook are not developers, so just posting to people's feeds doesn't really make a difference. Maybe you get 1-2 likes at best, but most friends (even those that are developers) won't care.

Our goal is to bring friends and open source software community together.

Contributing to open source projects can be intimidating. GitHelpers is designed to be a forum *exclusively* for projects that need/want open source contributions.

With this project we seek to mesh the coding community of github with the social environment of facebook is a more open manner. Making developer contributions more meaningful and opening up the possibility for more meaningful relationships being formed around open source development. Githelpers is a completely open source solution built with NodeJS and ReactJS on the front end. 

Githelpers is a friends-first environment, designed to make interacting and contributing with your friends to open source projects intuitive and fun. 

## Facebook Technologies used

* ReactJS
* Account Kit (phone number login)
    - Login with the bare minimum (phone number + github handle only, avoid github auth)
    - Message us plugin, appears as button next to each repository in the 'githelpers' active issues search results: https://developers.facebook.com/docs/messenger-platform/discovery/message-us-plugin
    

##  What Github offers around encouraging open source:

Github currently has the notion of the following tags: `good-first-timers` and `help-wanted`.

These tags can also be searched on github, but it can still be ambiguous where specific projects need help and from who. These tags can also be difficult to find - requiring advanced search by the end user in order to discover particular tags.


## How it Works

The process of adding a new project on GitHelpers is a 3 step process.

1. Create a new github repository
2. Create issues that you would like with on that repository. Tag with the tag githelpers
3. Upload your project to the GitHelpers website. It will now be searchable by developers around the world.

For every repo that's add to the DB, you can directly invite your friends or connect with the repo owners through facebook.

As developers find your project, there is no lack of understanding or expectations  of whether you are looking for help. All your tagged issues become searchable, and those developers can freely open pull requests on your github repository.

## Where Githelpers differentiates.

<ol>
    <li>Live contribution and user sign up feed.</li>
    <li>Community website around the tags. </li>
    <li>Searchable index around issues that have been explicitly marked.</li>
</ol>

### Future Work

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Future work includes:
* Adding leaderboard and user contribution history.
* Ability to chat directly with the repo owner through FB integration.


### Useful Links
* https://developers.facebook.com/docs/accountkit
* https://developer.github.com/v3/
* http://fontawesome.io/examples/
* https://socket.io/

### Dev Notes

<b>Available Scripts</b>

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br/>
Open [http://localhost:3000](http://localhost:3000) to view it in the br/owser.

The page will reload if you make edits.<br//>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br/>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br/>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br/>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.
