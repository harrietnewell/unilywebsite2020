'use strict';

var unilyVideoPopup = {

    autoPlaySelector: 'data-video-popup-auto-play',

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
                },
                close: function () {
                    $('body').removeClass('no-scroll'); // TODO - Centralise this - it is also in videopopup.js
                }

            }
        });

        if (unilyVideoPopup.isAutoPlay(element)) {
            $(element).click();
        }
    },

    isAutoPlay: function isAutoPlay(element) {
        var autoPlaySelector = $(element).attr(unilyVideoPopup.autoPlaySelector);
        return !(typeof autoPlaySelector === 'undefined' || autoPlaySelector === false);
    }
};