function ObjectSorter() {
  let os = this;
  let internalData = null;

  os.handleData = function(data, key, value) {
    internalData = data;
    return getObjByKeyAndVal(key, value);
  };

  function getObjByKeyAndVal(key, value) {

    if (!!internalData && !!internalData.length) {

      for (let i = 0; i < internalData.length; i++) {
        if (internalData[i][key] === value) {
          return internalData[i];
        }
      }
      return null;
    }

    return null;
  }

  return os;
}

module.exports = ObjectSorter;