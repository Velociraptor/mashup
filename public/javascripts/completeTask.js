$(function () {
  $('.completeTask').click(function (completed, err) {
  	console.log('TURTELS!');
  	console.log(completed.target.id);
  	//$('div#'+completed.target.id).remove();
    $.post("/tasks/complete", {1:completed.target.id}, function(response, err){
    		console.log(err);
    		window.location.reload();
    	});
    });
    //return false;
});