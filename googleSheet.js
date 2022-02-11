const { google } = require('googleapis');
const googleSheetRun = async function (client) {
  const gsApi = google.sheets({ version: 'v4', auth: client });

  const opt = {
    spreadsheetId: '1WCY33CvznaJt8KtchLV6MR9RgwUKbigCF1q8JLSwhF4',
  };

  try {
    // check if we have access to the sheet
    const res = await gsApi.spreadsheets.get(opt);
  } catch (error) {
    console.log(error.response.data.error);
  }

  // // list all sheets in the spreadsheet
  // const sheets = await gsApi.spreadsheets.get(opt);

  // // sort all title into an array
  // const sheetsTitle = sheets.data.sheets.map((sheet) => {
  //   return sheet.properties.title;
  // });
  // // print all sheets' title in console
  // console.log(sheetsTitle);

  // const opt = {
  //   spreadsheetId: '1WCY33CvznaJt8KtchLV6MR9RgwUKbigCF1q8JLSwhF4',
  //   range: '星期五 1122022!A1:D6',
  // };

  // let data = await gsApi.spreadsheets.values.get(opt);
  // //   console.log(data.data.values);
  // let dataArray = data.data.values;
  // console.log(dataArray);

  // let newDataArray = await dataArray.map((r) => {
  //   // if r is empty, skip
  //   if (r.length === 0) {
  //     return r;
  //   } else {
  //     r.push(r[0] + '-' + r[1]);
  //     return r;
  //   }
  // });
  // console.log(newDataArray);

  // // push newDataArray to sheet
  // let a = 1;
  // opt.range = `星期五 1122022!A${a}:E6`;
  // opt.valueInputOption = 'USER_ENTERED';
  // opt.resource = { values: newDataArray };
  // let result = await gsApi.spreadsheets.values.update(opt);
  // console.log(result.data);
};

// export the googleSheetRun method
module.exports = googleSheetRun;
