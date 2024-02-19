const apiResponse = require("../helpers/apiResponse");

/**
 * Get Dropdown List.
 *
 * @returns {Array}
 */
const getParameterList = async (req, res, next) => {
	try {
		const lookupData = await [{ id: 1, name: "ABC" }];
		if (lookupData) {
			return apiResponse.successResponseWithData(res, "Data List.", lookupData);
		} else {
			return apiResponse.successResponseWithData(res, "No Data available.", []);
		}
	} catch (error) {
		console.log(error);
		return apiResponse.expectationFailedResponse(res, error);
	}
};

module.exports = { getParameterList };
