const express = require("express");
const router = express.Router();
//const Zip = require("adm-zip");\
const Zip = require("machinepack-zip");

router.get("/", function (req, res) {
  let zip = new Zip();
  zip.addLocalFolder(__dirname + "/test", "", (filename) => {
    console.log(filename);
  })
  zip.addLocalFolder(__dirname, "/test");
  zip.addFile(__dirname + "test", __dirname + "test", "뭘까");
  res.status(200).send("good");
});
router.get("/machinepack", (req, res) => {
  Zip.zip({
    sources: [__dirname + "/test"],
    destination: "test.zip",
  }).exec({
    error: function (err) {
      res.status(500).send("응 안돼" + err);
    },
    // OK.
    success: function (result) {
      res.status(200).send("수고했어" + result);
    },
  });
})

module.exports = router;
