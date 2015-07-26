

$(document).ready(function() {
	
	$('.editing').on('blur',editTHIS);
	
	$( "#actualdate" ).datepicker({
		dateFormat: "mm/dd/yy",
		onSelect: editTHIS
	});

	
	var efUID = $.urlParam('UID');
	
	$( "#sendform" ).click(function() {
		console.log('made submit click');
		submitForm(efUID);
		console.log('submitted');
// 		window.location = "index.html";
	});

	
	$("#repListShow").click(function() {
// 		alert("replist");
		getRepList("FD2507FB-6DAF-46FF-A548-45FD0188B73C");
	});




	getIT(efUID);
});


$('.selector').datepicker({
    onSelect: function(dateText) { /* validation here */ }
});