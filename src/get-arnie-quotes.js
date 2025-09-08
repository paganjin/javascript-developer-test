const { httpGet } = require("./mock-http-interface");

/**
 * Fetches and processes quotes from multiple URLs in parallel
 * @param {string[]} urls - Array of URLs to fetch quotes from
 * @returns {Promise<Array<{ 'Arnie Quote': string } | { FAILURE: string }>>} - Array of result objects
 */
const getArnieQuotes = async (urls) => {
	const responses = await Promise.all(urls.map((url) => httpGet(url)));

	return responses.map(({ status, body }) => {
		const { message } = JSON.parse(body);
		return status === 200 ? { "Arnie Quote": message } : { FAILURE: message };
	});
};

module.exports = {
	getArnieQuotes,
};
