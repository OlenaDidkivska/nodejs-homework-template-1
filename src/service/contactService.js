const Contact = require("./schemas/contacts");
const { UpdateStatusError } = require("../helpers/errors");

const getAllContacts = async (owner, skip, limit, favorite) => {
  const list =  Contact.find({owner, favorite}).skip(skip).limit(limit);
  console.log(list);
  return list
};

const getContactById = (owner, id) => {
  return Contact.findOne({_id: id, owner});
};

const createContact = (owner, body ) => {
  const { name, phone, email, favorite } = body;
  console.log(owner);
  return Contact.create({ name, phone, email, favorite, owner });
};

const updateContact = (owner, id, body) => {
  const { name, phone, email } = body;
  return Contact.findOneAndUpdate({_id: id, owner}, { name, phone, email }, { new: true });
};

const removeContact = (owner, id) => {
  return Contact.findOneAndRemove({ _id: id, owner });
};

const updateStatusContact = (owner, id, { favorite }) => {
  console.log(favorite);
  if (favorite === undefined) {
    throw new UpdateStatusError("Not found");
  }

  return Contact.findOneAndUpdate({_id: id, owner}, { favorite }, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
