/* =================================
------------------------------------
	WebUni - Education Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.InsightIQLoggedIn) {
        console.log(localStorage.InsightIQLoggedIn);

        let loginBtn = document.getElementById("loginBtn");
        let lgBtn = document.getElementById("SignUpBtn");

        lgBtn.innerText = 'Log Out';
        lgBtn.setAttribute('href', '#');

        // Add event listener for logout
        const logoutHandler = () => {
            fetch('http://127.0.0.1:8000/api/logout/', {
                method: 'POST', // Generally, logout requests should be POST
                headers: {
                    'Authorization': `Token ${localStorage.token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())  // Assuming the response is in JSON format
            .then(data => {
                // Perform logout actions
                console.log(data);

                // Clear localStorage
                localStorage.removeItem('InsightIQLoggedIn');

                // Update the UI to reflect the logged-out state
                lgBtn.innerText = 'SignUp';
                lgBtn.setAttribute('href', 'login.html');
                lgBtn.removeEventListener('click', logoutHandler); // Remove logout event

                loginBtn.innerText = 'Login';
                loginBtn.style.color = ''; // Reset color or apply default style
            })
            .catch(error => console.error('Error:', error));
        };

        lgBtn.addEventListener('click', logoutHandler);

        // Update login button with user info
        loginBtn.innerText = `${localStorage.InsightIQLoggedIn.split(",")[1].split("@")[0]}`;
        loginBtn.style.color = '#fff44f';
    }
});




$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");


	/*------------------
		Gallery item
	--------------------*/
	if($('.course-items-area').length > 0 ) {
		var containerEl = document.querySelector('.course-items-area');
		var mixer = mixitup(containerEl);
	}

});

(function($) {

	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		Realated courses
	--------------------*/
    $('.rc-slider').owlCarousel({
		autoplay:true,
		loop: true,
		nav:true,
		dots: false,
		margin: 30,
		navText: ['', '<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			576:{
				items:2
			},
			990:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});


    /*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});



	/*------------------
		Circle progress
	--------------------*/
	$('.circle-progress').each(function() {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cptitle = $(this).data("cptitle");
		var cpid 	= $(this).data("cpid");

		$(this).append('<div class="'+ cpid +'"></div><div class="progress-info"><h2>'+ cpvalue +'%</h2><p>'+ cptitle +'</p></div>');

		if (cpvalue < 100) {

			$('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 176,
				thickness: 9,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			$('.' + cpid).circleProgress({
				value: 1,
				size: 176,
				thickness: 9,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}

	});

})(jQuery);



function additem(data){
	if(data.success){
		localStorage.removeItem('InsightIQLoggedIn');
		localStorage.removeItem('InsightIQImage');
	}
}



