const service = require("../../service/contactService");

const deleteContact = async (req, res) => {
  const { id: contactId } = req.params;
  const {id: userId} = req.user;
  const contact = await service.getContactById(userId , contactId);

  if (!contact) {
    res.status(400).json({ message: `Not contact with id: ${contactId} found`});
    return;
  }

  await service.removeContact(userId , contactId);

  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
