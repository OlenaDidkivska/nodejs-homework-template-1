const { uuid } = require("uuidv4")
const path = require("path")
const multer = require("multer");
const uploadDir = path.join(process.cwd(), "tmp")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const [, extension] = file.originalname.split(".");
      cb(null, `${uuid()}.${extension}`);
    },
  });

  const uploadMiddleware = multer({storage})

  module.exports = uploadMiddleware