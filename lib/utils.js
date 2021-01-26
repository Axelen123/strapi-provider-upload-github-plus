const path = require('path');

function getUploadDir() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = addZero(now.getMonth() + 1);
  return year + '-' + month;
}

function normalizeFileName(file) {
  return file.hash.replace(/_/g, '-').toLowerCase() + file.ext;
}

function normalizeFilePath(file) {
  return path.join(getUploadDir(), normalizeFileName(file));
}

function addZero(num) {
    return (num < 10 ? '0' : '') + num;
}

module.exports = {
  normalizeFilePath
}
