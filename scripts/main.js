    ////////////////////WARNING!!!!!!////////////////////
    //callbacks, promices and async/await were used in same instance just for representation purposes

    /// Used for testing purposes instead of using hosted/uploaded JSON
    var templateJson = '{"centerId":"","centerName":null,"id":"","ru":"Ромны","ua":"Ромни","en":"Romny"}';

    // Initialize request handler and sorter
    var httpResquestService = new Xhr();
    var objectSorter = new ObjectSorter();

    //CALLBACK BLOCK

    //using regular callback states
    httpResquestService._get('https://api.rabota.ua/dictionary/city', handleSuccess, handleStatus);

    function handleSuccess(data) {
      // use required key_value - 'en'_'Romny'
      console.log('handleSuccess');
      var searchResult = objectSorter.handleData(data, 'en', 'Romny');
      var localJson = JSON.parse(templateJson);

      //Fill empty keys
      for (var val in localJson) {
        if (!localJson[val]) {
          localJson[val] = searchResult[val]
        }
      }

      ////DIRTY checking, applicable only if object doesnt contain methods

      //sorting both objects
      var sortedSearchResult = sortObject(searchResult);
      var sortedLocalJson = sortObject(localJson);

      //after sorting objects checking if string representations are same
      if (JSON.stringify(sortedSearchResult) === JSON.stringify(sortedLocalJson)) {
        console.log('Objects similar in dirty comparison');
      } else {
        console.log('Objects different in dirty comparison');
      }

      function sortObject(obj) {
        var arr = [];
        var prop;
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            arr.push({
              'key': prop,
              'value': obj[prop]
            });
          }
        }
        arr.sort(function(a, b) {
          return a.value - b.value;
        });
        return arr;
      }

      //more generic but for usage should be modefied for properly handling null, undefined etc.

      isObjectsSame(sortedSearchResult, sortedLocalJson);

      function isObjectsSame(a, b) {
        var aKey = Object.getOwnPropertyNames(a);
        var bKeys = Object.getOwnPropertyNames(b);

        //Check if keys length same
        if (aKey.length != bKeys.length) {
          console.log('objects different in isObjectsSame');
          return false;
        }

        for (var i = 0; i < aKey.length; i++) {
          var propName = aKey[i];

          //Check if values same
          if (a[propName] !== b[propName]) {
            console.log('objects different in isObjectsSame');
            return false;
          }
        }
        console.log('Objects similar in isObjectsSame');
        return true;
      }
    }

    function handleStatus(error) {
      return console.log('handleStatus', error.message);
    }

    //CALLBACK BLOCK END

    //PROMISE BLOCK

    //imitating getting json
    var jsonFile = new Promise(function(resolve, reject) {
      if (true) {
        resolve(templateJson);
      } else {
        reject(templateJson);
      }
    });

    jsonFile.then(function(result) {
      return result;
    }, function(error) {
      console.log(error);
    });

    //PROMISE BLOCK END

    //ASYNC/AWAINT BLOCK

    async function getJsonAndArr(json) {

      var template = await json;

      if (!!template) {
        //Add logic of object comparison // was described in callback block
      }
    }

    getJsonAndArr(jsonFile);


    //ASYNC/AWAINT BLOCK END


    // Cant upload local files due to the CROS policy
    // in case if some server will be available for that and JSON could be uploaded there
    // next 2 functions will be used for getting this JSON

    //// FUNCTION 1

    function loadJSON(url, callback) {

      var xobj = new XMLHttpRequest();

      xobj.overrideMimeType("application/json");
      xobj.open('GET', url, false);

      xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == 200) {
          callback(xobj.responseText);
        }
      };
      xobj.send();
    }

    //// FUNCTION 1 END

    //// FUNCTION 2

    function initJson() {
      loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
      });
    }

    //// FUNCTION 2 END