const upload = require("./uploadTest");

async function test(filePath) {
  const result = await upload(filePath);
  return result;
}

module.exports = test;