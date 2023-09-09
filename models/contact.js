const { Schema, model } = require('mongoose');

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const phoneValeo = /^\(?(\d{3})\) \d{3}-\d{4}$/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return phoneValeo.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phoneValeo).required(),
    favorite: Joi.boolean(),
}).messages({
    'string.min': 'The {#label} field must contain at least {#limit} characters',
    'string.max': 'The {#label} field cannot be longer than {#limit} characters',
    'string.email': 'The field {#label} must be a valid email',
    'any.required': 'missing required {#label} field',
    'string.pattern.base': 'The field {#label} must be a valid phone, example: (***) ***-****'
  });

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
}).messages({
    'any.required': 'Missing field favorite',
});

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};
