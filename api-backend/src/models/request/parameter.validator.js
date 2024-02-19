const joi = require("joi");
const apiResponse = require("../../helpers/apiResponse");

const validation = joi.object({
    parameterID: joi.string().empty().required().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
    }),
});

const parameterValidation = async (req, res, next) => {
    const payload = {
        parameterID: req.body.parameterID,
    };

    const { error } = validation.validate(payload);
    if (error) {
        return apiResponse.notAcceptableRequest(res, `${error.message}`);
    } else {
        next();
    }
};

module.exports = parameterValidation;
