const joi = require("joi");
const apiResponse = require("../../helpers/apiResponse");

const validation = joi.object({
    email: joi.string().email().required().empty().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "string.email": `{#key} must be a valid email`,
    }),
    otp: joi.string().required().empty().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
    }),
});

const confirmAccountValidation = async (req, res, next) => {
    const payload = {
        email: req.body.email,
        otp: req.body.otp,
    };

    const { error } = validation.validate(payload);
    if (error) {
        return apiResponse.notAcceptableRequest(res, `${error.message}`);
    } else {
        next();
    }
};

module.exports = confirmAccountValidation;
