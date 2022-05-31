'use strict';

var unilyPushPage = {

    pushPageLinkSelector: '[data-push-page-link]',
    init: function init() { 

        $(unilyPushPage.pushPageLinkSelector).click(function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
    }
}

unilyPushPage.init();
