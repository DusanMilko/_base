'use strict';

module.exports = function date() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var date = ""+month+"."+day+"."+year+"";
  return date;
};
