const service = require("../../service/contacts");

const getContacts = async (req, res) => {
  const results = await service.getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: results,
  });
};

module.exports = { getContacts };
