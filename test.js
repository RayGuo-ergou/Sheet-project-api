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
const getIdFromUrl = (url) => {
  const id = url.match(/[-\w]{25,}/);
  return id[0];
};
