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
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(phoneValeo).required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};