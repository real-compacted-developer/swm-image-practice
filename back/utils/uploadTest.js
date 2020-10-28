const fs = require("fs");
const awsUpload = require("./awsUpload");

// reg ex to match
const re = /\.png$/;
// For dev purposes only

// function read(name, file) {

// }

const upload = async (name) => {
  console.log("upload In");
  // ensure that this file is in the directory of the files you want to run the cronjob on
  const result = [];
  const test = fs.readdirSync(`./back/${name}`);
  const matches = test.filter((text) => { return re.test(text) });
  // console.log("These are the files you have", matches)
  const numFiles = matches.length;
  if (numFiles) {
    for (let i = 0; i < numFiles; i++) { // Read in the file, convert it to base64, store to S3
      const file = matches[i];
      const filePath = __dirname + `/../${name}/` + file;
      // console.log(filePath);
      const str = fs.readFileSync(filePath);
      // Buffer Pattern; how to handle buffers; straw, intake/outtake analogy
      const base64data = new Buffer.from(str, "binary");
      const url = await awsUpload(file, base64data);
      console.log("url : ", url);
      result.push(url);
      // fs.readFile(filePath, (err, data) => {
      //   if (err) {
      //     throw err;
      //   }
      // })
    }
  }
  console.log("result : ", result);
  return result;
};

module.exports = upload;