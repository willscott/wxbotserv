const req = require('request-promise-native');
const logger = require('../log/logger.js');

var _ = {
	/**
	 * Notify image message to Slack.
	 * @param  {String} qrcodeImageUrl QRCode image url
	 * @param {String} slackWebhookUrl Slack webhook url
	 * @return {Object}               	Promise object
	 */
	sendMsg: function(qrcodeImageUrl, config) {

		// check parameter first
		if (qrcodeImageUrl == null || qrcodeImageUrl == "")
			return Promise.reject(new Error('QRCode Image Url cannot be null or empty'));

		logger.log(qrcodeImageUrl);

		// create options to send a request
		var options = {
			method: 'POST',
			uri: config.webhook || process.env.SLACK_WEBHOOK_URL,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'channel': 'server-notifier',
				'text': 'QRCode image is generated for login attempt.',
				"attachments": [
	        {
	          'fallback': 'QRCode was generated for login attempt at ' + qrcodeImageUrl,
	          'title': 'QRCode Login',
	          'text': 'QRCode image was generated for login attempt at ' + this.getNiceCurrentDateTime(),
	          'image_url': qrcodeImageUrl,
	          'color': '#219b00'
	        }
		    ]
			},
			json: true
		};

		// return promise result via this request
		return req(options);
	},

	/**
	 * Get current nice format of date-time.
	 * @return {String} Nice and readable format for current date-time
	 */
	getNiceCurrentDateTime: function() {
		return new Date().toLocaleString();
	}
};

module.exports = _;
