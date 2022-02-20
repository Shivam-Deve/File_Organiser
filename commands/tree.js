let fs = require("fs");
let path = require("path");
function tree() {
  let dirPath = process.cwd();
  treeHelper(dirPath, "");
}

function treeHelper(dirPath, indent) {
  let isFile = fs.lstatSync(dirPath).isFile();
  if (isFile) {
    let fName = path.basename(dirPath);
    console.log(indent, "|__", fName);
  } else {
    let dName = path.basename(dirPath);
    console.log(indent, "|--", dName);
    let childrens = fs.readdirSync(dirPath);
    for (let i = 0; i < childrens.length; i++) {
      let childPath = path.join(dirPath, childrens[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}
module.exports = tree;
