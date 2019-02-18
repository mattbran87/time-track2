$(document).ready(function($) {
  buildView();
  var container = document.getElementById('container');
  var rows = container.children;

  // forEach method from https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
  var nodeListForEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
  		callback.call(scope, i, array[i]);
    }
  };

  var sortableTable = dragula([container]);

  sortableTable.on('dragend', function() {
    nodeListForEach(rows, function (index, row) {
      row.lastElementChild.textContent = index + 1;
      row.dataset.rowPosition = index + 1;
    });
  });

  $('#genericModal').on('hidden.bs.modal', function (e) {
    $('#genericModalTitle').empty();
    $('.modal-body').empty();
    $('.modal-footer').empty();
  })

  $('#addTaskItem').on('click', function(e) {
    	$('#genericModalTitle').text('Add A Task');
    	$('.modal-body').append('<div class="formContentWrapper" id="formContentWrapper"><div class="form-row"><div class="form-group col-md-6"><label for="taskName">Task Name</label><input class="form-control" id="taskName" type="text" name="taskName" value=""></div><div class="form-group col-md-6"><label for="tags">Tags</label><input class="form-control" id="tags" type="text" name="tags" value=""></div></div><div class="form-row"><div class="form-group col-md-12"><label for="description">Task Description</label><textarea class="form-control" id="description" type="text" name="description" value=""></textarea></div></div><div class="form-row"><div class="form-group col-md-6"><label for="timeIn">Start Time</label><input class="form-control startTimeInput" id="timeIn" type="text" name="timeIn" value=""><button type="button" id="startTimeButton" class="btn btn-primary startTimeButton">Add Time</button></div><div class="form-group col-md-6"><label for="timeOut">End Time</label><input class="form-control endTimeInput" id="timeOut" type="text" name="timeOut" value=""><button type="button" id="endTimeButton" class="btn btn-primary endTimeButton">Add Time</button></div></div></div>');
    	$('.modal-footer').append('<button type="button" class="btn btn-success">Save</button>');

      $('#startTimeButton').on('click', function(event) {
        var _moment = moment();
        var currentTime = _moment.format('hh:mm:ss A');
        var targetInput = $(this).parent().find(".startTimeInput");
        targetInput.val(currentTime);
        pageSession.timeIn = _moment.format('x');
      });

      $('#endTimeButton').on('click', function(event) {
        var _moment = moment();
        var currentTime = _moment.format('hh:mm:ss A');
        var targetInput = $(this).parent().find(".endTimeInput");
        targetInput.val(currentTime);
        pageSession.timeOut = _moment.format('x');
      });
  });

  $('.task-name').on('click', function(e) {
    var viewData = pageSession.pageEntity;
    var clickedTask = $(this)[0].dataset.task;
    var editableTask = viewData.tasks[clickedTask];
    console.log(clickedTask);
    console.log(editableTask);

    $('#genericModalTitle').text('Task: ' + editableTask.taskName);
  });
});

function buildView() {
  var viewData = pageSession.pageEntity;
  var taskContainer = $('#tasks');
  var tasksTable = $('#container');

  if (viewData.tasks.length) {
    viewData.tasks.forEach(function(elem, i) {
      // taskContainer.append("<div class='taskRendered' id='taskRendered" + i +"'><span>"+ elem.taskName +"</span><span>"+ elem.description +"</span><span>"+ elem.tags.toString() +"</span><span>"+ moment(parseInt(elem.timeIn)).format('HH:mm:ss') +"</span><span>"+ moment(parseInt(elem.timeOut)).format('HH:mm:ss') +"</span></div>");

      tasksTable.append('<tr data-task="'+ i +'" data-task-id="'+ elem.id +'" class="bg-shade-1"><th class="mover" scope="row"><div class="icon_menu"><div class="icon_menu__solid"></div></div></th><td data-task="'+ i +'" data-task-id="'+ elem.id +'" data-toggle="modal" data-target="#genericModal" class="task-name">'+ elem.taskName +'</td><td >'+ elem.tags.toString() +'</td><td >'+ (elem.description.length > 25 ? elem.description.substring(0,25) + "..." : elem.description) +'</td><td >'+ moment(parseInt(elem.timeIn)).format('hh:mm A') +'</td><td >'+ moment(parseInt(elem.timeOut)).format('hh:mm A') +'</td><td class="hidden">'+ i + 1 +'</td></tr>');
    });
  }

  console.log(viewData);
}

function rebuildView() {
  var tasksTable = $('#container');
  tasksTable.empty();
  buildView()
}
