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
// CRUD functions
const database = require("crud");
// helper functions
const helper = require("helpers");
// load page data functions
const pageload = require("pageLoad");

// load any modules that need to be on page ready
$(document).ready(function() {
  // sessionStorage.setItem('swamp', 'boy');
});
