(function() {


	// Scroll smoothly on click on learn more button
	$('.about').click(function(){
		var minus = 0
		if($(window).scrollTop() == 0){
			minus = 0
		}
		// Add select calss to li mini menu 
		$(this).addClass('select').siblings().removeClass('select');
		
		$('html, body').animate({
			scrollTop: $('#about').position().top - $(".navbar").height() - minus
		}, 800);
		return false;
		
	});

	// Scroll smoothly on click on learn more button
	$('.sm').click(function(){
		
		// Add select calss to li mini menu 
		var minus = 0
		if($(window).scrollTop() == 0){
			minus = 50
		}
		$(this).addClass('select').siblings().removeClass('select');
		
		$('html, body').animate({
			scrollTop: $('#shine-mini').position().top - $(".navbar").height() - minus
		}, 800);
		return false;
		
	});

	$('.partp').click(function(){
		
		// Add select calss to li mini menu 
		var minus = 0
		if($(window).scrollTop() == 0){
			minus = 50
		}
		$(this).addClass('select').siblings().removeClass('select');
		
		$('html, body').animate({
			scrollTop: $('#parpat').position().top - $(".navbar").height() - minus
		}, 800);
		return false;
		
	});


// Scroll smoothly on click on learn more button
	$('.tnc').click(function(){
		var minus = 0
		if($(window).scrollTop() == 0){
			minus = 50
		}
		// Add select calss to li mini menu 
		$(this).addClass('select').siblings().removeClass('select');
		
		$('html, body').animate({
			scrollTop: $('#tnc').position().top - $(".navbar").height() - minus
		}, 800);
		return false;
		
	});


	
	
	
	
	// Fixed the mini menu top while scrolling
	var stickyOffset = $('.sticky').offset().top;

	$(window).scroll(function(){
	  var sticky = $('.sticky'),
		  scroll = $(window).scrollTop();
		
	  if (scroll >= stickyOffset+7) sticky.addClass('fixed');
	  if(scroll <= 5 ) sticky.removeClass('fixed');
	});
	
	/* timer function */
	function getTimeRemaining(endtime) {
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor((t / 1000) % 60);
	  var minutes = Math.floor((t / 1000 / 60) % 60);
	  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	  var days = Math.floor(t / (1000 * 60 * 60 * 24));
	  return {
	    'total': t,
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}
	  

	function initializeClock(element, endtime) {
  
	  
	  function updateClock() {
	    var t = getTimeRemaining(endtime);
	    $(element).html(('0' + t.hours).slice(-2) + ":" + ('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2));

	    if (t.total <= 0 && (new Date()).getHours() <= 14) { //14
	      clearInterval(timeinterval);
	      /* action on complete*/
	      $(".timer-wrap p, .timer-details").html("");
	      $(element).html('Contest is LIVE now <br/> <span style="font-size: 14px;">Time Remaining</span> <span class="remaining-time" style="font-size: 14px;"></span>');
	    }

	  }

	  updateClock();
	  var timeinterval = setInterval(updateClock, 1000);
	}
	function initializeClock2(element, endtime) {
	 
	  
	  function updateClock() {
	    var t = getTimeRemaining(endtime);
	    $(element).html(('0' + t.hours).slice(-2) + ":" + ('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2));

	    if (t.total <= 0 && (new Date()).getHours() <= 14) { //14
	      clearInterval(timeinterval);
	    }

	  }

	  updateClock();
	  var timeinterval = setInterval(updateClock, 1000);
	}
	var today = (new Date()).getDate();
	var tomorrow = (new Date((new Date()).getTime() + (24 * 60 * 60 * 1000))).getDate();
	var dateInCal = (new Date()).getHours() >= 10 /* 10 */ && (new Date()).getHours() < 14 /* 14 */ ? today : tomorrow;
	var deadline = new Date(Date.parse(dateInCal+" June 2016 09:59:59")); // 9
	var remaining = new Date(Date.parse(today+" June 2016 13:59:59")); // 9
	initializeClock('.timer', deadline);
	initializeClock2('.remaining-time', remaining);

	$(".forgot-password").on("click", function(){
		$("#id_forgetpassword_form").show();
		$('#error_msg').html("");
		$("#loginFrm").hide();
		$(".forget-form").show();
		return false;
	});

	$("#btnCancel").on("click", function(){
		$(".forget-form").css("display", "none");
		$("#loginFrm").css('display', '');
		return false;
	});

	$("#id_forgetpassword").on("click",function(){
		var obj={};
		obj.inp=$("#id_username");
		if($.trim(obj.inp.val())==''){
			obj.inp.addClass('error');
		}
		else{
			$("#id_forgetpassword_form").hide();
			$('#error_msg').html("Request Submitted.");
			obj.METHOD='POST';
			obj.DATA=$('#id_forgetpassword_form').serialize();
			obj.SRC = 'http://recruiter.shine.com/recruiter/forgot-password/';
			$app.io.makeRequest(obj,function(response){
				$('#error_msg').html(response["message"]);

			});
	    }
	});

	/*$(".btn-login").on("click", function(){
		$(".form").css("display", "");
		return false;
	});
*/
	/*$(document).mouseup(function (e)
	{
	    var container = $(".form");
	if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	        container.hide();
	        $(".forget-form").css("display", "none");
			$("#login-frm").css('display', '');
			$(".small-manu-con").slideUp();
	    }
	});*/
    $(document).on('click','cls_login',function(e){
    		$("#loginFrm").css('display', '');
         	$(".forget-form").css("display", "none");
         	$('.bs-example-modal-sm').modal('show');
         
    });

	$(".small-menu").on("click", function(){
		$(".small-manu-con").stop().slideToggle();
		return false;
	});

	$('.modal').on('hidden.bs.modal', function () {
	    // do something…
	   $("#loginFrm").css('display', '');
         	$(".forget-form").css("display", "none");
	});

}());


jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 50,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
});
// For Scroll Top
