const express = require("express");
const router = express.Router();
const pdf = require("pdf-poppler");
const file = "./test.pdf";

let opts = {
  format: "png",
  out_dir: __dirname + "/test",
  out_prefix: "poppler",
  page: null,
  combinedImage: true
}

router.get("/", () => {
  pdf.convert(file, opts)
    .then(rq => {
      console.log(rq);
      console.log("Successfully converted");
    })
    .catch(error => {
      console.error(error);
    })
});



module.exports = router;
