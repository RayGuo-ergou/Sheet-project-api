$(document).ready(function () {
  // copyBtn click listener
  $('#copyBtn').click(function () {
    copyToClipboard('#email');
  });

  // when click submitBtn button get input value from SheetIdInput
  $('#submitBtn').click(function () {
    const sheetId = $('#SheetIdInput').val();
    console.log(sheetId);

    // get sheetId from spreadsheet url
    const id = getIdFromUrl(sheetId);
    console.log(id);

    // if id is null or undefined , alert error
    if (id === null || id === undefined) {
      alert('Please enter a valid spreadsheet url');
    } // else ajax get with id to /checkAccess
    else {
      $.ajax({
        url: '/checkAccess',
        type: 'GET',
        data: {
          sheetId: id,
        },
        success: function (data) {
          console.log(data);
          if (data.status === 200) {
            // if success, redirect to /submit page with id
            window.location.href = '/submit?sheetId=' + id;
          } else {
            // if error, alert error
            alert(data.error.message);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
          alert(
            `The error code is ${jqXHR.status}. (if code is 403, please check if your added the email address to the spreadsheet. If the code is 404, please check if the spreadsheet url is correct)`,
          );
        },
      });
    }
  });

  // append history urls into home page
  $.ajax({
    url: '/urls',
    type: 'GET',
    success: function (data) {
      // sort data by date
      data.sort((a, b) => {
        return new Date(b.Date) - new Date(a.Date);
      });
      data.forEach((element) => {
        // ajax to get sheets title
        $.ajax({
          url: '/sheets',
          type: 'GET',
          data: {
            sheetId: element.URL,
          },
          success: function (data) {
            // if data is not null or undefined
            if (data !== null && data !== undefined) {
              // append to ul id historyUrls
              $('#historyUrls').append(
                `<li><div class="row"><p class="col s2">Sheet name: ${data.title} -> ${element.Name}</p><a href="/submit?sheetId=${element.URL}" class="btn col s1">select this sheet</a></div></li>`,
              );
            }
          },
          error: function (err) {
            console.log(err);
            // alert there's error
            alert('There is an error');
          },
        });
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      alert(
        `The error code is ${jqXHR.status}. (if code is 403, please check if your added the email address to the spreadsheet. If the code is 404, please check if the spreadsheet url is correct)`,
      );
    },
  });
});

function copyToClipboard(element) {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val($(element).text()).select();
  document.execCommand('copy');
  $temp.remove();
}

// get spreadsheetId from spreadsheet url
const getIdFromUrl = (url) => {
  const id = url.match(/[-\w]{25,}/);

  // if id is null or undefined , return null
  if (id === null || id === undefined) {
    return null;
  }
  return id[0];
};
