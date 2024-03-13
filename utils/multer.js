const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const path = require("path")

const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/profile')
    },
    filename: function (req, file, cb) {
     const uniqueFilename = uuidv4();
     cb(null, uniqueFilename + path.extname(file.originalname))
    }
  })
  
  const profilePicUpload = multer({ storage: profilePicStorage, 
    // Allow any file type
  fileFilter: (req, file, cb) => {
    cb(null, true);
  } })

  const postPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/post')
    },
    filename: function (req, file, cb) {
     const uniqueFilename = uuidv4();
     cb(null, uniqueFilename + path.extname(file.originalname))
    }
  })
  
  const postPicUpload = multer({ storage: postPicStorage, // Allow any file type
  fileFilter: (req, file, cb) => {
    cb(null, true);
  } })

  module.exports = {profilePicUpload, postPicUpload};