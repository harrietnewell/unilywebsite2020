$( document ).ready(function() {
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
});