const express = require("express");
const router = express.Router();
const pdf = require("pdf-poppler");
const fs = require("fs");
const test = require("../utils/test");
// const Zip = require("machinepack-zip");
// const axios = require("axios");
//  /* 아마존 S3에 올리기 */
// const uploadS3 = require("../config/multer");

/* multer로 서버에 올리기 */
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     file.uploadedFile = {
//       name: file.originalname,
//       ext: file.mimetype.split("/")[1]
//     };
//     cb(null, file.uploadedFile.name);
//   }
// });
// const upload = multer({
//   dest: "uploads/",
//   storage: storage
// });
const upload = require("../config/multer");
router.post("/upload", upload.any(), async (req, res) => {
  const filename = req.files[0].filename;
  const filePath = req.files[0].filename.split(".pdf")[0];
  const file = "./uploads/" + filename;
  const opts = {
    format: "png",
    out_dir: __dirname + "/../" + filePath,
    out_prefix: filename,
    page: null,
    combinedImage: true
  }
  try {
    fs.mkdirSync(filePath);
  } catch (e) {
    if (e.code != "EEXIST") throw e;
  }
  await pdf.convert(file, opts)
    .then(async () => {
      console.log(`${filePath} Successfully converted`);
    })
    .then(async () => {
      const result = await test(filePath);
      console.log("result : ", result);
      res.json({
        success: true,
        data: result
      });
    })
    .catch(error => {
      console.error(error);
    })

});
module.exports = router;
