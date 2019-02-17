$(document).ready(function($) {
  buildView();
  $('.startTimeButton').on('click', function() {
    var _moment = moment();
  	var currentTime = _moment.format('HH:mm:ss');
  	var targetInput = $(this).parent().find(".startTimeInput"); // TODO: using classes, plan to build form that allows multiple submissions
  	targetInput.val(currentTime);
    pageSession.timeIn = _moment.format('x');
  });

  $('.endTimeButton').on('click', function() {
    var _moment = moment();
  	var currentTime = _moment.format('HH:mm:ss');
  	var targetInput = $(this).parent().find(".endTimeInput");
  	targetInput.val(currentTime);
    pageSession.timeOut = _moment.format('x');
  });

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
});

function buildView() {
  var viewData = pageSession.pageEntity;
  var taskContainer = $('#tasks');
  var tasksTable = $('#container');

  if (viewData.tasks.length) {
    viewData.tasks.forEach(function(elem, i) {
      // taskContainer.append("<div class='taskRendered' id='taskRendered" + i +"'><span>"+ elem.taskName +"</span><span>"+ elem.description +"</span><span>"+ elem.tags.toString() +"</span><span>"+ moment(parseInt(elem.timeIn)).format('HH:mm:ss') +"</span><span>"+ moment(parseInt(elem.timeOut)).format('HH:mm:ss') +"</span></div>");

      tasksTable.append('<tr data-task="'+ i +'" data-task-id="'+ elem.id +'" class="bg-shade-1"><th class="mover" scope="row"><div class="icon_menu"><div class="icon_menu__solid"></div></div></th><td class="task-name">'+ elem.taskName +'</td><td >'+ elem.tags.toString() +'</td><td >'+ (elem.description.length > 25 ? elem.description.substring(0,25) + "..." : elem.description) +'</td><td >'+ moment(parseInt(elem.timeIn)).format('hh:mm A') +'</td><td >'+ moment(parseInt(elem.timeOut)).format('hh:mm A') +'</td><td class="hidden">'+ i + 1 +'</td></tr>');
    });
  }

  console.log(viewData);
}
