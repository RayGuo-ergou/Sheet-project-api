const { google } = require('googleapis');
const checkAccess = async function (client, req, res, next) {
  const gsApi = google.sheets({ version: 'v4', auth: client });

  // get the sheet id from req.query
  const sheetId = req.query.sheetId;

  // check if we have access to the sheet
  // use try catch to handle error
  try {
    const res = await gsApi.spreadsheets.get({
      spreadsheetId: sheetId,
    });
  } catch (error) {
    console.log(error);
    // if error return next with error
    return next(error);
  }
  return res.json({ message: 'success', status: 200 });
};

// export the checkAccess method
module.exports = checkAccess;
