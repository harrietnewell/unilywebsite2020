var unilyNavigation = {

    bannerSelector: '.c-alert',

    init: function init() {
        $(window).on("scroll", unilyNavigation.setupStickyNav);
    },

    setupStickyNav: function setupStickyNav() {

        // remove setupStickyNav event from scroll, only necessary to fire once
        $(window).off("scroll", unilyNavigation.setupStickyNav);

        // add sticky-header class to body
        $("body").addClass("sticky-header");

        // finally add dynamic padding adjustment to body 
        // in the case of an announcement banner being present
        $(window).resize(function () {
            if ($(unilyNavigation.bannerSelector + ':visible').length) {
                var alertHeight = $(unilyNavigation.bannerSelector).outerHeight();
                $('body').css('padding-top', alertHeight);
            }
        }).resize();
    }

}

unilyNavigation.init();