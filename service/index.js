const Contact = require("./schemas/contact");

const listContacts = (filter, fields, pagination) => {
  return Contact.find(filter, fields, pagination);
};

const getContact = (contactId, filter) => {
  return Contact.findOne(contactId, filter);
};

const addContact = (body) => {
  return Contact.create(body);
};

const updateContact = (contactId, fields) => {
  return Contact.findByIdAndUpdate(contactId, fields, { new: true });
};

const removeContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContact,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
