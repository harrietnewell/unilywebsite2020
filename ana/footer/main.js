$( document ).ready(function() {
    
    /** Start JS for the lightbox **/
    
    // Close popups
    $(document).on('click', '[data-type="close"]', function (e) {
        e.preventDefault();
        $('.'+$(this).attr('data-id')).removeClass('opened');
    });
    // Open popup popup-01
    $(document).on('click', '[data-type="popup"]', function (e) {
        e.preventDefault();
        $('.'+$(this).attr('data-id')).addClass('opened');
    });
    
    $('#download-now-open-another-popup').on('click', function (){
        $('.popup-01').removeClass('opened');
        $('#video-button').trigger('click');
    });
    
    /** End JS for the lightbox **/
    
    
    /** Start JS for the Header (not needed for now) **/
    
    // var initialScrollDistance = 0;
    // $(window).on("scroll", function () {
    //     if ($('header.c-head').hasClass('c-head--subnav')) {
    //         // initialScrollDistance = $(window).scrollTop();
    //         if (Math.abs(initialScrollDistance - $(window).scrollTop()) > 150) {
    //             // closeDropdown();
    //         }
    //     } else {
    //         initialScrollDistance = $(window).scrollTop();
    //     }
    //
    // });
    
    
    /* Footer content reorganization */
    
    
    wrap();
    $(window).on('resize', function(){
        wrap();
    });
    
    function wrap() {
        if ($(window).width() > 767 ) {
            if (!$('.wrap-unwrap__child').parent().hasClass('wrap-unwrap')) {
                $( '.wrap-unwrap__child' ).wrapAll( "<div class='wrap-unwrap' />");
            }
        } else {
            $('.wrap-unwrap').contents().unwrap();
        }
    }
});