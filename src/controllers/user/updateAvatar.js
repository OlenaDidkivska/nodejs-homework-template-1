
const service = require("../../service/userService");

const updateAvatar = async (req, res, next) => {
  const {filename} = req.file
  const [, extension] = filename.split(".");
  const {id, avatarURL} = req.user;
  console.log(avatarURL);

    const user = await service.updateAvatar(id, avatarURL, filename, extension)

    return res.status(200).json({
    data: {
      avatarUrl: user.avatarURL,
    }
  })
}


module.exports = updateAvatar;
