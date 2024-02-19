const joi = require("joi");
const apiResponse = require("../../helpers/apiResponse");

const validation = joi.object({
    token: joi.string().trim(true).required().empty().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
    }),
    userId: joi.string().trim(true).required().empty().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
    }),
    password: joi.string().min(8).trim(true).required().empty().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "string.min": `{#key} length must be at least {{#limit}} characters long`,
    }),
});

const resetPasswordValidation = async (req, res, next) => {
    const payload = {
        token: req.body.token,
        userId: req.body.userId,
        password: req.body.password,
    };

    const { error } = validation.validate(payload);
    if (error) {
        return apiResponse.notAcceptableRequest(res, `${error.message}`);
    } else {
        next();
    }
};

module.exports = resetPasswordValidation;
