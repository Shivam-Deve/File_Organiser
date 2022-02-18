let fs = require("fs");
let path = require("path");

let types = {
  media: ["mp4", "mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex"
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  programs: ["java", "py", "js", "class", "json"]
};

function organiseFn(option) {
  dirPath = process.cwd();
  let doesExist = fs.existsSync(dirPath);
  if (doesExist) {
    let destPath = path.join(dirPath, "organised_files");
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
    if (option != undefined) {
      organiseFnHelperByExtention(dirPath, destPath, option);
    } else {
      organiseFnHelper(dirPath, destPath);
    }
  }
}

function organiseFnHelperByExtention(src, dest, opt) {
  let childFiles = fs.readdirSync(src);
  for (let i = 0; i < childFiles.length; i++) {
    let childAddress = path.join(src, childFiles[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      if (path.extname(childAddress) == opt) {
        sendFile(childAddress, dest, opt.slice(1));
      }
    }
  }
}

function organiseFnHelper(src, dest) {
  let childFiles = fs.readdirSync(src);
  for (let i = 0; i < childFiles.length; i++) {
    let childAddress = path.join(src, childFiles[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      let typ = getCatagory(childAddress);
      sendFile(childAddress, dest, typ);
    }
  }
}

function sendFile(src, dest, catagory) {
  let catagoryPath = path.join(dest, catagory);
  if (!fs.existsSync(catagoryPath)) {
    fs.mkdirSync(catagoryPath);
  }
  let fileName = path.basename(src);
  let destPath = path.join(catagoryPath, fileName);
  fs.copyFileSync(src, destPath);
}

function getCatagory(name) {
  let ext = path.extname(name);
  ext = ext.slice(1);
  for (let type in types) {
    let cType = types[type];
    for (let i = 0; i < cType.length; i++) {
      if (ext == cType[i]) {
        return type;
      }
    }
  }
  return "others";
}
module.exports = organiseFn;
