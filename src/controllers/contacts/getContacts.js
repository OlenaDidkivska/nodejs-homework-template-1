const service = require("../../service/contactService");

const getContacts = async (req, res) => {
  const {limit = 10, page = 1, favorite} = req.query
  const {id} = req.user;

  console.log("id:", req.user.id);

  const skip = (page-1)*limit
  const results = await service.getAllContacts(id, skip, limit, favorite);
  return res.json({
    status: "success",
    code: 200,
    data: results,
  });
};

module.exports = { getContacts };
