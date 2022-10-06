# EventStore.UI

The user interface for Event Store. This is included as a submodule in the main [Event Store](https://github.com/EventStore/EventStore) repository.

## Running the UI

Currently there are two ways to run the UI:

* Open `index.html` located int `src` folder in browser.
* Execute `gulp connect` - this command [gulp-connect](https://github.com/avevlad/gulp-connect) run webserver with LiveReload (see dev section for info how to set up gulp if you are new to it) - `gulp connect` needs `gulp` to run, please see Dev information on how to install it.

## Dev

To start developing, make sure you have the following requirements:

#### 1. Install [node.js v10.20.1](https://nodejs.org/en/blog/release/v10.20.1/) **and** (Python 2.7)[https://www.python.org/download/releases/2.7/] if you haven't done that already.

If you already have another version of node.js installed, `nvm` can be used to set node v10.20.1 as the active one:

```
nvm use 10.20.1
```

nvm for Windows can be downloaded [here](https://github.com/coreybutler/nvm-windows/releases)
nvm for Linux can be downloaded here [here](https://github.com/nvm-sh/nvm/releases)

After installing Python 2.7, make a copy of the executable `python.exe` found in `C:\Python27` with the name `python2.exe` so that there are 2 executables: `python.exe` and `python2.exe`. This is required otherwise the build script when running `npm install` in the steps below fails when it looks for these executables.

If you don't want to make copies of the python executable, there's a workaround. The commands below will configure `npm` to use the same `python.exe` executable when it looks for `python` and `python2`:

```
npm config set python "C:\python27\python.exe"
npm config set python2 "C:\python27\python.exe"
```

Furthermore, make sure the path `C:\Python27\` has been added to the `PATH` variable. In Windows, this can be tested as follows from the **PowerShell**:
````
Get-Command python
Get-Command python2
````

On Linux, this can be checked as follows:
````
which python
which python2
````

#### 2. Install [gulp.js](http://gulpjs.com/)

```
npm install -g gulp
```

#### 3. Install all node packages in the project

```
npm install
```

If you get MSBUILD, VS2017, or VC++ related errors, follow the steps below to install the missing dependencies:

1. Download Visual Studio Professional 2017 (version 15.9) (Trial) setup from [here](https://my.visualstudio.com/Downloads).
2. When you run the setup, go to the **Individual components** tab, then use the search box at the top to select these components:
- Visual Studio C++ core features
- VC++ 2017 version 15.4 v14.11 toolset
- Windows 8.1 SDK
- MSBUILD
Note that other components might get added automatically; do not remove them.
3. Click "Install", and then click on "Continue".
4. Wait for setup to finish installing all the components and dependencies.
5. Now run these commands in the EventStore.UI directory:

```
npm clean-install
npm install
```

#### 4. Install [bower](http://bower.io/)

```
npm install -g bower
```

to install bower components:
```
bower install
```

If you get the error message *"bower.ps1 cannot be loaded because running scripts is disabled on this system"*, run the command below in **PowerShell**:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then, run `bower install` again.

#### 5. gulp commands available

```
// starts webserver with live reload
gulp connect 

// execute jshint
gulp lint

// transforming html file tamples into anguler.js module
gulp html

// building project - creating minified version of css, js etc.
gulp dist
```
