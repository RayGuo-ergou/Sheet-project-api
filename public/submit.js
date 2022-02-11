$(document).ready(function () {
  $('#submitBtn').click(function () {
    alert($('#submitTextArea').val());
    // console.log($('#submitTextArea').val());
    let inputArray = $('#submitTextArea').val().split(/\r?\n/);
    // console.log(inputArray);

    arrayToJson(inputArray);
    // console.log(arrayToJson(inputArray));
  });
});

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
