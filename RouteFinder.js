'use strict';

const CsvReader = require('./CsvReader');
const logError = require('./Util').logError;

class RouteFinder {

	/**
	 * Get all the stop ids that match the stop name
	 * 
	 * @param {string} stopName Name of the stop 
	 * @returns {Set<string>} Set of stop ids
	 */
	async getStopIds(stopName) {
		const stopsReader = new CsvReader('stops.txt');
		await stopsReader.readLines().catch(logError);
		
		let stops = stopsReader.rows.filter(stop => stop.get('stopName').includes(stopName));
		return new Set(stops.map(stop => stop.get('stopId')));
	}

	/**
	 * Given stop ids, get all the trip ids that include them
	 * 
	 * @param {Set<string>} stopIds Ids of stops
	 * @return {Set<string>} Set of trip ids 
	 */
	async getTrips(stopIds) {
		const stopTimesReader = new CsvReader('stop_times.txt');
		await stopTimesReader.readLines().catch(logError);

		let trips = stopTimesReader.rows.filter(stopTimes => stopIds.has(stopTimes.get('stopId')));
		return new Set(trips.map(trip => trip.get('tripId')));
	}

	/**
	 * Given trip ids, get all the route ids that they correspond to
	 * 
	 * @param {Set<string>} tripIds
	 * @returns {Set<string>} Route ids of the given trips
	 */
	async getRoutesIds(tripIds) {
		const tripsReader = new CsvReader('trips.txt');
		await tripsReader.readLines().catch(logError);

		let routes = tripsReader.rows.filter(trips => tripIds.has(trips.get('tripId')));
		return new Set(routes.map(route => route.get('routeId')));
	}
}

module.exports = RouteFinder;