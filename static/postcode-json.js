const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const postcodeFolder = '.';
let results = [];
const filesName = [];
let stateObject = {};
let areas = [];
let state;
let postOffice;
let unique;

fs.readdirSync(postcodeFolder).forEach((file, index) => {
  console.log(file);
});

fs.createReadStream('./postcode.csv')
  .pipe(csv({}))

  .on('data', data => areas.push(data))
  .on('end', () => {
    // console.log(areas[0].State);
    console.log(areas);
  });
