const tableList = require('../tableList.json');
const { google } = require('googleapis');
const Customer = require('../models/customer');
const writeIntoSheet = async function (client, req, res, next) {
  const gsApi = google.sheets({ version: 'v4', auth: client });

  // get sheet id from req.query
  const sheetId = req.query.sheetId;
  //get sheet name from req.query
  const sheetName = req.query.sheetName;
  //get data from req.body
  const data = req.body;

  const checker = Object.keys(tableList).find((key) => key === data.roomnumber);

  // if checker is undefined, return next with error
  if (checker === undefined) {
    return next({ message: 'Room number not found', status: 404 });
  } else {
    // get the roomnumber from data
    const roomNumber = data.roomnumber;
    // create the range for sheet
    const range = `${sheetName}${tableList[data.roomnumber]}`;
    // create an array to store data
    const dataArray = [];
    // push every data into dataArray
    dataArray.push(checkNullValue(data.bookingname));
    dataArray.push('');
    dataArray.push(checkNullValue(data.numberofpeople));
    dataArray.push(checkNullValue(formatTime(data.timeofarrival)));
    dataArray.push(checkNullValue(formatPhoneNumber(data.contactnumber)));
    dataArray.push(checkNullValue(data.referral));
    dataArray.push(checkNullValue(data.manager));

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
      async (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          const newCustomer = new Customer({
            name: checkNullValue(data.bookingname),
            phone: checkNullValue(formatPhoneNumber(data.contactnumber)),
            Date: checkNullValue(data.date),
            from: sheetName,
          });

          try {
            await newCustomer.save();
          } catch (err) {
            console.log(err);
          }

          return await res.json({
            message: 'success',
            status: 200,
            data: result,
          });
        }
      },
    );
  }
};

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

const checkDate = (date) => {
  // check if date has chinese
  if (hasChinese(date)) {
    // if it has chinese, convert it to number
    return reverseDate(convertChineseDate(date));
  } else {
    // check if date has english
    if (hasEnglish(date)) {
      // get english characters
      const english = getEnglish(date);
      // convert month from english to number
      const month = getMonthFromString(english);

      // if month is -1, return date
      if (month === -1) {
        return 'error! please input manually';
      } else {
        // get all numbers from date
        const day = date.match(/\d+/g).join('');
        // combine month and day
        return `${day}/${month}`;
      }
    } else {
      // if date is null or undefined, space return ''
      if (!date || date === '') {
        return '';
      }
      return date;
    }
  }
};

// check if any chinese character in a string
const hasChinese = (str) => {
  return /[\u4e00-\u9fa5]/.test(str);
};

//reverse month and day eg: 11/1 =>> 1/11
const reverseDate = (str) => {
  const date = str.split('/');
  // if date[0] length is 3 remove char[1]
  if (date[0].length === 3) {
    // remove char[1]
    date[0] = date[0].slice(0, 1) + date[0].slice(2);
  }

  // if data[1] length is 4 remove the second and third char
  if (date[1].length === 4) {
    // remove char[1]
    date[1] = date[1].slice(0, 1) + date[1].slice(3);
  }

  // if data[1] length is 3 remove the second char
  if (date[1].length === 3) {
    // remove char[1]
    date[1] = date[1].slice(0, 1) + date[1].slice(2);
  }

  return `${date[1]}/${date[0]}`;
};

const convertChineseDate = (str) => {
  return str.replace(
    /年|月|日|一|二|三|四|五|六|七|八|九|十/g,
    function (match) {
      switch (match) {
        case '月':
          return '/';
        case '日':
          return '';
        case '一':
          return '1';
        case '二':
          return '2';
        case '三':
          return '3';
        case '四':
          return '4';
        case '五':
          return '5';
        case '六':
          return '6';
        case '七':
          return '7';
        case '八':
          return '8';
        case '九':
          return '9';
        case '十':
          return '10';
        default:
          return match;
      }
    },
  );
};

// convert month from english to number
function getMonthFromString(mon) {
  var d = Date.parse(mon + ' 1, 2021');
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}

// check if any english character in a string
const hasEnglish = (str) => {
  return /[a-zA-Z]/.test(str);
};

//only get english characters in a string, make it string
const getEnglish = (str) => {
  return str.match(/[a-zA-Z]/g).join('');
};

const formatTime = (time) => {
  // if time is undefined or null, return ''
  if (!time || time === '') {
    return '';
  }
  // get all numbers from a string
  const numbers = time.match(/\d+/g);
  // if only one number make it in format '11P.M.'
  if (numbers.length === 1) {
    if (numbers[0] <= 5 || numbers[0] == 12) {
      return `${numbers[0]}A.M.`;
    } else {
      if (numbers[0] > 12) {
        return `${numbers[0] - 12}P.M.`;
      }
    }
    return `${numbers[0]}P.M.`;
  }
  // if two numbers make it in format '11:11P.M.'
  if (numbers.length === 2) {
    if (numbers[0] <= 5 || numbers[0] == 12) {
      return `${numbers[0]}:${numbers[1]}A.M.`;
    } else {
      if (numbers[0] > 12) {
        return `${numbers[0] - 12}:${numbers[1]}P.M.`;
      }
    }
    return `${numbers[0]}:${numbers[1]}P.M.`;
  }

  // TODO:
  // if no number return origin time which should be an error, but keep it for now
  return time;
};

const formatPhoneNumber = (phoneNumberString) => {
  let newString;
  // if phone number is empty return empty string
  if (!phoneNumberString || phoneNumberString === '') {
    return '';
  }

  // if phone number only has nine, newString = '0' + phoneNumberString
  if (phoneNumberString.length === 9) {
    newString = '0' + phoneNumberString;
  } else {
    // newString = phoneNumberString
    newString = phoneNumberString;
  }

  // add space after 3rd number and 6th number
  newString =
    newString.slice(0, 4) +
    ' ' +
    newString.slice(4, 7) +
    ' ' +
    newString.slice(7);

  return newString;
};

// export the writeIntoSheet method
module.exports = writeIntoSheet;
