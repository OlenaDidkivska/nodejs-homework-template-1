const service = require("../../service/contactService");

const postContact = async (req, res, next) => {
  const {id} = req.user;
  await service.createContact(id, req.body );
  res.status(201).json({
    status: "contact added successfully",
    code: 201,
  });
};

module.exports = postContact;
