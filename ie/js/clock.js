	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	function startTime() {
		var today = new Date();
		var D = today.getDate()
		var M = month[today.getMonth()]; 
		var d = weekday[today.getDay()]; 
		var h = today.getHours();
		var m = today.getMinutes();
		m = checkTime(m);
		d = checkTime(d);
		var ampm = checkAmPm(h);
		document.getElementById('date-text').innerHTML = D;
		document.getElementById('month-text').innerHTML = M;
		document.getElementById('time-text').innerHTML = fixHours(h) + ":" + m + " " + ampm;
		document.getElementById('day-text').innerHTML = d;
		var t = setTimeout(startTime, 500);
	}
	function checkTime(i) {
		if (i < 10) {i = "0" + i};
		return i;
	}
	function fixHours(i) {
		if (i > 12) {i = i - 12};
		return i;
	}
	function checkAmPm(i) {
		if (i > 11) {i = "PM"} else {i = "AM"};
		return i;
	}