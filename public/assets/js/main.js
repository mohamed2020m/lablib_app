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

	// starting of siteMenuClone
	var siteMenuClone = function() {

		$('.js-clone-singUpLoginBtns').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-singUpLoginBtns-wrap').appendTo('.site-mobile-menu-body');
		});

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});

		setTimeout(function() {
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function(){
			var $this = $(this);
				$this.prepend('<span class="arrow-collapse collapsed">');
				$this.find('.arrow-collapse').attr({
					'data-toggle' : 'collapse',
					'data-target' : '#collapseItem' + counter,
				});
				$this.find('> ul').attr({
					'class' : 'collapse',
					'id' : 'collapseItem' + counter,
				});
				counter++;
			});
		}, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
			var $this = $(this);
			if ( $this.closest('li').find('.collapse').hasClass('show') ) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();  
			
		});

		$(window).resize(function() {
			var $this = $(this),
			w = $this.width();
			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
		var container = $(".site-mobile-menu");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
			}
		}
		});
	}; 

	siteMenuClone();

	// Ending of siteMenuClone

	// search-box open close js code
	let navbar = document.querySelector(".navbar");
	let searchBox = document.querySelector(".search-box .bx-search");
	// let searchBoxCancel = document.querySelector(".search-box .bx-x");

	searchBox.addEventListener("click", ()=>{
	navbar.classList.toggle("showInput");
	if(navbar.classList.contains("showInput")){
		searchBox.classList.replace("bx-search" ,"bx-x");
	}else {
		searchBox.classList.replace("bx-x" ,"bx-search");
	}
	});

	// sidebar open close js code
	let app = document.querySelector(".App");
	let navLinks = document.querySelector(".nav-links");
	let menuOpenBtn = document.querySelector(".navbar .bx-menu");
	let menuCloseBtn = document.querySelector(".nav-links .bx-x");
		menuOpenBtn.onclick = function() {
		navLinks.style.left = "0";
		app.style.BackgroundColor = 'rgba(89, 89, 89, 0.3)'
	}
		menuCloseBtn.onclick = function() {
		navLinks.style.left = "-100%";
	}


	// sidebar submenu open close js code
	let categoriesArrow = document.querySelector(".categories-arrow");
	categoriesArrow.onclick = function() {
		navLinks.classList.toggle("show1");
	}
	let moreArrow = document.querySelector(".more-arrow");
	moreArrow.onclick = function() {
		navLinks.classList.toggle("show2");
	}
	// let jsArrow = document.querySelector(".js-arrow");
	// 	jsArrow.onclick = function() {
	// 	navLinks.classList.toggle("show3");
	// }

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
});