'use strict';

const logError = require('./Util').logError;
const fs = require('fs');
const parse = require('papaparse').parse;
const LOCATION = 'GTFS/';

class CsvReader {
	constructor(filename) {
		this.filename = filename;
		this.fileReader = (filename) => 
			new Promise((resolve, reject) => {
				parse(filename, {
					header: true,
					encoding: 'utf-8',
					complete: (results) => resolve(results),
					error: (error) => {
						if (error) reject(error);
					},
					skipEmptyLines: true,
					fastMode: true
				});
			});
	}

	get rows() {
		return this._rows;
	}

	/**
	 * Reads all the lines of the CsvReader's assigned file
	 * and maps csv headers to their columns 
	 */
	async readLines() {
		let file = fs.readFileSync([LOCATION, this.filename].join(''), 'utf-8');
		let rows = await this.fileReader(file).catch(logError);
		this._rows = rows.data;
	}
}

module.exports = CsvReader;