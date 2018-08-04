const moment = require('moment');

let date = moment()

// Aug 4th 2018 6:26:00 pm

console.log(date.format('MMM Do, YYYY')); // Aug 4th, 2018

date.add(100, 'year').subtract(9, 'months')
console.log(date.format('MMM Do, YYYY')); // Nov 4th, 2117

date = moment()
console.log(date.format('h:mm a')); // 6:26 pm

// let createdAt = new Date().getTime()
// same as 
let createdAt = moment().valueOf()

date = moment(createdAt)
console.log(date.format('h:mm a')); // 6:26 pm