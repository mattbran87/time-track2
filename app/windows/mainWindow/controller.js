$(document).ready(function() {
  pageLoadData();
});

if (typeof pageSession == 'undefined') {
  var pageSession = {}
}

// page load into session on start
function pageLoadData() {
  // create session data
  var workingDate = helper.getCurrentDate();

  // if session data is empty, hydrate it
  if (!sessionStorage.length) {
    sessionStorage.setItem('workingDate', workingDate);
    sessionStorage.setItem('userSettings', JSON.stringify({}));
    // use const data = JSON.parse(localStorage.getItem('items')); to use the stored object
  }

  // sessionStorage.setItem();
}
