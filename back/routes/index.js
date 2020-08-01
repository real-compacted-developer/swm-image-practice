const express = require("express");
const router = express.Router();

//  /* 아마존 S3에 올리기 */
//  const upload = require("../config/multer");

/* multer로 서버에 올리기 */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    file.uploadedFile = {
      name: file.originalname,
      ext: file.mimetype.split("/")[1]
    };
    cb(null, file.uploadedFile.name + "." + file.uploadedFile.ext);
  }
});
const upload = multer({
  dest: "uploads/",
  storage: storage
});

router.post("/upload", upload.any(), (req, res) => {
  console.log(req.files);
  res.send({
    file: req.files,
    body: req.body
  });
});

module.exports = router;
