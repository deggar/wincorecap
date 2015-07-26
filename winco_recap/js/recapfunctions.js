$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
};

function ajaxindicatorstart(text)
	{
		if(jQuery('body').find('#resultLoading').attr('id') != 'resultLoading'){
		jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="img/ajax-loader.gif"><div>'+text+'</div></div><div class="bg"></div></div>');
		}
		
		jQuery('#resultLoading').css({
			'width':'100%',
			'height':'100%',
			'position':'fixed',
			'z-index':'10000000',
			'top':'0',
			'left':'0',
			'right':'0',
			'bottom':'0',
			'margin':'auto'
		});	
		
		jQuery('#resultLoading .bg').css({
			'background':'#000000',
			'opacity':'0.7',
			'width':'100%',
			'height':'100%',
			'position':'absolute',
			'top':'0'
		});
		
		jQuery('#resultLoading>div:first').css({
			'width': '250px',
			'height':'75px',
			'text-align': 'center',
			'position': 'fixed',
			'top':'0',
			'left':'0',
			'right':'0',
			'bottom':'0',
			'margin':'auto',
			'font-size':'16px',
			'z-index':'10',
			'color':'#ffffff'
			
		});

	    jQuery('#resultLoading .bg').height('100%');
        jQuery('#resultLoading').fadeIn(300);
	    jQuery('body').css('cursor', 'wait');
	}

function ajaxindicatorstop()
{
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}

function callAjax()
{
	jQuery.ajax({
		type: "GET",
		url: "fetch_data.php",
		cache: false,
		success: function(res){
				jQuery('#ajaxcontent').html(res);
		}
	});
}

function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "am";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "pm";
    }
    if (h === 0) {
        h = 12;
    }
    m = m<10?"0"+m:m;

    s = s<10?"0"+s:s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?"+hh+":"+m+":"+s);

    var replacement = h+":"+m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " "+dd;
    var tfd = h+':'+m+' '+dd;

//     return date.replace(pattern,replacement);
    return tfd;
}


function getIT(efUID) {
	
	ajaxindicatorstart('loading recap.. please wait..');
	console.log(efUID);
	$("#replaceRepName").hide();
	
	var tst = $("h4").data('fmfield');
	var field = "Show::BillingCode";
	var data2 = {
		"-db": "Flair_App",
		"-lay": "webwincorecap",
		"Show_ReportEventForm::UID": efUID,
		"-find": ""
	};
	// 	data2[field] = value;
	// 	console.log(data2);
	// 	console.log(field + ": " + value);
	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		// 		  data: { "-db": "hals_scheduler", "-lay": "utilityJobForm", "-recid": "1", "Customer": value, "-edit": "" },
		data: data2,
		success: function(data) {
			ajaxindicatorstop();
// 			alert('Thanks for your comment!');
			var dt2 = data;
			var xmlDoc = $.parseXML(data),
				xml = $(data),
				title = xml.find("resultset");
			var txt = title.text();
			var title2 = xml.find("resultset record");
/*
			var txt2 = title2[0];
			var txt2b = title2[1];
			console.log(txt2);
			console.log(txt2b);
			var fld1 = $(txt2).find("field");
			var fld1a = $(txt2).attr("record-id");
			console.log(fld1a);
*/
// 			console.log('testeq1:');
			var tet2 = title2[1];
			var testeq2 = $(tet2).find("field");
			var testeq1 = testeq2;
// 			console.log(testeq2);
			var fmfld = [
				[]
			];
// 			console.log('title2:');
// 			console.log(title2);
			for (var j = 0; j < title2.length; j++) {
// 				console.log('start j:' + j)
// 				console.log('title[2]:');
// 				console.log(title2[2]);
				var txt2 = title2[j];
				var fld2 = $(txt2).find("field");
				var fld1 = fld2;
// 				console.log('fld1:');
// 				console.log(fld1);
				var fld1a = $(txt2).attr("record-id");
// 				console.log(j + ': fld1a:');
// 				console.log(fld1a);
				var fma = [];
				for (var i = 0; i < fld1.length; i++) {
// 					console.log(j + ': fld1[' + i + ']: ');
// 					console.log(fld1[i]);
					var fdd = $(fld1[i]).attr('name');
					var fde = $(fld1[i]).text();
// 					console.log(i + ': ' + fdd + ': ' + fde);
					fma[fdd] = {
						value: fde,
						recid: fld1a
					};
					// 				fmfld[j][fdd]={value: fde, recid: fld1a};
// 					console.log('full array:');
					// 				console.log('recid: -'+j+'- '+fmfld[j][fdd].recid);
// 					console.log(fmfld[j]);
				}
				fmfld[j] = fma;
				console.log(fma);
// 				console.log('end j:' + j)
			}
// 			console.log("created 2d var");
// 			console.log(fmfld[0]["UID"].recid);
// 			console.log(fmfld[1]["UID"].recid);
			
/*
			var fld2 = $(fld1[34]).attr('name');
			
			var fmfld = [];
			for (var i=0; i<fld1.length; i++) {
// 				console.log(fld1[i]);
				var fdd = $(fld1[i]).attr('name');
				var fde = $(fld1[i]).text();
				console.log(fdd + ': '+ fde);
				fmfld[fdd]=fde;
				
			}
			*/
			var fldList = $('[data-fmfield]');
// 			console.log(fldList);
			for (var i = 0; i < fldList.length; i++) {
				var dtfl = $(fldList[i]).data('fmfield');
				console.log(dtfl);
				$('[data-fmfield="' + dtfl + '"]').text(fmfld[0][dtfl].value);
				$('[data-fmfield="' + dtfl + '"]').val(fmfld[0][dtfl].value);
				$('[data-fmfield="' + dtfl + '"]').attr('data-fmrecid',fmfld[0][dtfl].recid);
			}
			
			if(fmfld[0]["Show_ReportEventForm::replaceRep"].value.length > 0){
				$("#replaceRepName").show();
				$("#demorep").addClass("text-muted strikethrough");
			}
			
			
			var cList = $('#productload');
			cList.append("<!-- begining of Products -->");
			$.each(fmfld, function() {
				
				var addhtm = '<div class="boxed-grey"><p><span class="bold" data-fmfield="ProductID">'+this["ProductID"].value+'</span> - '+this["ProductName"].value+'</p><div><div class="col-xs-3 col-sm-3 col-md-3" style="font-size: small;"># of Samples</div><div class="col-xs-3 col-sm-3 col-md-3">';

				addhtm +='<textarea class="editing" name="samples" rows="1" cols="3" placeholder="" data-fmfield="QuantitySamples" data-fmrecid="'+this["QuantitySamples"].recid+'">'+this["QuantitySamples"].value+'</textarea></div>';
				
				addhtm +='<div class="col-xs-3 col-sm-3 col-md-3" style="">Product Used</div><div class="col-xs-1 col-sm-1 col-md-1"><textarea class="editing" name="productused" rows="1" cols="3" placeholder="" data-fmfield="QuantityProductUsed" data-fmrecid="'+this["QuantityProductUsed"].recid+'">'+this["QuantityProductUsed"].value+'</textarea></div></div><div style="clear: both;padding-top: 20px;">';
				
				
				addhtm +='<input class="editing" type="checkbox" id="'+this["ProductID"].recid+'check" class="css-checkbox" value="1" data-fmfield="SubsUsed" data-fmrecid="'+this["SubsUsed"].recid+'" ';
				
				console.log(this["SubsUsed"].value);
				
				if(this["SubsUsed"].value == 1){
					addhtm +='checked="checked"';
					console.log("made it to checked");
					}
				
				addhtm +='/><label for="checkbox68" name="checkbox68_lbl" class="css-label chrome-style" style="margin-left: 3px;"> Used a substitute</label></div><div id="'+this["ProductID"].recid+'div"><div>';
				
				addhtm +='<div class="form-group"><label for="upc">Substitute Product UPC</label><input type="text" class="form-control editing" id="subsupc" placeholder="UPC" data-fmfield="SubsProductID" data-fmrecid="'+this["SubsProductID"].recid+'" value="'+this["SubsProductID"].value+'"></div>';
				
				addhtm +='<div class="form-group"><label for="productname">Substitute Product Name</label><input type="text" class="form-control editing" id="subsproductname" placeholder="Product Name" data-fmfield="SubsProductName" data-fmrecid="'+this["SubsProductName"].recid+'" value="'+this["SubsProductName"].value+'"></div>';
				
				addhtm +='<div class="form-group"><label for="stime">Time of Substitute</label><input type="text" class="form-control editing" id="stime" placeholder="Enter Time" data-fmfield="SubsTime" data-fmrecid="'+this["SubsTime"].recid+'" value="'+this["SubsTime"].value+'"></div><div style=""><div class="col-xs-3 col-sm-3 col-md-3" style=""># of Samples</div><div class="col-xs-3 col-sm-3 col-md-3"><textarea class="editing" name="samples2" rows="1" cols="3" placeholder="" data-fmfield="SubsQuantitySamples" data-fmrecid="'+this["SubsQuantitySamples"].recid+'">'+this["SubsQuantitySamples"].value+'</textarea></div><div class="col-xs-3 col-sm-3 col-md-3" style="">Product Used</div><div class="col-xs-1 col-sm-1 col-md-1"><textarea class="editing" name="productused2" rows="1" cols="3" placeholder="" data-fmfield="SubsQuantityProductUsed" data-fmrecid="'+this["SubsQuantityProductUsed"].recid+'">'+this["SubsQuantityProductUsed"].value+'</textarea></div></div></div></div></div><div style="height: 10px;margin-top: 10px;"></div>';

	
				cList.append(addhtm);
				var idadd = this["ProductID"].recid;
				if(this["SubsUsed"].value == 1){
					console.log("show hide checked");
					} else {
						$('#'+idadd+'div').hide();
					}
				
				$('#'+idadd+'check').click(function() {
					console.log("toggle subs");
					$('#'+idadd+'div').toggle();
				});
				
/*
				if ($('input.css-checkbox').is(':checked')) {
					$(this).trigger( "click" );
					console.log("checked checked")
					}
*/

		        

			});
			
			console.log('made it to the function-');
			$( ".timeformat" ).each(function() {
			  
			var dt = $(this);
			var dts = '01/01/2015 '+dt.text();
			console.log(dts);
			dt2 = formatDate(dts);
			console.log(dt2);
			dt.text(dt2);
			
			$('.editing').on('blur',editTHIS);
			$('#sendform').attr('data-fmrecid',fmfld[0]['Show_ReportEventForm::UID'].recid);
			  
			});
			
			var locUID = fmfld[0]["ShowLocation::UID"].value;
			console.log("locUID");
			console.log(locUID);
			$("#repListShow").attr('data-locuid', locUID);

		}
	});


}

function getRecapList(luid) {
	
	ajaxindicatorstart('loading list.. please wait..');
	
	var tst = $("h4").data('fmfield');
	var field = "Show::BillingCode";
	var data2 = {
		"-db": "Flair_App",
		"-lay": "webwincorecaplist",
		"-script": "tlrecaplist",
		"-script.param": "D59F7C9F-AAAC-804E-8945-211EA0ECB068",
// 		"-script.param": "3DD0A0C5-4143-439B-B75E-81ACA5A6A683",
		
		
/*
		"Lead_ShowPeople::ReferenceUID": "3DD0A0C5-4143-439B-B75E-81ACA5A6A683",
		"formSent": "",
		"formSent.op": "eq",
*/
		
		
/*
		console.log("Job Selected: " + seljob);
		$.get("http://daniel eggar:1234crux@10.0.101.201/fmi/xml/fmresultset.xml?-db=hals_scheduler&-lay=output&-script=GetJobsMapList&-script.param=type:%20" + seljob + "&-findall", function(data)
*/
/*
		"Show_ReportEventForm::formEnteredTS": "",
		"Show_ReportEventForm::formEnteredTS.op": "eq",
*/
		"-findall": ""
	};

	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		data: data2,
		success: function(data) {
			ajaxindicatorstop();
// 			alert('Thanks for your comment!');
			var dt2 = data;
			var xmlDoc = $.parseXML(data),
				xml = $(data),
				title = xml.find("resultset");
			var txt = title.text();
			var title2 = xml.find("resultset record");
			var tet2 = title2[1];
			var testeq2 = $(tet2).find("field");
			var testeq1 = testeq2;
			var fmfld = [
				[]
			];
			for (var j = 0; j < title2.length; j++) {

				var txt2 = title2[j];
				var fld2 = $(txt2).find("field");
				var fld1 = fld2;

				var fld1a = $(txt2).attr("record-id");
				var fma = [];
				for (var i = 0; i < fld1.length; i++) {
					var fdd = $(fld1[i]).attr('name');
					var fde = $(fld1[i]).text();

					fma[fdd] = {
						value: fde,
						recid: fld1a
					};
				}
				fmfld[j] = fma;
				console.log(fma);
			}

			var fldList = $('[data-fmfield]');
			for (var i = 0; i < fldList.length; i++) {
				var dtfl = $(fldList[i]).data('fmfield');
				console.log(dtfl);
				$('[data-fmfield="' + dtfl + '"]').text(fmfld[0][dtfl].value);
			}
			
			
			
			var cList = $('#recaplist');
			var li = $("<div/>").addClass("list-group").appendTo(cList);
			var li = $("<a/>").addClass("list-group-item active").text("List of Recaps").appendTo(cList);
			
			$.each(fmfld, function() {
				
// 				var lif = $('<span\>').text(this["JobNumber"].value)
// 				var lif2 = appendTo(lif).text(this["ShowLocation::Name"].value)

// 				var infoline = this["ShowSchedule::date"].value + ' <span class="recaplistsp">' + this["Show::BillingCode"].value + '</span> ' + this["ShowSchedule::rep"].value+' ';

// 				var infoline = $("<span/>").addClass("recaplistsp").text(this["ShowSchedule::date"].value);
// 				var infoline2 =  $("<span/>").addClass("recaplistsp").text(this["Show::BillingCode"].value + this["ShowSchedule::rep"].value).appendTo(infoline);
				var idadd = this["UID"].value;
				
				if(this['Show::TeamLeadMeeting'].value == 1){
						var li = $("<a/>").addClass("list-group-item").attr('href', 'tlmeet.html?UID='+idadd).text('');
					} else {
						var li = $("<a/>").addClass("list-group-item").attr('href', 'recap.html?UID='+idadd).text('');
					}
				
				
				$("<span/>").addClass("recaplistsp").text(this["ShowSchedule::date"].value).appendTo(li);
				$("<span/>").addClass("recaplistsp").text(this["Show::BillingCode"].value).appendTo(li);
				$("<span/>").addClass("recaplistsp").text(this["ShowSchedule::rep"].value).appendTo(li);
				
				if(this['formSent'].value == 1){
					$("<span/>").addClass("alert-info").text('Submitted: '+this["formSentTS"].value).appendTo(li);
				}
				
				if(this['Show::TeamLeadMeeting'].value == 1){
					var lif = $('<span\>').addClass("jobn").text('Admin').prependTo(li);
				} else {
					var lif = $('<span\>').addClass("bold jobn").text(this["JobNumber"].value).prependTo(li);
				}
				
				var lif2 = li.appendTo(cList);
				
				

			});
			
			
			$('#recapTotal').text(fmfld.length);
			
			
			console.log('made it to the function-');
			
			
			
			$( ".timeformat" ).each(function() {
			  
			var dt = $(this);
			var dts = '01/01/2015 '+dt.text();
			console.log(dts);
			dt2 = formatDate(dts);
			console.log(dt2);
			dt.text(dt2);
			  
			});

		}
	});


}

function editTHIS() {
	
	var valf = $(this).val();
	console.log(valf);
	var fld = $(this).data('fmfield');
	var frecid = $(this).data('fmrecid');
	console.log(fld);
	console.log(frecid);
	var data2 = {
		"-db": "Flair_App",
		"-lay": "webwincorecap",
		"-recid": frecid
	};
	data2[fld] = valf;
	data2["-edit"] = "";
	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		data: data2,
		success: function() {
			console.log('Edited a field: ' + data2[fld]);
		}
	});
	
}
function editTL() {
	
	var valf = $(this).val();
	console.log(valf);
	var fld = $(this).data('fmfield');
	var frecid = $(this).data('fmrecid');
	console.log(fld);
	console.log(frecid);
	var data2 = {
		"-db": "Flair_App",
		"-lay": "webwincotlmeet",
		"-recid": frecid
	};
	data2[fld] = valf;
	data2["-edit"] = "";
	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		data: data2,
		success: function() {
			console.log('Edited a field: ' + data2[fld]);
		}
	});
	
}

function getTL(efUID) {
	
	ajaxindicatorstart('loading Team Lead Form.. please wait..');
	console.log(efUID);
	var data2 = {
		"-db": "Flair_App",
		"-lay": "webwincotlmeet",
		"UID": efUID,
		"-find": ""
	};
	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		data: data2,
		success: function(data) {
			ajaxindicatorstop();
			var dt2 = data;
			var xmlDoc = $.parseXML(data),
				xml = $(data),
				title = xml.find("resultset");
			var txt = title.text();
			var title2 = xml.find("resultset record");
			var tet2 = title2[1];
			var testeq2 = $(tet2).find("field");
			var testeq1 = testeq2;
			var fmfld = [
				[]
			];
			for (var j = 0; j < title2.length; j++) {
				var txt2 = title2[j];
				var fld2 = $(txt2).find("field");
				var fld1 = fld2;
				var fld1a = $(txt2).attr("record-id");
				var fma = [];
				for (var i = 0; i < fld1.length; i++) {
					var fdd = $(fld1[i]).attr('name');
					var fde = $(fld1[i]).text();
					fma[fdd] = {
						value: fde,
						recid: fld1a
					};
				}
				fmfld[j] = fma;
				console.log(fma);
			}
			var fldList = $('[data-fmfield]');
			for (var i = 0; i < fldList.length; i++) {
				var dtfl = $(fldList[i]).data('fmfield');
				console.log(dtfl);
				$('[data-fmfield="' + dtfl + '"]').text(fmfld[0][dtfl].value);
				$('[data-fmfield="' + dtfl + '"]').val(fmfld[0][dtfl].value);
				$('[data-fmfield="' + dtfl + '"]').attr('data-fmrecid',fmfld[0][dtfl].recid);
			}
/*
			}
			});
*/
			
			$( ".timeformat" ).each(function() {
			  
			var dt = $(this);
			var dts = '01/01/2015 '+dt.text();
			console.log(dts);
			dt2 = formatDate(dts);
			console.log(dt2);
			dt.text(dt2);
			
			$('.editing').on('blur',editTL);
			$('#sendform').attr('data-fmrecid',fmfld[0]['UID'].recid);
			  
			});

		}
	});


}

function getRepList(locUID) {
	
/* 	var locUID = $("#repListShow").data(locuid); */

	console.log(locUID);
	var data2 = {
		"-db": "Flair_App",
		"-lay": "webLocationReps",
		"UIDkey": locUID,
		"-find": ""
	};

	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		data: data2,
		success: function(data) {
			var dt2 = data;
			var xmlDoc = $.parseXML(data), xml = $(data), title = xml.find("resultset");
			var txt = title.text();
			var title2 = xml.find("resultset record");
			var tet2 = title2[1];
			var testeq2 = $(tet2).find("field");
			var testeq1 = testeq2;
			var fmfld = [
				[]
			];

			for (var j = 0; j < title2.length; j++) {

				var txt2 = title2[j];
				var fld2 = $(txt2).find("field");
				var fld1 = fld2;
				var fld1a = $(txt2).attr("record-id");
				var fma = [];
				for (var i = 0; i < fld1.length; i++) {
					var fdd = $(fld1[i]).attr('name');
					var fde = $(fld1[i]).text();
					fma[fdd] = {
						value: fde,
						recid: fld1a
					};
				}
				fmfld[j] = fma;
// 				console.log(fma);
			}

			var fldList = $('[data-fmfield]');
// 			console.log(fldList);
			$( "#replist" ).empty();
			var cList = $('#replist');
			cList.append("<!-- begining of reps -->");
			cList.append('<ul class="list-group">');
			$.each(fmfld, function() {
				
				var addhtm = '<li class="list-group-item"><span class="bold" data-fmfield="winco_ShowIndex_Party::Name" data-replaceuid="'+this["UIDrelated"].value+'">'+this["winco_ShowIndex_Party::Name"].value+'</span>';
				addhtm +='</li>';
				cList.append(addhtm);
				var idadd = this["winco_ShowIndex_Party::Name"].value;
				
				
		        
			});
			
			$( "#replist li" ).on( "click", selectDemo);
			
			cList.append('<li id="othernameli" class="list-group-item"><input type="text" id="othername" placeholder="Enter Name Here"></li>');
			
			cList.append("</ul>");
			
			$("#othername").on ("blur" , function(){
				console.log("made it to blur");
				var repother = $("#othername").val();
				console.log(repother);
				$("#replaceName").val(repother);
				$("#replaceUID").val("");
				$("#othernameli").addClass("bg-success");
				$("#replaceNameDis").text(repother);
				$("#replacedShow").show();
				$("#changeRep").show();
			});
			
			
			$('#repModal').modal('show');
			$("#changeRep").hide();
			$("#changeRep").on ("click", sumbitRepChange);
			$("#replacedShow").hide();
		}
			});
}


function submitForm() {
	
	var param1 = new Date();
	var param2 = (param1.getMonth()+1) + '/' + param1.getDate() + '/' + param1.getFullYear() + ' ' + param1.getHours() + ':' + param1.getMinutes() + ':' + param1.getSeconds();
	var tstamp = param2;
	
	console.log(tstamp);
	var fmrecid = $('#sendform').data('fmrecid');
	var data2 = {
		"-db": "Flair_App",
		"-lay": 'webwincotlmeet',
		"-recid": fmrecid,
		"formSent": 1,
		"formSentTS": tstamp
	};

	data2["-edit"] = "";
	console.log(data2);
	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		data: data2,
		success: function() {
			console.log('Submitting a form: ' + data2['formSentTS']);
			
		}
	});
	
}

function selectDemo() {
	rr = $(this);
	var replaceName = rr.text();
	var replaceUID = rr.find('span').data('replaceuid');
	$("#replaceName").val(replaceName);
	$("#replaceUID").val(replaceUID);
	rr.addClass("bg-success");
	$("#othernameli").removeClass("bg-success");
	$("#replaceNameDis").text(replaceName);
	$("#replacedShow").show();
	$("#changeRep").show();
}

function sumbitRepChange() {
	var replaceName = $("#replaceName").val();
	var replaceUID = $("#replaceUID").val();
	
	var fmrecid = $('#sendform').data('fmrecid');
	var data2 = {
		"-db": "Flair_App",
		"-lay": 'webwincorecap',
		"-recid": fmrecid,
		"Show_ReportEventForm::replaceRep": replaceName,
		"Show_ReportEventForm::replaceUIDRep": replaceUID
	};

	data2["-edit"] = "";
	console.log(data2);
	$.ajax({
		type: "GET",
		url: "fmrelay.php",
		dataType: 'xml',
		data: data2,
		success: function() {
			console.log('Submitting a form: ' + data2['Show_ReportEventForm::replaceRep']);
			
		}
	});

	
	
	$('#repModal').modal('hide');
	$("#replaceRepName").text(replaceName);
	$("#replaceRepName").show();
	$("#demorep").addClass("text-muted strikethrough");
	
}