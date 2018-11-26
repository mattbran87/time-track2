$(document).ready(function() {
  pageLoadData()
  formSubmit();
});

if (typeof pageSession == 'undefined') {
  var pageSession = {}
}

function pageLoadData() {

}

function formSubmit() {
  var taskName = document.getElementById('taskName');
  var description = document.getElementById('description');
  var timeIn = document.getElementById('timeIn');
  var timeOut = document.getElementById('timeOut');
  var tags = document.getElementById('tags');
  var submitTasks = document.getElementById('submitTasks');

  submitTasks.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Submit prevented');

    // console.log(pageload.getDate())
    // console.log(database.createDateTaskRecord('11/24/2018'));
    // database.createDateTaskRecord('11/24/2018')
  });
}
