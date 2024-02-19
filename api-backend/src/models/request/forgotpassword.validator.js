const joi = require("joi");
const apiResponse = require("../../helpers/apiResponse");

const validation = joi.object({
    email: joi.string().email().trim(true).required().empty().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "string.email": `{#key} must be a valid email`,
    }),
});

const forgotPasswordValidation = async (req, res, next) => {
    const payload = {
        email: req.body.email,
    };

    const { error } = validation.validate(payload);
    if (error) {
        return apiResponse.notAcceptableRequest(res, `${error.message}`);
    } else {
        next();
    }
};

module.exports = forgotPasswordValidation;
