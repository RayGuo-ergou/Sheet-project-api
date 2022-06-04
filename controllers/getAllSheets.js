const { google } = require('googleapis');
const getAllSheets = async function (client, req, res, next) {
  const gsApi = google.sheets({ version: 'v4', auth: client });

  // get the sheet id from req.query
  const sheetId = req.query.sheetId;

  let sheets;
  //try catch
  try {
    // list all sheets in the spreadsheet
    sheets = await gsApi.spreadsheets.get({
      spreadsheetId: sheetId,
    });
  } catch (error) {
    console.log(error);
    // if error return next with error
    return next(error);
  }

  // sort all title into an array
  const sheetsTitle = sheets.data.sheets.map((sheet) => {
    return sheet.properties.title;
  });
  // print all sheets' title in console
  console.log(sheetsTitle);

  //res send json format of sheetsTitle to client
  return res.json({ sheetsTitle });
};

//export the getAllSheets method
module.exports = getAllSheets;
