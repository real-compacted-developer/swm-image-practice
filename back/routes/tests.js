const express = require("express");
const router = express.Router();
const PDFImage = require("pdf-image").PDFImage;

router.get("/", function (req, res) {
  var pdfPath = "./test.pdf";
  console.log("pdfPath : ", pdfPath);
  var pageNumber = 1
  console.log("pageNumber : ", pageNumber);

  var pdfImage = new PDFImage(pdfPath);
  console.log(pdfImage);
  pdfImage.convertPage(pageNumber).then(function (imagePath) {
    res.sendFile(imagePath);
  }, function (err) {
    res.status(500).send(err);
  });
});



module.exports = router;
