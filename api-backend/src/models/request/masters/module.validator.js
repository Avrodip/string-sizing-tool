const joi = require("joi");
const apiResponse = require("../../../helpers/apiResponse");

const validation = joi.object({
    moduleName: joi.string().max(255).empty().trim(true).required().messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "string.max": `{#key} should not exceed 255 characters`,
    }),
    status: joi.boolean().required().messages({
        "boolean.base": `{#key} must be a boolean`,
        "any.required": `{#key} is a required field`,
    }),
    createdBy: joi.number().integer().positive().required().messages({
        "number.base": `{#key} must be a number`,
        "number.integer": `{#key} must be an integer`,
        "number.positive": `{#key} must be a positive integer`,
        "any.required": `{#key} is a required field`,
    }),
    createdAt: joi.date().required().messages({
        "date.base": `{#key} must be a date`,
        "any.required": `{#key} is a required field`,
    }),
    updatedBy: joi.number().integer().positive().required().messages({
        "number.base": `{#key} must be a number`,
        "number.integer": `{#key} must be an integer`,
        "number.positive": `{#key} must be a positive integer`,
        "any.required": `{#key} is a required field`,
    }),
    updatedAt: joi.date().required().messages({
        "date.base": `{#key} must be a date`,
        "any.required": `{#key} is a required field`,
    }),
});

const moduleMasterValidation = async (req, res, next) => {
    const payload = {
        moduleID: req.body.moduleID,
        status: req.body.status,
        createdBy: req.body.createdBy,
        createdAt: req.body.createdAt,
        updatedBy: req.body.updatedBy,
        updatedAt: req.body.updatedAt,
    };

    const { error } = validation.validate(payload);
    if (error) {
        return apiResponse.notAcceptableRequest(res, `${error.message}`);
    } else {
        next();
    }
};

module.exports = moduleMasterValidation;
