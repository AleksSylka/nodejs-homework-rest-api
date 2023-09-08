const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const notSendField = "-createdAt -updatedAt";

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, notSendField, { skip, limit }).populate("owner", "email");
    res.send(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id, notSendField);
    if (!result) {
        throw HttpError(404, "Not found");
    };
    res.send(result);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
};

const updateContactById = async (req, res) => {
    if (JSON.stringify(req.body) === '{}') {
        throw HttpError(400, "Missing fields");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.send(result);
};

const updateFavorite = async (req, res) => {
    if (JSON.stringify(req.body) === '{}') {
        throw HttpError(400, "Missing field favorite");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.send(result);
}

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteContactById: ctrlWrapper(deleteContactById),
};