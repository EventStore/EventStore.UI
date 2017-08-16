# EventStore.UI

The new user interface for Event Store. This is included as a submodule in the main [Event Store](https://github.com/EventStore/EventStore) repository.

## Running new UI

Currently there are two ways to run the new UI:

* Open `index.html` located in the `src` folder in browser.
* Execute `gulp connect` - this command [gulp-connect](https://github.com/avevlad/gulp-connect) runs webserver with LiveReload (see dev section for info on how to set up gulp if you are new to it) - `gulp connect` needs `gulp` to run, please see Dev information on how to install it.

## Dev

To start developing it's best to install a few things

#### 1. install [node.js](http://nodejs.org/) if you haven't done that already
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

#### 5. gulp commands available

```
// starts webserver with live reload
gulp connect 

// execute jshint
gulp lint

// transforming html file templates into anguler.js module
gulp html

// building project - creating minified version of css, js etc.
gulp dist
```
