const path = require('path');
// add global to module load path
require('app-module-path').addPath(path.join(process.cwd(), '/app/global'));

var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
let db = new sqlite3.Database('time_tracker.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the time_tracker database.');

  }
});

// load moment js
const moment = require('moment');
// load jquery ui
const jqui = require('jquery_ui/jquery-ui');
// CRUD functions
const database = require("crud");
// helper functions
const helper = require("helpers");
// load page data functions
const pageload = require("pageLoad");
// load dragula
const dragula = require("dragula/dragula");
// load fontawesome
const fontawesome = require("font-awesome/js/all");

// load any modules that need to be on page ready
$(document).ready(function() {
  // sessionStorage.setItem('swamp', 'boy');
});

db.serialize(function() {
  db.run("CREATE TABLE if not exists Date (date TEXT)");
  db.run("CREATE TABLE if not exists Task (dateID INTEGER, taskName TEXT, timeIn INTEGER, timeOut INTEGER, description TEXT)");
  db.run("CREATE TABLE if not exists Tags (tagName TEXT)");
  db.run("CREATE TABLE if not exists Tag_On_Task (tagID INTEGER, taskID INTEGER)");
  // db.run("CREATE TABLE if not exists User_Settings (info TEXT)");

  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();
  //
  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //     console.log(row.id + ": " + row.info);
  // });
});

db.close();
