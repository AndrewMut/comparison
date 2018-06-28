  //request constructor 

  function Xhr() {
    var xhr = this;
    var xmlHttp = new XMLHttpRequest();

    xhr._get = function(url, success, error) {
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          success(xmlHttp.responseText);
        } else {
          error({
            message: xmlHttp.status + ' ' + xmlHttp.readyState
          });
        }
      }

      xmlHttp.open("GET", url, true);
      xmlHttp.send();
    };

    return xhr;
  }