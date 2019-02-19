$(document).ready(function() {
  pageLoadData();
  // formSubmitAddTask();

});

// TODO: Use this to save the session storage when user leaves page
// window.onbeforeunload = function(){
//   alert("Leaving?");
// };

if (typeof pageSession == 'undefined') {
  var pageSession = {}
}

function pageLoadData() {
  pageSession.lastTask = helper.getLastTask();
  pageSession.pageEntity = buildEntity();
}

function startTimeButton() {
  var startTimeButton = document.getElementById('startTimeButton');

  startTimeButton.addEventListener('click', function(event) {
    var _moment = moment();
    var currentTime = _moment.format('HH:mm:ss');
    var targetInput = $(this).parent().find(".startTimeInput");
    targetInput.val(currentTime);
    pageSession.timeIn = _moment.format('x');
  });
}

function endTimeButton() {
  var endTimeButton = document.getElementById('endTimeButton');

  endTimeButton.addEventListener('click', function(event) {
    var _moment = moment();
    var currentTime = _moment.format('HH:mm:ss');
    var targetInput = $(this).parent().find(".endTimeInput");
    targetInput.val(currentTime);
    pageSession.timeOut = _moment.format('x');
  });
}

function formvalidate() {
  // on click of form submit button
  var submitTaskItem = document.getElementById('submitTaskItem');
  var formValid = true;

  // get all inputs data
  var taskName = document.getElementById('taskName');
  var timeIn = document.getElementById('timeIn');
  var timeOut = document.getElementById('timeOut');

  if (!taskName.value.length || !timeIn.value.length || !timeOut.value.length) {
    formValid = false;
  }

  return formValid;
}

function formSubmitAddTask(callback) {
  // on click of form submit button
  var submitTaskItem = document.getElementById('submitTaskItem');

  submitTaskItem.addEventListener('click', function(event) {
    // event.preventDefault();

    // get all inputs data
    var taskName = document.getElementById('taskName');
    var description = document.getElementById('description');
    var timeIn = document.getElementById('timeIn');
    var timeOut = document.getElementById('timeOut');
    var tags = document.getElementById('tags');

    // get data in form and package it to write to db
    // var sessionWorkingDate = JSON.parse(sessionStorage.getItem('workingDate'));
    var submissionObject = {
      "id" : pageSession.lastTask.id + 1,
      "timeID": pageSession.pageEntity.id,
      "taskName": taskName.value,
      "timeIn": pageSession.timeIn,
      "timeOut": pageSession.timeOut,
      "description": description.value,
      "tags": tags.value.split(',')
    }
    console.log(submissionObject);

    // write to db the task and add task record to date
    database.createTask(submissionObject);

    // update pageSession data
    pageSession.lastTask = helper.getLastTask();

    // add task to the time record
    database.createDateTaskRecord(pageSession.pageEntity.date, submissionObject);

    pageSession.timeIn = "";
    pageSession.timeOut = "";

    callback();

  });

}

function formSubmitUpdateTask(clickedItem, callback) {
  // on click of form submit button
  var updateTask = document.getElementById('updateTask');

  updateTask.addEventListener('click', function(event) {
    // event.preventDefault();

    // get all inputs data
    var taskName = document.getElementById('taskName');
    var description = document.getElementById('description');
    var timeIn = document.getElementById('timeIn');
    var timeOut = document.getElementById('timeOut');
    var tags = document.getElementById('tags');


    console.log(clickedItem);
    console.log(clickedItem.taskId);

    // convert time to unix
    var timeInUnix = moment(pageSession.pageEntity.date + " " + timeIn.value, "M/D/YYYY HH:mm:ss").unix()
    var timeOutUnix = moment(pageSession.pageEntity.date + " " + timeOut.value, "M/D/YYYY HH:mm:ss").unix()

    // get data in form and package it to write to db
    // var sessionWorkingDate = JSON.parse(sessionStorage.getItem('workingDate'));
    var submissionObject = {
      "id" : clickedItem.taskId,
      "timeID": clickedItem.task,
      "taskName": taskName.value,
      "timeIn": timeInUnix,
      "timeOut": timeOutUnix,
      "description": description.value,
      "tags": tags.value.split(',')
    }
    console.log(submissionObject);

    pageSession.subobj = {};
    pageSession.subobj = submissionObject

    database.updateDate(submissionObject);

    // update pageSession data
    pageSession.lastTask = helper.getLastTask();

    // add task to the time record
    database.createDateTaskRecord(pageSession.pageEntity.date, submissionObject);

    pageSession.timeIn = "";
    pageSession.timeOut = "";

    if (callback) {
      console.log(callback);
      callback();
    }

  });

  console.log(clickedItem);
}

function buildEntity() {
  // get current date record from sessionStorage
  var sessionWorkingDate = pageload.getDate(); // NOTE: Since item is loaded into sessionStorage, when deltes are made, this will need to be updated as well

  // iterate over record and build task records to construct dateTask Entity
  if (typeof sessionWorkingDate != 'undefined') {
    if (sessionWorkingDate.tasks.length) {
      sessionWorkingDate.tasks.forEach(function(elem, i){
        var retrievedTask = database.getTaskByID(elem.taskID)
        sessionWorkingDate.tasks[i] = retrievedTask;
      });
    }
  }

  return sessionWorkingDate;
}
