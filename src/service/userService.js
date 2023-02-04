const User = require("./schemas/auth");
const Jimp = require("jimp")
const path = require("path");
const fs = require('fs').promises;

const current = (id) => {
  return User.findById(id);
};

const updateAvatar = async (id, avatarURL, filename, extension) => {
  const tmpPath = path.resolve(__dirname, "../../tmp", filename)
  const URL = avatarURL.slice(-32)

  const newPath = path.resolve(__dirname, `../../public/avatars/${URL}.${extension}`)
  const newAvatarUrl = `/public/avatars/${URL}.${extension}`

  try {
    const avatar = await Jimp.read(tmpPath)
      .then(img => {
        return img
          .resize(250, 250) // resize
      })
      .catch(err => {
        console.error(err);
      });

    avatar.write(newPath)
      

  } catch (error) {
    console.error("error while moving file to public", error)
  }
 console.log(newAvatarUrl);
  const user = User.findByIdAndUpdate(id, { avatarURL: newAvatarUrl}, { new: true });
  console.log(user);
  fs.unlink(tmpPath)
  return user
}

module.exports = {
  current,
  updateAvatar,
};
