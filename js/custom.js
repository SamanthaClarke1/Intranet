$(document).ready(function () {
	$("#header").fadeTo(0, 0.01).delay(250).fadeTo("slow", 1);
	$("#button1").fadeTo(0, 0.01).delay(500).fadeTo("slow", 1);
	$("#button2").fadeTo(0, 0.01).delay(600).fadeTo("slow", 1);
	$("#button3").fadeTo(0, 0.01).delay(700).fadeTo("slow", 1);
	$("#button4").fadeTo(0, 0.01).delay(800).fadeTo("slow", 1);
	$("#button5").fadeTo(0, 0.01).delay(900).fadeTo("slow", 1);
	$("#button6").fadeTo(0, 0.01).delay(1000).fadeTo("slow", 1);
	$("#main-menu").fadeTo(0, 0.01).delay(1100).fadeTo("slow", 1);
	$("#search").fadeTo(0, 0.01).delay(1200).fadeTo("slow", 1);	
	$("#date-info").fadeTo(0, 0.01).delay(1300).fadeTo("slow", 1);	
	$("#content").fadeTo(0, 0.01).delay(1400).fadeTo("slow", 1);
	
	$( "#hamburger" ).click(function() {
		console.log("works!");
		$( ".nav" ).slideToggle( "slow", function() {
		 
		});
	});
	
	if ($(window).width() < 800) {
		$( ".nav" ).slideUp( 0, function() {});
		$( "#search" ).hide();
		$( "#date-info" ).hide();
	}
	else {
		$( ".nav" ).slideDown( 0, function() {});
		$( "#search" ).show();
		$( "#date-info" ).show();
	}
	
	$(window).resize(function() {
		if ($(window).width() < 800) {
			$( ".nav" ).slideUp( 0, function() {});
			$( "#search" ).hide();
		$( "#date-info" ).hide();
		}
		else {
			$( ".nav" ).slideDown( 0, function() {});
			$( "#search" ).show();
			$( "#date-info" ).show();
		}
	});
});