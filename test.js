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
const removeSpaces = (str) => {
  return str.replace(/\s/g, '');
};
console.log(removeSpaces('   ')); // 👉️ ''
console.log(removeSpaces('  123  ')); // 👉️ '123'
console.log(removeSpaces('hello ')); // 👉️ 'hello'
console.log(removeSpaces('')); // 👉️ ''
