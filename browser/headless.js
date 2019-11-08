require('../promise-retry.js');
const pup = require('puppeteer');
let _ph, _page;

var _ = {
	// page property
	page: _page,
	// instance
	instance: _ph,

	/**
	 * Open a new page for specified url.
	 * @param  {String} url URL to open
	 * @param {Object} options It can be { onLoadFinished: (status), onResourceRequested: (requestData), onResourceReceived: (resource) }. All properties are optional.
	 * @return {Object}     Promise object. Success will contain result from opening page. Otherwise return error object.
	 */
	openURL: function(url, options) {
		let fn = async () => {
			const browser = await pup.launch();
			const page = await browser.newPage();
			await page.goto(url, {waitUntil: 'networkidle2'});
			_page = page;
			return page.content();
		};
		return fn();
	},

	/**
	 * Clear resource
	 */
	clear: function() {
		if (_ph) {
			_ph.exit();
		}
	}
};

module.exports = _;
