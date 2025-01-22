$(function(){
	jQuery('#full-top').click(function(){
		jQuery('html, body').animate({scrollTop:0}, 'slow');
		return false;
	});

	jQuery('#full-btm').click(function(){
		jQuery('html, body').animate({scrollTop:jQuery(document).height()}, 'slow');
		return false;
	});
	jQuery('#back').click(function(){
		// window.history.back();
		window.location.href = '../liotw.html#secondPage';
		return false;
	});
	jQuery('#backBike').click(function(){
		// window.history.back();
		window.location.href = '../liotw.html#5thPage';
		return false;
	});
});

