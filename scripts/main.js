/* ====================================================================================================================
    Consolidated UI scripts
==================================================================================================================== */

$(document).ready(function(){

	/* ====================================================================================================================
        Reload page on resize, to reset responsive elements
    ==================================================================================================================== */

	var winWidth = $(window).width();

	function responsiveresize(){
		window.location.reload();
	};
	var resizeTimer;
	$(window).resize(function() {
		//New height and width
		var winNewWidth = $(window).width();
		// compare the new height and width with old one
		if(winWidth!=winNewWidth) {
			//Reload after timeout
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(responsiveresize, 100);
		}
		//Update the width and height
		winWidth = winNewWidth;

	});

	/* ====================================================================================================================
        Mobile navigation
    ==================================================================================================================== */

	// Load on small screens only
	if(Modernizr.mq('screen and (max-width:747px)')) {
		// Add toggle buttons
		$(".nav-container").prepend("<div class=\"nav-toggle\"><img src=\"images/icon-nav.svg\" alt=\"Menu\" class=\"menu-icon icon\"> Menu</div>");
		// Toggle button
		$(".nav-toggle").click(function(){
			$(this).toggleClass("active");
			if ($(this).hasClass("active")) {
				$(".menu-icon").attr("src", "images/icon-close.svg");
			} else {
				$(".menu-icon").attr("src", "images/icon-nav.svg");
			}
			$(".site-nav").slideToggle();
		});
	}

	/* ====================================================================================================================
        Anchor smooth scroll
		http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery
    ==================================================================================================================== */

	$('a[href^="#"]').on('click',function (e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});
});

/* ====================================================================================================================
	Sticky header
==================================================================================================================== */

function stickyElement(element, sticky_navigation_offset_top) {
	// Load on larger screens only
	if(Modernizr.mq('screen and (min-width:748px)')) {
		$(".page-wrapper").css("padding-top", $(".site-header").height());
		// our function that decides weather the navigation bar should have "fixed" css position or not.
		var sticky_navigation = function(){
			var scroll_top = $(window).scrollTop(); // our current vertical position from the top
			// if we've scrolled more than the navigation, toggle its class
			if (scroll_top > sticky_navigation_offset_top) {
				$(element).addClass('stuck');
			} else {
				$(element).removeClass('stuck');
			}
		};    // run our function on load
		sticky_navigation();
		// and run it again every time you scroll
		$(window).scroll(function() {
			sticky_navigation();
		});
	}
}
$(function() {
	/* Make header sticky */
	var header_offset = $('.site-header').height() * 1.5;
	stickyElement('.site-header', header_offset);
});

/* ====================================================================================================================
	Google API map
==================================================================================================================== */

function initMap() {
	// Custom map styles
	var customMapType = new google.maps.StyledMapType([
		{
			stylers: [
				{hue: '#ece7e5'},
				{visibility: 'simplified'}
			]
		},
		{
			featureType: 'landscape',
			stylers: [{color: '#ece7e5'}]
		},
		{
			featureType: 'road',
			elementType: 'geometry.stroke',
			stylers: [{color: '#FFFFFF'}]
		},
		{
			featureType: 'road',
			elementType: 'labels.text',
			stylers: [{color: '#b2a095'}]
		},
		{
			featureType: 'poi',
			stylers: [{visibility: 'off'}]
		},
		{
			featureType: 'transit',
			elementType: 'labels.text',
			stylers: [{color: '#b2a095'}]
		},
		{
			featureType: 'water',
			stylers: [{color: '#cce9ed'}]
		}
		], {
			name: 'Custom Style'
	});
	var customMapTypeId = 'custom_style';
	// Create map
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 41.891434, lng: -87.631227},
		zoom: 15,
		scrollwheel: false,
		draggable: false
	});
	// Apply custom styles to the map
	map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);
	// Create infowindow
	var infowindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(-12, 0) // Ofset x position so pointer is centered above the custom marker
	});
	// Get place info
	var service = new google.maps.places.PlacesService(map);
	service.getDetails({
		placeId: 'ChIJ7cv00DwsDogRAMDACa2m4K8'
	}, function(place, status) {
		// If place info loads, populate marker and infowindow
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			// Custom marker image
			var image = {
				url: 'images/map-marker.png',
				size: new google.maps.Size(48, 54), // Source image size
				scaledSize: new google.maps.Size(24, 27), // Scaled 50% size for retina
				origin: new google.maps.Point(0, 0), // Origin is top left
				anchor: new google.maps.Point(12, 13) // Anchor at image center
			};
			var marker = new google.maps.Marker({
				icon: image,
				map: map,
				position: {lat: 41.891434, lng: -87.631227},
				title: "TAGS! Pet Care Club"
			});
			// Set infowindow content
			infowindow.setContent('<div><strong>TAGS! Pet Care Club</strong><br><a href="https://goo.gl/maps/EfoZwGC4yuT2" target="_blank">View larger map</a></div>');
			infowindow.open(map, marker);
			// Open infowindow on marker click
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, this);
			});
		}
	});
}
