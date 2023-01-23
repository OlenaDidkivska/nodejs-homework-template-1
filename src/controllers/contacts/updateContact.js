const service = require("../../service/contactService");

const updateContact = async (req, res) => {
  const { id: contactId } = req.params;
  const {id: userId} = req.user;

  const contact = await service.updateContact(userId, contactId, req.body);

  if (!contact) {
    res.status(400).json({ message: `Not contact with id: ${contactId} found` });
    return;
  }

  res.status(200).json({
    status: "contact update",
    code: 200,
  });
};

module.exports = updateContact;
