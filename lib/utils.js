const path = require('path');

function getUploadFolder() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = addZero(now.getMonth() + 1);
  return year + '-' + month;
}

function normalizeFileName(file) {
  return file.hash.replace(/_/g, '-').toLowerCase() + file.ext;
}

function normalizeGitHubPath(file) {
  return path.join(getUploadFolder(), normalizeFileName(file));
}

function addZero(num) {
  return (num < 10 ? '0' : '') + num;
}

module.exports = {
  normalizeGitHubPath
}
