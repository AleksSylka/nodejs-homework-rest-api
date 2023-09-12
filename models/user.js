const { Schema, model } = require('mongoose');

const Joi = require("joi");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema({
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: true,
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
}).messages({
    'string.min': 'The {#label} field must contain at least {#limit} characters',
    'any.required': 'missing required {#label} field',
    'string.pattern.base': 'The field {#label} must be a valid email'
  });

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
}).messages({
    'string.min': 'The {#label} field must contain at least {#limit} characters',
    'string.pattern.base': 'The field {#label} must be a valid email',
    'any.required': 'missing required {#label} field',
  });

const schemas = { registerSchema, loginSchema };

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}