'use strict';

var unilyVideoPopup = {

    init: function init(element) {

        $(element).magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 200,
            preloader: true,
            fixedContentPos: true,
            callbacks: {
                open: function () {
                    var currentPopup = $.magnificPopup.instance;
                    var customClass = currentPopup.st.el.attr('mfp-custom-class');
                    $(currentPopup.contentContainer).addClass(customClass);
                }
            }
        });
    }
};