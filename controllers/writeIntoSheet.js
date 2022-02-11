const tableList = require('../tableList.json');
const { google } = require('googleapis');
const writeIntoSheet = async function (client, req, res, next) {
  const gsApi = google.sheets({ version: 'v4', auth: client });

  // get sheet id from req.query
  const sheetId = req.query.sheetId;
  //get sheet name from req.query
  const sheetName = req.query.sheetName;
  //get data from req.body
  const data = req.body;

  const checker = Object.keys(tableList).find((key) => key === data.RoomNumber);

  // if checker is undefined, return next with error
  if (checker === undefined) {
    return next({ message: 'Room number not found', status: 404 });
  } else {
    // get the roomnumber from data
    const roomNumber = data.RoomNumber;
    // create the range for sheet
    const range = `${sheetName}${tableList[data.RoomNumber]}`;
    // create an array to store data
    const dataArray = [];
    // push every data into dataArray
    dataArray.push(checkNullValue(data.BookingName));
    dataArray.push('');
    dataArray.push(checkNullValue(data.NumberofPeople));
    dataArray.push(checkNullValue(data.TimeofArrival));
    dataArray.push(checkNullValue(data.ContactNumber));
    dataArray.push(checkNullValue(data.Referral));
    dataArray.push(checkNullValue(data.Manager));

    // update the sheet
    await gsApi.spreadsheets.values.update(
      {
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [dataArray],
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          return res.json({ message: 'success', status: 200 });
        }
      }
    );
  }
};

// example json
// const exampleJson = {
//   RoomNumber: '555',
//   BookingName: 'zhen 连联',
//   NumberofPeople: '10',
//   Date: '12/Feb',
//   TimeofArrival: '10P.M.',
//   ContactNumber: '0476248060',
//   Referral: '',
//   Manager: 'ReCo',
// };

const checkNullValue = (data) => {
  // if data is null, undefined, or empty string
  if (!data || data === '') {
    //return ''
    return '';
  } else {
    //return data
    return data;
  }
};

// export the writeIntoSheet method
module.exports = writeIntoSheet;
