const ObjectSorter = require('./object-sorter.service.js');
const fs = require('fs');
const readFilePromise = require('fs-readfile-promise'); //npm install fs-readfile-promise
const request = require('request'); //npm install request
const rp = require('request-promise'); //npm install request-promise
const assert = require('assert');

let sorter = new ObjectSorter();

let rqOptions = {
  uri: 'https://api.rabota.ua/dictionary/city',
  json: true // Automatically parses the JSON string in the response
};

let arr = rp(rqOptions)
  .then(function(res) {
    return res;
  })
  .catch(function(error) {
    throw error;
  });

let someJson = (async function() {
  let template = await readFilePromise('data.json', 'utf8');

  if (!!template) {
    return JSON.parse(template);
  } else {
    throw 'bad json';
  }
})();

async function getJsonAndArr(json, arr) {
  let template = await json;
  let cities = await arr;

  if (!!template && !!cities) {
    let searchResult = sorter.handleData(cities, 'en', 'Romny');

    fillEmptyKeys(template, searchResult);

    try {
      if (!assert.deepEqual(template, searchResult)) {
        console.log('Objects are similar');
      }
    } catch (error) {
      throw error;
    }
 
  } else {
    throw 'Incomplete data';
  }
}

function fillEmptyKeys(toFillObj, fromObj) {
  for (let val in toFillObj) {
    if (!toFillObj[val]) {
      toFillObj[val] = fromObj[val]
    }
  }
}

try {
  getJsonAndArr(someJson, arr);
} catch (error) {
  console.log('final error handle', error);
}