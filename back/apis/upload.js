const express = require("express");
const router = express.Router();
const pdf = require("pdf-poppler");
// const Zip = require("machinepack-zip");

//  /* 아마존 S3에 올리기 */
// const uploadS3 = require("../config/multer");

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
    cb(null, file.uploadedFile.name);
  }
});
const upload = multer({
  dest: "uploads/",
  storage: storage
});

router.post("/upload", upload.any(), async (req, res) => {
  const filename = req.files[0].filename;
  const filePath = req.files[0].filename.split(".pdf")[0];
  const file = "./uploads/" + filename;
  const opts = {
    format: "png",
    out_dir: __dirname + "/" + filePath,
    out_prefix: "poppler",
    page: null,
    combinedImage: true
  }
  await pdf.convert(file, opts)
    .then(async (rq) => {
      console.log(rq);
      console.log(JSON.stringify(rq));
      console.log("Successfully converted");
    })
    .catch(error => {
      console.error(error);
    })
  res.send({
    file: req.files,
    body: req.body
  });
});

module.exports = router;
