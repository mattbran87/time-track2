$(document).ready(function($) {
  $('.startTimeButton').on('click', function() {
  	var currentTime = moment().format('HH:mm:ss');
  	var targetInput = $(this).parent().find(".startTimeInput");
  	targetInput.val(currentTime);
  });

  $('.endTimeButton').on('click', function() {
  	var currentTime = moment().format('HH:mm:ss');
  	var targetInput = $(this).parent().find(".endTimeInput");
  	targetInput.val(currentTime);
  });
});
