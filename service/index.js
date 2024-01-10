const Contact = require("./schemas/contact");

const listContacts = () => {
  return Contact.find();
};

const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const addContact = (body) => {
  return Contact.create(body);
};

const updateContact = (contactId, fields) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

const removeContact = (contactId) => {
  return Contact.findByIdAndDelete({ _id: contactId });
};

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
