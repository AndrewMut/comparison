  function ObjectSorter() {
    var os = this;
    var internalData = null;

    os.handleData = function(data, key, value) {
      internalData = JSON.parse(data);
      return getObjByKeyAndVal(key, value);
    };

    function getObjByKeyAndVal(key, value) {

      if (!!internalData && !!internalData.length) {

        for (var i = 0; i < internalData.length; i++) {
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