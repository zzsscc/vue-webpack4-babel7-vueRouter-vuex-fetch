const path = require('path');
const ROOT = path.resolve(__dirname, '../..');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  srcRoot(args) {
    return path.join(ROOT, 'src', args);
  },
  rootNode(args) {
    return path.join(ROOT, args);
  },
  src() {
    return resolve('src');
  }
}