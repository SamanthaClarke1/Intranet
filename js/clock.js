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
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var termDates = {};
termDates[33] = "Week 6B";
termDates[34] = "Week 7A";
termDates[35] = "Week 8B";
termDates[36] = "Week 9A";
termDates[37] = "Week 10B";
termDates[38] = "Holidays";
termDates[39] = "Holidays";
termDates[30] = "Week 1A";
termDates[41] = "Week 2B";
termDates[42] = "Week 3A";
termDates[43] = "Week 4B";
termDates[44] = "Week 5A";
termDates[45] = "Week 6B";
termDates[46] = "Week 7A";
termDates[47] = "Week 8B";
termDates[48] = "Week 9A";
termDates[49] = "Week 10B";
termDates[50] = "Holidays";
termDates[51] = "Holidays";

function getWeekNumber() {
	var today = new Date();
	var d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
	var dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
	return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}

function calcWeek() {
	var thisWeek = getWeekNumber();	
	return termDates[thisWeek];		
}

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
	document.getElementById('datetime').innerHTML = D + " " + M + ", " + fixHours(h) + ":" + m + " " + ampm;
	document.getElementById('week').innerHTML = calcWeek();
	var t = setTimeout(startTime, 10000);
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
	if (i > 12) {i = "PM"} else {i = "AM"};
	return i;
}

startTime();