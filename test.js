// let a = { 10: 1, 21: 2 };
// console.log(a[10]);

// var str = '/var/www/site/Brand new        document.docx';
// console.log(str.replace(/\s/g, ''));

// var a = '1:2:3:';
// a.split(':').forEach(function (item, index) {
//   console.log(item);
// });

// console.log(typeof a);

// get spreadsheetId from spreadsheet url
// const getIdFromUrl = (url) => {
//   const id = url.match(/[-\w]{25,}/);
//   return id[0];
// };

// const tableList = {
//   111: '!B2:H2',
//   222: '!B3:H3',
//   333: '!B4:H4',
//   555: '!B5:H5',
//   666: '!B6:H6',
//   777: '!B7:H7',
//   888: '!B8:H8',
//   999: '!B9:H9',
//   table1: '!B11:H11',
//   table2: '!B12:H12',
//   table3: '!B13:H13',
//   table4: '!B14:H14',
//   table0: '!B15:H15',
// };

// const a = '1222';
// // check if a match any key in tableList
// const b = Object.keys(tableList).find((key) => key === a);
// console.log(b);

// console.log(tableList[a]);

// function onlySpaces(str) {
//   return str.trim().length === '';
// }

// console.log(onlySpaces('   ')); // 👉️ true
// console.log(onlySpaces('  123  ')); // 👉️ false
// console.log(onlySpaces('hello ')); // 👉️ false
// console.log(onlySpaces('')); // 👉️ true

//remove all spaces in a string
// const removeSpaces = (str) => {
//   return str.replace(/\s/g, '');
// };
// console.log(removeSpaces('   ')); // 👉️ ''
// console.log(removeSpaces('  123  ')); // 👉️ '123'
// console.log(removeSpaces('hello ')); // 👉️ 'hello'
// console.log(removeSpaces('')); // 👉️ ''

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
    }
  );
};
// if the date has chinese characters, convert it to english
var str = '二月四日';
console.log(reverseDate(convertChineseDate(str)));

function getMonthFromString(mon) {
  var d = Date.parse(mon + ' 1, 2020');
  console.log(mon + ' 1, 2020');
  console.log(`d`);
  console.log(d);
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
}

console.log(getMonthFromString('FebRuary'));

// check if any chinese character in a string
const hasChinese = (str) => {
  return /[\u4e00-\u9fa5]/.test(str);
};

// check if any english character in a string
const hasEnglish = (str) => {
  return /[a-zA-Z]/.test(str);
};

//only get english characters in a string, make it string
const getEnglish = (str) => {
  return str.match(/[a-zA-Z]/g).join('');
};

console.log(getEnglish('feb/01'));

// // check if any month word in a string like january
// const hasMonth = (str) => {
//   // convert str to lowercase
//   const lowerStr = str.toLowerCase();

//   return /january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|april/.test(
//     lowerStr
//   );
// };

// console.log(hasMonth('jan')); // 👉️ true
// console.log(hasMonth('FeBruary')); // 👉️ true
// console.log(hasMonth('march')); // 👉️ true
// console.log(hasMonth('april')); // 👉️ true
// console.log(hasMonth('may')); // 👉️ true
// console.log(hasMonth('june')); // 👉️ true
// console.log(hasMonth('july')); // 👉️ true
// console.log(hasMonth('august')); // 👉️ true
// console.log(hasMonth('september')); // 👉️ true
// console.log(hasMonth('october')); // 👉️ true
// console.log(hasMonth('november')); // 👉️ true
// console.log(hasMonth('december')); // 👉️ true
