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
    } // else
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
