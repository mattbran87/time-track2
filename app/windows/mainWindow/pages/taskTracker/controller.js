$(document).ready(function() {
  pageLoadData();
  formSubmit();
});

if (typeof pageSession == 'undefined') {
  var pageSession = {}
}

function pageLoadData() {
  pageSession.lastTask = helper.getLastTask();
  pageSession.pageEntity = buildEntity();
}

function formSubmit() {
  // on click of form submit button
  var submitTasks = document.getElementById('submitTasks');

  submitTasks.addEventListener('click', function(event) {
    event.preventDefault();

    // get all inputs data
    var taskName = document.getElementById('taskName');
    var description = document.getElementById('description');
    var timeIn = document.getElementById('timeIn');
    var timeOut = document.getElementById('timeOut');
    var tags = document.getElementById('tags');

    // get data in form and package it to write to db
    var sessionWorkingDate = JSON.parse(sessionStorage.getItem('workingDate'));
    var submissionObject = {
      "id" : pageSession.lastTask.id + 1,
      "timeID": sessionWorkingDate.id,
      "taskName": taskName.value,
      "timeIn": pageSession.timeIn,
      "timeOut": pageSession.timeOut,
      "description": description.value,
      "tags": tags.value.split(',')
    }

    // write to db the task and add task record to date
    database.createTask(submissionObject);

    // update pageSession data
    pageSession.lastTask = helper.getLastTask();

    // add task to the time record
    database.createDateTaskRecord(sessionWorkingDate.date, submissionObject);

    // clear inputs
    taskName.value = "";
    description.value = "";
    timeIn.value = "";
    timeOut.value = "";
    tags.value = "";
  });
}

function buildEntity() {
  // get current date record from sessionStorage
  var sessionWorkingDate = JSON.parse(sessionStorage.getItem('workingDate')); // NOTE: Since item is loaded into sessionStorage, when deltes are made, this will need to be updated as well

  // iterate over record and build task records to construct dateTask Entity
  sessionWorkingDate.tasks.forEach(function(elem, i){
    var retrievedTask = database.getTaskByID(elem.taskID)
    sessionWorkingDate.tasks[i] = retrievedTask;
  });

  return sessionWorkingDate;
}
