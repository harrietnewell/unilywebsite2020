'use strict';

var unilyPushPage = {

    pushPageLinkSelector: '[data-push-page-link]',
    pushPageBlockSelector: '#push-page-block',
    init: function init() { 

        $(unilyPushPage.pushPageLinkSelector).click(function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $(unilyPushPage.pushPageBlockSelector).find('input[type="text"],input[type="email"]')[0].focus();
        });
    }
}

unilyPushPage.init();
