# EventStore.UI

The user interface for Event Store. This is included as a submodule in the main [Event Store](https://github.com/EventStore/EventStore) repository.

## Running the UI

Currently there are two ways to run the UI:

1. Open `index.html` located in the `src` folder in your browser.
2. Execute `gulp connect`. The command [gulp-connect](https://github.com/avevlad/gulp-connect) runs a webserver with LiveReload (see dev section for info how to set up gulp if you are new to it). `gulp connect` needs `gulp-cli` to run, please see Dev information on how to install it properly.

## Dev

To start developing, make sure you have the following requirements:

#### 1. Install [Node.js v18.12.1](https://nodejs.org/en/blog/release/v18.12.1/)

If you already have another version of Node.js installed, `nvm` can be used to both install and set Node.js v18.12.1 as the active one:

```
nvm install 18.12.1
nvm use 18.12.1
```

nvm for Windows can be downloaded [here](https://github.com/coreybutler/nvm-windows/releases).

nvm for Linux can be installed using the following [instructions](https://github.com/nvm-sh/nvm#installing-and-updating).

#### 2. Ensure the minimum version of npm is v9.2.0

First, check your version of npm using `npm --version`. Install npm v9.2.0 only if your current version is below 9.2.0:

```
npm install -g npm@9.2.0
```

#### 3. Install [gulp-cli](https://github.com/gulpjs/gulp-cli) globally

Any global installation of `gulp` **should** be removed before installing `gulp-cli` to avoid conflicts. The latter will run the local installation of `gulp v4.0.0` which is already a devDependency in the project.

```
npm rm -g gulp
npm install -g gulp-cli
```

#### 4. Install [bower v1.8.14](http://bower.io/) globally

```
npm install -g bower@1.8.14
```

#### 5. Install all node packages in the project

```
cd EventStore.UI
npm install
```

If `npm install` succeeds, go to **Step 6**.

If you get errors related to MSBUILD, VS2017, or VC++ on Windows, follow the steps below to install the missing dependencies:

1. Download Visual Studio Professional 2017 (version 15.9) (Trial) setup from [here](https://my.visualstudio.com/Downloads).
2. When you run the setup, go to the **Individual components** tab, then use the search box at the top to select these components:
- Visual Studio C++ core features
- VC++ 2017 version 15.4 v14.11 toolset
- Windows 8.1 SDK
- MSBUILD
Note that other components might get added automatically; do not remove them.
3. Click "Install", and then click on "Continue".
4. Wait for setup to finish installing all the components and dependencies.
5. Now run these commands in the `EventStore.UI` directory:

```
npm clean-install
npm install
```

#### 6. Install all bower packages in the project

```
bower install
```

If you get the error message *"bower.ps1 cannot be loaded because running scripts is disabled on this system"* on Windows, run the command below in **PowerShell**:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then, run `bower install` again.

#### 7. Available gulp commands

```
// Starts webserver with live reload
gulp connect 

// Executes jshint
gulp lint

// Transforms HTML file templates into Angular.js module
gulp html

// Builds the project: Creates minified version of CSS, JS, etc.
gulp dist
```
