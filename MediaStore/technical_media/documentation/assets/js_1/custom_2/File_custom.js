$(document).ready(function(){

	

    $('.main-menu li a span').on('click', function(){
        $('.main-menu li a span').removeClass('current');
        $(this).addClass('current');
    });


    var nav = $('.main-menu');
    //nav.find('.menu-item').click(function(e){
    //    //$(this).parent('li').toggleClass('active');
    //    //$(this).siblings('.sub-menu').slideToggle();
    //    e.preventDefault();
//    }
//);

    nav.find('.target-article').click(function(){
        var id;
        nav.find('.target-article').removeClass('active');
        $(this).addClass('active');
        id = $('.page-content').children($(this).attr('href'));
        id.fadeIn().siblings('.hentry').hide();
    });

    // show 1st article on load
    $('.page-content .hentry').first().show();

    //
    /* Enable the functionality of directly linking a section in URL */
    if ( jQuery().url ) {
        var url = $.url(); // parse the active page URL
        var target_id = url.attr('fragment');   // get the #target-id from URL
        if( target_id ){
            nav.find('.target-article').removeClass('active'); // remove active class from any other sub menu items
            var target_section = $( '#'+target_id );    // find related section
            target_section.fadeIn().siblings('.hentry').hide(); // display related section and hide others
            var sub_menu_item = $("a.target-article[href*=#"+target_id+"]"); // find related sub menu item
            sub_menu_item.addClass('active');   // add active class to sub menu item
            var target_sub_menu = sub_menu_item.closest('ul.sub-menu'); // find parent sub menu for target sub menu item
            target_sub_menu.slideDown();    // display sub menu
            target_sub_menu.parent('li').addClass('active');    // find parent main menu item and add active class to it
        }

    }
	
  if(jQuery('.hentry').length){
   windowHeight = jQuery(window).innerHeight();
   jQuery('.hentry').css('min-height', windowHeight);
  }


});


 jQuery(window).on('resize', function () {
	 
	if(jQuery('.hentry').length){
		windowHeight = jQuery(window).innerHeight();
		jQuery('.hentry').css('min-height', windowHeight);
	}
  
 });