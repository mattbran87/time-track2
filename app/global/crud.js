const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

var Database = function(){
  const adapter = new FileSync('app/data/tables/db.json')
  const db = low(adapter)
}

// get all
Database.prototype.timeGetAll = function timeGetAll() {
  var time = db.get('Time').value();
  return time;
}

Database.prototype.tagsGetAll = function tagsGetAll() {
  var tags = db.get('Tags').value();
  return tags;
}

Database.prototype.userSettingsGetAll = function userSettingsGetAll() {
  var userSettings = db.get('UserSettings').value();
  return userSettings;
}
