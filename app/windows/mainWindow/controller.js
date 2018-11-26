$(document).ready(function() {
  pageLoadData();
});

if (typeof pageSession == 'undefined') {
  var pageSession = {}
}

// page load into session on start
function pageLoadData() {
  // create session data
  var workingDate = pageload.getDate();

  // if session data is empty, hydrate it
  if (!sessionStorage.length) {
    sessionStorage.setItem('workingDate', JSON.stringify(workingDate));
    sessionStorage.setItem('userSettings', JSON.stringify({}));
    // sessionStorage.setItem();
    // use const data = JSON.parse(sessionStorage.getItem('items')); to use the stored object
  }
}
