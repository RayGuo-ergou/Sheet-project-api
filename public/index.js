$(document).ready(function () {
  $('#submitBtn').click(function () {
    alert($('#test').val());
    console.log($('#test').val());
    let inputArray = $('#test').val().split(/\r?\n/);
    console.log(inputArray);

    arrayToJson(inputArray);
    console.log(arrayToJson(inputArray));
  });

  // copyBtn click listener
  $('#copyBtn').click(function () {
    copyToClipboard('#email');
  });
});

function copyToClipboard(element) {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val($(element).text()).select();
  document.execCommand('copy');
  $temp.remove();
}

function arrayToJson(array) {
  // split each element by colon character
  let newArray = array
    .map((r) => {
      r = r.split(/[\uff1a|:]/);
      return r;
    })
    .filter((r) => {
      return r.length > 1;
    }) // remove space for first element in each array
    .map((r) => {
      r[0] = r[0].replace(/\s/g, '');
      return r;
    });

  // array to json
  // use each array element as key and value
  let json = newArray.reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});
  // console.log(json);

  // finally return the json object
  return json;
}

// get spreadsheetId from spreadsheet url
const getIdFromUrl = (url) => {
  const id = url.match(/[-\w]{25,}/);
  return id[0];
};
