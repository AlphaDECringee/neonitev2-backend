const NeoLog = require('./structs/NeoLog')
const express = require("express");
const fs = require("fs");
const errors = require("./structs/errors");
const { v4: uuidv4 } = require("uuid");
const { default: axios } = require('axios');
const axiosPackage = require('axios/package.json')
const compression = require('compression');


try {
	var cookieParser = require("cookie-parser");
} catch {
	NeoLog.warn('Missing module(s), running npm i')
	const child_process = require('child_process');
	child_process.execSync('npm i', { stdio: 'inherit' });

	console.log('\n\n')
	try {
		var cookieParser = require("cookie-parser");
	} catch { NeoLog.Error('Module install failed, join our discord for more help: https://dsc.gg/neonite'); }
}


const app = express();
	app.use((req, res, next) => {
		if(req.originalUrl === "/fortnite/api/calendar/v1/timeline"){
			next()//cleans up the log
		}
		else{
			NeoLog.URL(`${req.originalUrl}`);
			next();
		}
	});
	app.use("/", express.static("public"));
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(cookieParser());
	app.set("etag", false);
	app.use(compression());





const { ApiException } = errors;
const version = require('./package.json').version;
global.xmppClients = [];
global.port = 5595;



(function () {
	"use strict";

	String.prototype.format = function () {
		const args = arguments[0] instanceof Array ? arguments[0] : arguments;
		return this.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != "undefined" ? args[number] : match;
		});
	};

	async function compareAndUpdateKeychain() {
		try {
		  const response = await axios.get('https://spush-tracker-v3.up.railway.app/keychain');
		  const data = response.data;
		  // read the local JSON array from the file
		  const localData = JSON.parse(fs.readFileSync('./responses/keychain.json'));
		  // iterate over the entries in the URL array
		  for (const entry of data) {
			// check if the entry is not present in the local array
			if (!localData.includes(entry)) {
			  // add the entry to the local array
			  localData.push(entry);
			}
		  }
		  // save the updated local array to the file
		  fs.writeFileSync('./responses/keychain.json', JSON.stringify(localData));
		  
		} catch {
	
			const response = await axios.get('https://api.nitestats.com/v1/epic/keychain');
			  const data = response.data;
			const localData = JSON.parse(fs.readFileSync('./responses/keychain.json'));
			for (const entry of data) {
				if (!localData.includes(entry)) {
				localData.push(entry);
				}
			}
			fs.writeFileSync('./responses/keychain.json', JSON.stringify(localData));
			}
			fs.readFile('./responses/keychain.json', 'utf8', (err, data) => {
			if (err) throw err;
	
			const updated = data.replace(/,/g, ',\n'); // i know there are better ways to do this
	
			fs.writeFile('./responses/keychain.json', updated, 'utf8', (err) => {
			  if (err) throw err;
			});
	  });
	  NeoLog.Debug(`Updated keychain.json`)
	
	}

	async function startBackend(){
		app.listen(port, () => {
			if (process.argv.includes("--test")) {
				require(`${__dirname}/.github/test/testing.js`)(app);
				process.exit(0)
			}
			NeoLog.Log(`v${version} is up and listening on port ${port || 5595}!`);
		});
	}

	async function updateBackend() {

		const fileArray = [
			"managers/account.js",
			"managers/api.js",
			"managers/cloudstorage.js",
			"managers/discovery.js",
			"managers/fortnite-game.js",
			"managers/matchmaking.js",
			"managers/mcp.js",
			"managers/oauth.js",
			"managers/players.js",
			"managers/timeline.js",
			"managers/user.js",
			"hotfixes/DefaultEngine.ini",
			"hotfixes/DefaultGame.ini",
			"hotfixes/DefaultRuntimeOptions.ini",
			"discovery/discoveryMenu.json",
			"discovery/events.js",
			"discovery/latest/discoveryMenu.json"
			
		]
		for(const i of fileArray){
			const RawURL = `https://raw.githubusercontent.com/HybridFNBR/Neonite/main/${i}`;
			try {
				const response = await fetch(RawURL);
				const RawContent = await response.text();
				await fs.writeFileSync(`${__dirname}/${i}`, RawContent);
				
			} catch (error) {
				console.error('Error updating file:', error.message);
			}
		}
	}
	


	fs.readdirSync(`${__dirname}/managers`).forEach(route => {
		require(`${__dirname}/managers/${route}`)(app, port);
	})

	app.use((req, res, next) => {
		next(new ApiException(errors.com.epicgames.common.not_found));
	})

	app.use((err, req, res, next) => {
		let error = null;

		if (err instanceof ApiException) {
			error = err;
		} else {
			const trackingId = req.headers["x-epic-correlation-id"] || uuidv4();
			error = new ApiException(errors.com.epicgames.common.server_error).with(trackingId);
			console.error(trackingId, err);
		}

		error.apply(res);
	});


	async function functions(){
		await updateBackend();
		await compareAndUpdateKeychain();
		await startBackend();
	}
	
	functions()

	module.exports = app;
}());
