var months_array = new Array();
months_array[0] = "January";
months_array[1] = "February";
months_array[2] = "March";
months_array[3] = "April";
months_array[4] = "May";
months_array[5] = "June";
months_array[6] = "July";
months_array[7] = "August";
months_array[8] = "September";
months_array[9] = "October";
months_array[10] = "November";
months_array[11] = "December";

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var termDates = {};
termDates[34] = "Week 6B";
termDates[35] = "Week 7A";
termDates[36] = "Week 8B";
termDates[37] = "Week 9A";
termDates[38] = "Week 10B";
termDates[39] = "Holidays";
termDates[40] = "Holidays";
termDates[41] = "Week 1A";
termDates[42] = "Week 2B";
termDates[43] = "Week 3A";
termDates[44] = "Week 4B";
termDates[45] = "Week 5A";
termDates[46] = "Week 6B";
termDates[47] = "Week 7A";
termDates[48] = "Week 8B";
termDates[49] = "Week 9A";
termDates[50] = "Week 10B";
termDates[51] = "Holidays";
termDates[52] = "Holidays";

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
	var M = months_array[today.getMonth()]; 
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