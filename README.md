# Dev Branch

this is dev branch - work in progress. it may not work during short period of time.

current changes:

* _2014-03-29_: projections/streams/dashboard etc. split as separate modules

# EventStore.UI

*this project is still under development*

The new user interface for Event Store.

## Prerequisites

To use new UI you will need to do few things manually (as for todate: 2014-04-16).

* You need custom build of [EventStore](https://github.com/EventStore/EventStore) dev branch. This branch includes changes that where included to allow CORS. Without this custom build, UI will not work for you.
* User name and password for administrator needs to be `admin:changeit` - if you want to change it, update this value in `run.js`.
* EventStore needs to run on default address: `http://127.0.0.1:2113` - if you want to change it, update this value in `consts.js`.

## Running new UI

Currently there are two ways to run the new UI:

* Open `index.html` located int `src` folder in browser.
* Execute `gulp connect` - this command [gulp-connect](https://github.com/avevlad/gulp-connect) run webserver with LiveReload (see dev section for info how to set up gulp if you are new to it).

## Dev

To start developing it's best to install few things

#### 1. install [node.js](http://nodejs.org/) if you havent done that already
#### 2. install [gulp.js](http://gulpjs.com/)

```
npm install -g gulp
```

#### 3. install all node packages in project

```
npm install
```

#### 4. (optional) you may want to install [bower](http://bower.io/)

```
npm install -g bower
```

to update packages
```
bower update
```

#### 5. gulp commands avaliable

```
// starts webserver with live reload
gulp connect 

// execute jshint
gulp lint

// transforming html file tamples into anguler.js module
gulp html

// todo: rest of the commands
```
