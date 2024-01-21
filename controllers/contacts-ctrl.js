const HttpError = require("../helpers/HttpError");
const contacts = require("../service");
const schemas = require("../schema/contacts-schema");

const getAllContacts = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const allContacts = await contacts
      .listContacts({ owner: id }, null, { skip, limit })
      .populate("owner", "email subscription");
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { contactId: _id } = req.params;
    const { id } = req.user;

    const result = await contacts.getContact({ _id, owner: id });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body, {
      errors: { wrap: { label: false } },
      messages: { "any.required": "missing required {{#label}} field" },
    });
    if (error) {
      throw HttpError(400, error.message);
    }
    console.log(req.user);
    const { id: owner } = req.user;
    const result = await contacts.addContact({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }
    const { error } = schemas.updateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactFieldFavorite = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing field favorite");
    }
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateStatusContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContactById,
  updateContactFieldFavorite,
};
