var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var fs = require('fs');
var shell = require('shell');
var electron = require('electron');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var authWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function () {
	createAuthWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

	createAuthWindow();

/*
	var path = app.getAppPath() + '/sample.json';
	var superDirectory = path.replace('app\/', '');
	var objectToWrite = {
		"worstClub": "Barcelona"
	}

	console.log(superDirectory);


	try {
    fs.writeFileSync(superDirectory, JSON.stringify(objectToWrite ), 'utf-8');
    console.log('Saved settings!');
  } catch (err) {
    throw err;
  }
*/

	//Authentication Part
	//==============================================================================
	// Your GitHub Applications Credentials


	// Handle the response from GitHub - See Update from 4/12/2015


	//==============================================================================

	var template = [
		{
			label: "Application",
			submenu: [
				{label: "About Kiwi", selector: "orderFrontStandardAboutPanel:"},
				{type: "separator"},
				{label: "Quit", accelerator: "Command+Q", click: app.quit}
			]
		},
		{
			label: "Edit",
			submenu: [
				{label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
				{label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
				{type: "separator"},
				{label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
				{label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
				{label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
				{label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
			]
		},
		{
			label: "Print",
			submenu: [
				{label: "Print to PDF", accelerator: "CmdOrCtrl+P", click: function () {
					printPdf('/tmp/medibox.pdf');
				}}
			]
		}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));

});

function createAuthWindow(){
	var options = {
			response_type: 'code',
	    client_id: 'pQEAmQ33wN',
	    client_secret: 'y2xrd9CVS3VYdHn9kTE6e2',
			state: 'IloveCoffe',
	    scope: 'write_set' // Scopes limit access for OAuth tokens.
	};

	authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });

	// Build the OAuth consent page URL
	//authWindow.openDevTools();
	var quizletUrl = 'https://quizlet.com/authorize?';
	var authUrl = quizletUrl + 'response_type=' + options.response_type +
		'&client_id=' + options.client_id + '&scope=' + options.scope + '&state=' + options.state;
	authWindow.loadURL(authUrl);
	authWindow.show();

	authWindow.webContents.on('will-navigate', function (event, url) {
		handleCallback(url);
	});

	authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
		handleCallback(newUrl);
	});

	// Reset the authWindow on close
	authWindow.on('close', function() {
			authWindow = null;
	}, false);

	function handleCallback (url) {
		console.log('hier die URL', url);
		var raw_code = /code=([^&]*)/.exec(url) || null;
	  var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
	  var error = /\?error=(.+)$/.exec(url);

	  if (code || error) {
	    // Close the browser if code found or error
	    authWindow.destroy();
	  }

	  // If there is a code, proceed to get token from github
	  if (code) {
			//writeToFile(code);
			newWindow();
			var options = { title: 'Please Copy the code below', message: code, buttons: [] };
			electron.dialog.showMessageBox(options);
	  } else if (error) {
	    alert('Oops! Something went wrong and we couldn\'t' +
	      'log you in using Github. Please try again.');
	  }
	}

	function readFile(){
		var path = app.getAppPath() + '/sample.json';
		var superDirectory = path.replace('app\/', '');

		var accessKeyFromFile = fs.readFileSync(superDirectory, 'utf-8');
		var accesCode = JSON.parse(accessKeyFromFile).code;

		return accesCode === null;
	}

	function writeToFile(code){
		var path = app.getAppPath() + '/sample.json';
		var superDirectory = path.replace('app\/', '');
		var objectToWrite = {
			"code": code
		}

		console.log(superDirectory);


		try {
	    fs.writeFileSync(superDirectory, JSON.stringify(objectToWrite ), 'utf-8');
	    console.log('Saved settings!');
	  } catch (err) {
	    throw err;
	  }
	}
}

function newWindow () {
	mainWindow = new BrowserWindow({
		"use-content-size": true,
		width: 1200,
		height: 750,
		"web-preferences": {
			"node-integration": false // loads jquery as global not module
		}
	});

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	// Open the DevTools.
	mainWindow.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

}

function printPdf (path) {
	var opts = {
		marginsType: 0,
		printBackground: true,
		printSelectionOnly: false,
		landscape: true
	};
	mainWindow.printToPDF(opts, function (pdf_err, result, a) {
		console.log('pdf_err', pdf_err);
		fs.writeFile(path, result, function (write_err) {
			console.log('write_err', write_err);
			shell.openItem(path);
		});
	});
}
