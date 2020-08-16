const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.file;
  const fileName = myFile.name;
  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/public/${fileName}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({ name: myFile.name, path: `/${fileName}` });
  });
})

module.exports = router;
