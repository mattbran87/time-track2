const path = require('path');
// add global to module load path
require('app-module-path').addPath(path.join(process.cwd(), '/app/global'));

// load db connection modules
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('app/data/tables/db.json')
const db = low(adapter)

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

// setup db if not set
db.defaults({ Date: {}, Tasks: {}, Tags: {}, UserSettings: [] })
  .write()

if (!db.has('Date').value()) {
  db.set('Date', [])
  .write()
} else {
  console.log("Table Date is already set.");
}

if (!db.has('Tasks').value()) {
  db.set('Tasks', [])
  .write()
} else {
  console.log("Table Tasks is already set.");
}

if (!db.has('Tags').value()) {
  db.set('Tags', [])
  .write()
} else {
  console.log("Table Tags is already set.");
}

if (!db.has('UserSettings').value()) {
  db.set('UserSettings', [])
  .write()
} else {
  console.log("Table UserSettings is already set.");
}
