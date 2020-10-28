const upload = require("./uploadTest");

console.log("upload Page");
async function test() {
  const result = await upload("자료구조")
  console.log("과연 : ", result);
}

test();
