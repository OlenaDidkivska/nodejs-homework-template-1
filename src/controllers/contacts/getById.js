const service = require("../../service/contactService");

const getById = async (req, res) => {
  const { id: contactId } = req.params;
  const {id: userId} = req.user;
  const contact = await service.getContactById(userId, contactId);

  if (!contact) {
    res.status(400).json({ message: `Not contact with id: ${contactId} found` });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = getById;
