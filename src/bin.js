#!/usr/bin/env node
var jacoco = require("./index");
var fs = require("fs");
var path = require("path");

var pathArg = process.argv[2] && process.argv[2].trim()
if (!pathArg) {
  console.log("Please provide a valid XML report path.")
  process.exit(1);
}
var filePath = path.resolve(pathArg);
var fileObj = path.parse(filePath);

function readFileAsync(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, "utf8", function (err, contents) {
      if (err) {
        reject(new Error(`Unable to read file ${filePath} from disk.`));
      }
      resolve(contents);
    });
  });
}

function writeToFile(filePath, fileName, content) {
  const fd = fs.openSync(path.join(filePath, fileName), "w");
  fs.writeFileSync(fd, content);
  fs.closeSync(fd);
}

readFileAsync(filePath).then((fileContents) => {
  return jacoco.parseContent(fileContents)
        .then(function (result) {
          writeToFile(fileObj.dir, fileObj.name + ".json", JSON.stringify(result, null, 2));
          console.log("File exported to", path.join(fileObj.dir, fileObj.name + ".json"));
        }).catch(function (err) {
          console.error(err);
        });
});


