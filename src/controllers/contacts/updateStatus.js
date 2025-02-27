const service = require("../../service/contactService");

const updateStatus = async (req, res) => {
  const { id: contactId } = req.params;
  const {id: userId} = req.user;

  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  await service.updateStatusContact(userId , contactId, req.body);

  res.status(200).json({
    status: "contact update",
    code: 200,
  });
};

module.exports = updateStatus;
