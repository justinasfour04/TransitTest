'use strict';

const RouteFinder = require('./RouteFinder');
const logError = require('./Util').logError;
const console = require('console');

class Main {
	async run() {
		console.time('Main');
		const routeFinder = new RouteFinder();
		let grandCentralStopIds = await routeFinder.getStopIds('Grand Central').catch(logError);
		let tripsThroughGrandCentral = await routeFinder.getTrips(grandCentralStopIds).catch(logError);
		let grandCentralRoutes = await routeFinder.getRoutesIds(tripsThroughGrandCentral).catch(logError);
		console.log(grandCentralRoutes);
		console.timeEnd('Main');
	}
}

const main = new Main();
main.run();