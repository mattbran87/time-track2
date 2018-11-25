const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('app/data/tables/db.json')
const db = low(adapter)

$(document).ready(function() {
  // get all
  var getTime = timeGetAll();
  var getTags = tagsGetAll();
  var getUserSettings = userSettingsGetAll();

  // get specific record(s)
  var getSingleTime = timeGetByDate("11/20/2018");
  var getTimeTask = timeGetByTask("python");

  console.log(getTime);
  console.log(getTags);
  console.log(getUserSettings);

  console.log(getSingleTime);
  console.log(getTimeTask);
});

// get all
function timeGetAll() {
  var time = db.get('Time').value();
  return time;
}

function tagsGetAll() {
  var tags = db.get('Tags').value();
  return tags;
}

function userSettingsGetAll() {
  var userSettings = db.get('UserSettings').value();
  return userSettings;
}

// get specific record(s)
function timeGetByDate(date) {
  var time = db.get('Time')
  .find({date : date})
  .value();
  return time;
}

function timeGetByTask(task) {
  var time = db.get('Time')
  .filter({taskName : task})
  .value();
  return time;
}
