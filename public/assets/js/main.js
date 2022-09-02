$(function() {

	"use strict";

	//===== Prealoder
	$(window).preloader({
		// preloader selector
		selector: '#preloader',
		// Preloader container holder
		type: 'window',
		// 'fade' or 'remove'
		removeType: 'fade',
		// fade duration
		fadeDuration: 150,
		// auto disimss after x milliseconds
		delay: 0
		
	});

    // starting of siteSticky
	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();
	// ending of siteSticky

	// Scrolling to top button
	// Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
	
	//Animate the scroll to top
    $('.back-to-top').on('click', function(event) {
        event.preventDefault(); 
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });

	// End of Scrolling buttom

	// scroll indicator
	$(window).on('scroll', function(event) {
        if($(this).scrollTop() > 50){
            $('.top_progress_container ').fadeIn(200)
        } else{
			$('.top_progress_container ').fadeOut(200)
        }
    });
	
	// When the user scrolls the page, execute myFunction 
	window.onscroll = function() {myFunction()};
        
	function myFunction() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		var scrolled = (winScroll / height) * 100;
		document.getElementById("myBar").style.width = scrolled + "%";
	}

	// End scroll indicator

	// sidebar open close js code
	let navLinks = document.querySelector(".nav-links");
	let menuOpenBtn = document.querySelector(".navbar .bx-menu");
	let menuCloseBtn = document.querySelector(".nav-links .bx-x");
	
	if(menuOpenBtn){
		menuOpenBtn.onclick = function() {
			navLinks.style.left = "0";
		}
	}
	if(menuCloseBtn){
		menuCloseBtn.onclick = function() {
			navLinks.style.left = "-100%";
		}
	}

	// sidebar submenu open close js code
	let categoriesArrow = document.querySelector(".categories-arrow");
	if(categoriesArrow){
		categoriesArrow.onclick = function() {
			navLinks.classList.toggle("show1");
		}
	}
	// let moreArrow = document.querySelector(".mmore-arrow");
	// console.log("moreArrow: ", moreArrow);
	// moreArrow.onclick = function() {
	// 	navLinks.classList.toggle("show2");
	// }

	// Form
	var contactForm = function() {

		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Submitting...';

					$.ajax({   	
						type: "POST",
						url: "php/send-email.php",
						data: $(form).serialize(),

						beforeSend: function() { 
							$submit.css('display', 'block').text(waitText);
						},
						success: function(msg) {
						if (msg == 'OK') {
							$('#form-message-warning').hide();
								setTimeout(function(){
								$('#contactForm').fadeOut();
							}, 1000);
								setTimeout(function(){
								$('#form-message-success').fadeIn();   
							}, 1400);
							
							} else {
							$('#form-message-warning').html(msg);
								$('#form-message-warning').fadeIn();
								$submit.css('display', 'none');
							}
						},
						error: function() {
							$('#form-message-warning').html("Something went wrong. Please try again.");
							$('#form-message-warning').fadeIn();
							$submit.css('display', 'none');
						}
					});    		
				}
				
			} );
		}
	};
	contactForm();
});