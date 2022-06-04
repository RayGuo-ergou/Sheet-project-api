$(document).ready(function () {
  //get sheetId from herf
  const sheetId = window.location.href.split('=')[1];
  // if sheetId is null or undefined , back to /
  if (sheetId === null || sheetId === undefined) {
    window.location.href = '/';
  }

  // get all sheets' title
  // an ajax get request to /sheets

  $.ajax({
    url: '/sheets',
    type: 'GET',
    data: {
      sheetId: sheetId,
    },
    success: function (data) {
      // console.log(data);
      // if data is not null or undefined
      if (data !== null && data !== undefined) {
        // set id title to data.title
        $('#title').html(data.title);
        // get all sheets' title
        const sheetsTitle = data.sheetsTitle;
        console.log(sheetsTitle);

        // add all sheets' title to the select element
        sheetsTitle.forEach((sheet) => {
          let element = `
          <p>
      <label>
        <input name="title" type="radio" value="${sheet}"  />
        <span>${sheet}</span>
      </label>
    </p>`;
          $('#titleForm').append(element);
        });
      }
    },
    error: function (err) {
      console.log(err);
      // alert there's error
      alert('There is an error, You will be redirected to home page.');
      // redirect to home page
      window.location.href = '/';
    },
  });

  $('#submitBtn').click(function () {
    // check which radio button is checked
    const title = $('input[name=title]:checked').val();
    console.log(title);

    // if title is null or undefined, alert error
    if (title === null || title === undefined) {
      alert('Please select a sheet');
    } else {
      //alert($('#submitTextArea').val());
      // console.log($('#submitTextArea').val());

      // if submitTextArea is null, space, or undefined, alert error
      if (
        $('#submitTextArea').val() === null ||
        $('#submitTextArea').val() === undefined ||
        $('#submitTextArea').val().trim().length === 0
      ) {
        alert('Please enter a valid text');
      } else {
        let inputArray = $('#submitTextArea').val().split(/\r?\n/);
        // console.log(inputArray);

        const jsonSubmitTextArea = arrayToJson(inputArray);
        console.log(jsonSubmitTextArea);

        // ajax post request to /updateSheet
        $.ajax({
          url: `/updateSheet?sheetId=${sheetId}&sheetName=${title}`,
          type: 'POST',
          data: JSON.stringify(jsonSubmitTextArea),
          contentType: 'application/json',
          success: function (data) {
            console.log(data);
            // if data is not null or undefined
            if (data !== null && data !== undefined) {
              // if array databaseStatus not empty
              if (data.databaseStatus.length !== 0) {
                alert(
                  'The sheet write successfully but it may have issues with database',
                );
                console.log(first);
              } else {
                // alert success
                alert('Success');
              }
            }
          },
          error: function (err) {
            console.log(err);
            // alert the error
            alert(err.responseJSON.error.message);
          },
        });
      }
    }
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

      // make all r[0] to lower case
      r[0] = r[0].toLowerCase();

      r[1] = r[1].replace(/\s/g, '');

      // if r[1] is equal to 'Table' plus a number, lowercase the first letter
      // if (r[1].match(/^Table\d+$/)) {
      //   r[1] = r[1].replace(/^Table/, 'table');
      // }

      //if r[1] is equal to 'Table' or 'T' or 't' plus a number, lowercase the first letter
      if (r[1].match(/^(Table|T|t)\d+$/)) {
        r[1] = r[1].replace(/^(Table|T|t)/, 'table');
      }

      // if r[2] exists, combine r[1] and r[2]
      if (r[2] !== undefined) {
        r[1] = r[1] + ':' + r[2];
      }

      return r;
    });

  // array to json
  // use each array element as key and value
  let json = newArray.reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});
  // console.log(json);

  json.test = 'test';
  // finally return the json object
  return json;
}
