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
});

function buildView() {
  var viewData = pageSession.pageEntity;
  var taskContainer = $('#tasks');

  viewData.tasks.forEach(function(elem, i) {
    taskContainer.append("<div class='taskRendered' id='taskRendered" + i +"'><span>"+ elem.taskName +"</span><span>"+ elem.description +"</span><span>"+ elem.tags.toString() +"</span><span>"+ moment(parseInt(elem.timeIn)).format('HH:mm:ss') +"</span><span>"+ moment(parseInt(elem.timeOut)).format('HH:mm:ss') +"</span></div>");
  });

  console.log(viewData);
}
