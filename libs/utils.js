const fs = require("fs");

function capitalize(str) {
  return str.slice(0, 1).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
}

function saveFile(pathFileName, data) {
  if (typeof data == "object") {
    data = JSON.stringify(data);
  }

  try {
    fs.writeFileSync(pathFileName, data);
  } catch (error) {
    console.error("File not saved", data);
  }
  return data;
}

module.exports = {
  saveFile,
  capitalize,
};
