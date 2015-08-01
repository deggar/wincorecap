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

// Changes XML to JSON

function xmlToJson(xml) {
	// Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}
	// do children
	if (xml.hasChildNodes()) {
		for (var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}

function getIT(test) {
	var tst = $("h4").data('fmfield');
	var field = "Show::BillingCode";
	var data2 = {
		"-db": "Flair_App",
		"-lay": "webwincorecap",
		"Show_ReportEventForm::UID": "1115A314-FA59-4A39-8C4A-FD1F6F38F6AF",
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
			alert('Thanks for your comment!');
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
			}
			
			
			
			var cList = $('#productload');
			cList.append("<!-- begining of Products -->");
			$.each(fmfld, function() {
				
				var addhtm = '<div class="boxed-grey"><p><span class="bold" data-fmfield="ProductID">'+this["ProductID"].value+'</span> - '+this["ProductName"].value+'</p><div><div class="col-xs-3 col-sm-3 col-md-3" style="font-size: small;"># of Samples</div><div class="col-xs-3 col-sm-3 col-md-3"><textarea name="samples" rows="1" cols="3" placeholder=""></textarea></div><div class="col-xs-3 col-sm-3 col-md-3" style="">Product Used</div><div class="col-xs-1 col-sm-1 col-md-1"><textarea name="samples" rows="1" cols="3" placeholder=""></textarea></div></div><div style="clear: both;padding-top: 20px;"><input type="checkbox" id="'+this["ProductID"].recid+'check" class="css-checkbox" /><label for="checkbox68" name="checkbox68_lbl" class="css-label chrome-style" style="margin-left: 3px;"> Used a substitute</label></div><div id="'+this["ProductID"].recid+'div"><div><div class="form-group"><label for="upc">Substitute Product UPC</label><input type="text" class="form-control" id="upc" placeholder="UPC"></div><div class="form-group"><label for="productname">Substitute Product Name</label><input type="text" class="form-control" id="productname" placeholder="Product Name"></div><div class="form-group"><label for="stime">Time of Substitute</label><input type="time" class="form-control" id="stime" placeholder="Enter Time"></div><div style=""><div class="col-xs-3 col-sm-3 col-md-3" style=""># of Samples</div><div class="col-xs-3 col-sm-3 col-md-3"><textarea name="samples" rows="1" cols="3" placeholder=""></textarea></div><div class="col-xs-3 col-sm-3 col-md-3" style="">Product Used</div><div class="col-xs-1 col-sm-1 col-md-1"><textarea name="samples" rows="1" cols="3" placeholder=""></textarea></div></div></div></div></div><div style="height: 10px;margin-top: 10px;"></div>'

	
				cList.append(addhtm);
				var idadd = this["ProductID"].recid
				$('#'+idadd+'div').hide();
				$('#'+idadd+'check').click(function() {
					console.log("toggle subs");
					$('#'+idadd+'div').toggle();
				});
				
				

		        

			});
			
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
	
	

	
/*
	$(".timeformat").function() {
		var dt = this.text();
		console.log(dt);
		dt2 = formatDate(dt);
		console.log(dt2);
		this.text(dt2);
	}
*/


}

$(document).ready(function() {
// 	console.log("got here1");
	$("#closesearch").click(function() {
		console.log("close search");
		$("#searchbox").hide();
	});
	$("#closelist").click(function() {
		console.log("close list");
		$("#jlist").hide();
	});
	var tst = $("h4").data('fmfield');
	$('h4[data-fmfield="Show::BillingCode"]').text('replaced');
// 	console.log(tst);
	$("#addnew").click(function() {
		console.log("add new here");
		var field = "Customer";
		var value = $("#name").val();
		var data2 = {
			"-db": "Flair_App",
			"-lay": "webwincorecap",
			"-recid": "1",
			"-edit": ""
		};
		data2[field] = value;
		console.log(data2);
		console.log(field + ": " + value);
		$.ajax({
			type: "GET",
			url: "http://php:php@50.240.31.157/fmi/xml/fmresultset.xml",
			dataType: 'xml',
			// 		  data: { "-db": "hals_scheduler", "-lay": "utilityJobForm", "-recid": "1", "Customer": value, "-edit": "" },
			data: data2,
			success: function() {
				alert('Thanks for your comment!');
			}
		});
	});
	$(".editing").blur(function() {
		var valf = $(this).val();
		console.log(valf);
		var fld = $(this).data('fmfield');
		console.log(fld);
		var data2 = {
			"-db": "hals_scheduler",
			"-lay": "utilityJobForm",
			"-recid": "1",
			"-edit": ""
		};
		data2[fld] = valf;
		$.ajax({
			type: "GET",
			url: "http://admin:admin@10.0.101.201/fmi/xml/fmresultset.xml",
			dataType: 'xml',
			data: data2,
			success: function() {
				console.log('Edited a field: ' + data2[fld]);
			}
		});
	});
	$("#addnew").click(function() {
		console.log("add new here");
		var field = "Customer";
		var value = $("#name").val();
		var data2 = {
			"-db": "Flair_App",
			"-lay": "webwincorecap",
			"-recid": "1",
			"-edit": ""
		};
		data2[field] = value;
		console.log(data2);
		console.log(field + ": " + value);
		$.ajax({
			type: "GET",
			url: "http://php:php@50.240.31.157/fmi/xml/fmresultset.xml",
			dataType: 'xml',
			// 		  data: { "-db": "hals_scheduler", "-lay": "utilityJobForm", "-recid": "1", "Customer": value, "-edit": "" },
			data: data2,
			success: function() {
				alert('Thanks for your comment!');
			}
		});
	});
	$("#take").click(function() {
// 		console.log("got here");
		var jobshow = document.getElementById("showjob");
		var seljob = jobshow.options[jobshow.selectedIndex].value;
		console.log("Job Selected: " + seljob);
		$.get("http://daniel eggar:1234crux@10.0.101.201/fmi/xml/fmresultset.xml?-db=hals_scheduler&-lay=output&-script=GetJobsMapList&-script.param=type:%20" + seljob + "&-findall", function(data) {
			console.log("Data Loaded: " + data);
			var xmlDoc = $.parseXML(data),
				xml = $(data),
				title = xml.find("data");
			var txt = title.text();
			console.log('txt: ' + txt);
			// 			console.log($beach);
			var beachnew = new Array;
			var nbeach = new Array;
			var array = txt.split('%%|%%');
			var beachnew = array;
			var beach1 = array[0];
			var beach2 = beach1.split(',');
			console.log('beachnew: ' + beachnew);
			console.log('1st: ' + beachnew[0]);
			console.log('b1: ' + beach1);
			console.log('b2: ' + beach2[2]);
			for (i = 0; i < beachnew.length; i++) {
				var arr1 = new Array;
				var beachS = beachnew[i];
				console.log('No' + i + ': ' + beachS);
				var beachN = beachS.split(',');
				console.log('New' + i + ': ' + beachN);
				for (j = 0; j < beachN.length; j++) {
					console.log('j' + j + ': ' + beachN[j]);
					arr1.push(beachN[j]);
				}
				nbeach.push(arr1);
				console.log('arr1: ' + arr1);
			}
			console.log('nbeach: ' + nbeach);
			for (i = 0; i < nbeach.length; i++) {
				console.log('nbeach' + i + ': ' + nbeach[i]);
				for (j = 0; j < nbeach[i].length; j++) {
					console.log('ij' + i + j + ': ' + nbeach[i][j]);
				}
			}
			initialize(nbeach);
		});
	});
	getIT();
});