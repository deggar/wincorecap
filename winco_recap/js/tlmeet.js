

$(document).ready(function() {
	console.log('got to ready');
	
	$('.editing').on('blur',editTL);
	
	$( "#actualdate" ).datepicker({
		dateFormat: "mm/dd/yy",
		onSelect: editTL
	});
	
	var efUID = $.urlParam('UID');
	
/* 	$('#sendform').on('click',submitForm(efUID)); */
		
	$( "#sendform" ).click(function() {
		console.log('made submit click');
		submitForm(efUID);
		console.log('submitted');
		window.location = "index.html";
	});

	getTL(efUID);
});


$('.selector').datepicker({
    onSelect: function(dateText) { /* validation here */ }
});