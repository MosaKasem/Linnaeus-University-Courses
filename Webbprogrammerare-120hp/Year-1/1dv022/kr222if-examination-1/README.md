# Jekyll Boilerplate

This is a boilerplate to be used for Jekyll-assignments in the course. Docker is used for serving the Jekyll-site.

## Prerequisites
Make sure you have the following installed on your system:

- Docker https://www.docker.com/ (Latest "Stable")
- Node.js / NPM https://nodejs.org/en/

## Installation
Pull (`git pull https://github.com/1dv022/jekyll-boilerplate.git`) into your existing repo. Make sure you are in the root of your repo.

`npm install`

This will fetch the jekyll docker image and create a new Jekyll site in this folder.

## Daily workflow

`npm start`

This will start watching for changes in your files and rebuid the site. 

Open up a browser and visit the url [http://localhost:4000](http://localhost:4000)

Fire up the IDE of your choise (Visual Studio Code etc.) and start editing your site. When a file is saved the watch-script will auto generate the site. (including sass-files but not true for _config.yml)

If you change the _config.yml file, you can rebuild using `npm run update`

When you are done simply ctrl+c to abort the watch.