'use strict';

const logError = require('./Util').logError;
const readFile = require('fs').readFile;
const promisify = require('util').promisify;
const LOCATION = 'GTFS/';

class CsvReader {
	constructor(filename) {
		this.filename = filename;
		this.fileReader = promisify(readFile);
	}

	get rows() {
		return this._rows;
	}

	/**
	 * Reads all the lines of the CsvReader's assigned file
	 * and maps csv headers to their columns 
	 */
	async readLines() {
		let file = await this.fileReader([LOCATION, this.filename].join(''), 'utf-8').catch(logError);
		
		const endOfLineRegex = /[\r\n]+/;
		let rows = file.split(endOfLineRegex); // Get csv rows
		const headers = rows[0].split(','); // Get headers
		rows = rows.slice(1, rows.length - 1); // Get rows without header and last line which is empty
		
		// Create array of objects instead of array of arrays 
		rows = rows.map(row => {
			let columns = row.split(',');
			let columnMap = {};
			columns.forEach((column, index) => {
				columnMap[headers[index]] = column;
			});
			return columnMap;
		});

		this._rows = rows;
	}
}

module.exports = CsvReader;