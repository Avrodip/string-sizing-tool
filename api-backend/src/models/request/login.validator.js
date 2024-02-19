const joi = require("joi");
const apiResponse = require("../../helpers/apiResponse");

const validation = joi.object({
    email: joi.string().email().empty().trim(true).required().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "string.email": `{#key} must be a valid email`,
    }),
    password: joi.string().empty().trim(true).required().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
    }),
});

const loginValidation = async (req, res, next) => {
    const payload = {
        email: req.body.email,
        password: req.body.password,
    };

    const { error } = validation.validate(payload);
    if (error) {
        return apiResponse.notAcceptableRequest(res, `${error.message}`);
    } else {
        next();
    }
};

module.exports = loginValidation;
