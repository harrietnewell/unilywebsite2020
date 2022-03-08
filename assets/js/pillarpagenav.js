'use strict';

var unilyPillarPageNav = {

    pillarPageNavSelector: '[data-pillar-page-nav]',
    scrollPositionOffset: 115,
    init: function init() { 

        $(unilyPillarPageNav.pillarPageNavSelector + ' a').on('click', function () {

            const $target = $($(this).attr('href'));
            $('html, body').animate({
                scrollTop: $target.offset().top - unilyPillarPageNav.scrollPositionOffset
            }, {
                duration: 1000, // Allow for lazy loading to complete
                step: (now, fx) => {

                    //  location will change as images etc. are lazy loaded
                    //  Where is the target now located on the page?
                    let realPos = $target.offset().top - unilyPillarPageNav.scrollPositionOffset;
                    if (fx.end !== realPos) {
                        fx.end = realPos;
                    }
                }
            });
        });
    }
}

unilyPillarPageNav.init();
