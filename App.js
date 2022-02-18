let fs = require('fs');
let path = require('path');
let args = process.argv.slice(2);
let command = args[0];
let dirPath = args[1];
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    programs:['java','py','js','class','json']
}
switch (command) {
    case "tree":
        treeFn(dirPath);
        break;
    case "organise":
        organiseFn(dirPath);
        break;
    case "help":
        helpFn(dirPath);
        break;
}
function treeFn(dirPath) {
    
}
function organiseFn(dirPath) {
    if (dirPath == undefined) {
        console.log("Please enter a valid argument");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            let destPath = path.join(dirPath, "organised_files");
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath);
            }
            organiseFnHelper(dirPath, destPath);
        } else {
            console.log("Please enter a valid argument");
        }
    }
}
function helpFn(dirPath) {
    console.log(`
        List of all commands:
            node App.js tree "directoryPath"
            node App.js organise "directoryPath"
            node App.js help "directoryPath"
    `);
}

function organiseFnHelper(src, dest) {
    let childFiles = fs.readdirSync(src);
    for (let i = 0; i < childFiles.length; i++){
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
        fs.mkdirSync(catagoryPath)
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
        for (let i = 0; i < cType.length; i++){
            if (ext == cType[i]) {
                return type;
            }
        }
    }
    return "others";
}