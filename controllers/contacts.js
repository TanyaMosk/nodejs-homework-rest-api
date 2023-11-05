const Contact = require('../models/contact');

const { HttpError } = require("../helpers");

const { contactSchema, updateFavoriteSchema } = require('../utils/validation');

const listContacts = async (req, res, next) => {
    try {
        const result = await Contact.find();
        res.json(result);
  
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);

    } catch (error) {
        next(error);
    }
};
  
const addContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing required name field");
        }
        const result = await Contact.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error);
    }
};
  
const updateContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing fields");
        }
        const { contactId } = req.params;
   
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const { error } = updateFavoriteSchema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing fields");
        }
        const { contactId } = req.params;
   
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}
