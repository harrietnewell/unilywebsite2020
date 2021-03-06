'use strict';

var unilyApp = {

    init: function init() {

        // Mobile Navigation Icon

        $('.js-nav-toggle').on('click', function () {
            handleNavToggle();
        });
        function handleNavToggle() {
            if ($('.c-head__navigation').hasClass('active')) {
                $('.c-head__navigation').removeClass('active');
                $('body').removeClass('nav-active');

                if ($('.c-nav__subnav').hasClass('active')) {
                    $('.c-nav__subnav').removeClass('active');
                }
                if ($('.c-subnav__link--more').hasClass('active')) {
                    $('.c-subnav__link--more').removeClass('active').next().removeClass('active');
                }
            } else {
                $('.c-head__navigation').addClass('active');
                $('body').addClass('nav-active');
            }
            return false;
        }
        // Mobile Secondary Navigation

        $(window).resize(function () {
            if (window.matchMedia('(max-width: 999px)').matches) {
                $('.js-subnav-link').on('click', function () {
                    $(this).next().addClass('active');
                    return false;
                });
            }
        }).resize();

        $('.js-subnav-back').on('click', function () {
            $(this).parent().removeClass('active');
            $('.c-subnav, .c-subnav__link').removeClass('active');
            return false;
        });

        // Search

        $('.js-link-search').on('click', function () {
            $('.c-search').addClass('active');
            $('.c-head').addClass('c-head--search');
            $('.c-search__field').focus();
            return false; //event.stopPropagation();
        });

        function closeSearch() {
            $('.c-search').removeClass('active');
            $('.c-head').removeClass('c-head--search');
            $('.c-head').addClass('c-head--search-close').delay(1100).queue(function () {
                $(this).removeClass('c-head--search-close').dequeue();
            });
        }

        $('.js-search-close').on('click', function () {
            closeSearch();
        });

        // Desktop Dropdown

        $('.js-dropdown-link').on('mouseenter', function () {
            var dataId = $(this).attr("data-link");
            var activeLink = $(this);

            this.interval = setTimeout(function () {
                $('.c-nav__link').removeClass('active');
                activeLink.addClass('active');
                $('.c-head').addClass('c-head--subnav');
                $('.c-dropdown__wrap').removeClass('active');
                $('.c-dropdown__wrap--' + dataId).addClass('active');
            }, 300);
        }).on('mouseleave', function () {
            clearTimeout(this.interval);
        });

        $('.c-dropdown__wrap a, .c-dropdown__wrap .c-subscribe__form').on('click', function () {
            event.stopPropagation();
        });

        function closeDropdown() {
            if ($('.c-dropdown__wrap').hasClass('active')) {
                $('.c-dropdown__wrap').removeClass('active');
                $('.c-head').removeClass('c-head--subnav');
                $('.c-nav__link').removeClass('active');
            }
            if ($('.c-more__heading').hasClass('active')) {
                $('.c-more__heading').removeClass('active');
                $('.c-more__container').removeClass('active');
            }
        }

        $('.js-nav-link, .js-link-search, .c-nav__btn, .c-logo__img').on('mouseenter', function () {
            closeDropdown();
        });

        $(window).on('blur scroll', function () {
            closeDropdown();
        });

        $('body').on('mouseleave', function () {
            closeDropdown();
        });

        // On Document Click

        $(document).on('click', function (event) {

            closeDropdown();

            if (!$(event.target).closest('.c-search').length && $('.c-search.active').length) {
                closeSearch();
            }
        });

        // Navigation More Links

        $('.js-subnav-more').on('click', function () {
            $(this).toggleClass('active').next().toggleClass('active');
            return false;
        });

        // Dropdown More Links

        $('.js-link-more').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').next().removeClass('active');
            } else {
                $('.js-link-more').removeClass('active').next().removeClass('active');
                $(this).addClass('active').next().addClass('active');
                new SimpleBar($(this).next()[0]);
            }
            return false;
        });

        // Popular Links Footer

        $('.js-link-popular').on('click', function () {
            $('.c-popular__row').toggleClass('active');
            $(this).toggleClass('active');
            return false;
        });

        // Transparent Head

        if ($('.c-head--transparent').length) {
            addTransparency();
            $(window).scroll(function () {
                addTransparency();
            });
        }
        function addTransparency() {
            if ($(document).scrollTop() > 100) {
                $('.c-head').addClass('scrolling');
            } else {
                $('.c-head').removeClass('scrolling');
            }
        }

        // Custom Scrollbars (Using SimpleBar)

        if ($('.c-testimonials__wrap').length) {
            new SimpleBar($('.c-testimonials__wrap')[0]);
        }

        
        /** New scroll **/
        // TODO - Combine this with code in pillarpagenav.js, repetetive
        if ($('.scroll-to-section').length) {

            $('.scroll-to-section li.js-nav-link a').on('click', function (e) {

                handleNavToggle();
                //$('.scroll-to-section li.js-nav-link a').removeClass('active');
                //$(this).addClass('active');

                const $target = $($(this).attr('href'));

                if ($target.length > 0) { // item with that id exists
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: $target.offset().top - 50 // Scroll to this location.
                    }, {
                        duration: 400,
                        step: function (now, fx) {
                            //  location will change as images etc. are lazy loaded
                            //  Where is the target now located on the page?
                            let realPos = $target.offset().top - 50;
                            if (fx.end !== realPos) {
                                fx.end = realPos;
                            }
                        },
                    });
                }
            });

            // TODO - Delete? Removed at request of Chris Saville (29/06/2021) as dynamic highlighting no longer wn
            //$(window).on('scroll', function () {
            //    $('.id-section').each(function () {
            //        if ($(window).scrollTop() >= $(this).offset().top - 51) {
            //            var id = $(this).attr('id');
            //            $('.scroll-to-section li.js-nav-link a').removeClass('active');
            //            $('.scroll-to-section li.js-nav-link a[href=\\#' + id + ']').addClass('active');
            //        }
            //    });
            //});
        }

        // Insights horizontal navigation

        if ($('.c-category-nav__container').length) {

            $(window).resize(function () {

                if (window.matchMedia('(max-width: 677px)').matches) {

                    var scrollContainer = $('.c-category-nav__container').width();
                    var scrollArea = $('.c-category-nav__list').get(0).scrollWidth;

                    if (scrollContainer < scrollArea) {
                        $('.c-category-nav__container').parent().addClass('c-category-nav--right');
                    } else {
                        $('.c-category-nav__container').parent().removeClass('c-category-nav--right');
                    }

                    $('.c-category-nav__container').scroll(function () {

                        var scrollContainer = $(this).width(); //get the one specific to this
                        var scrollArea = $(this).children().get(0).scrollWidth;
                        var scrollOver = scrollArea - scrollContainer;

                        if ($(this).scrollLeft() >= 1) {
                            $(this).parent().addClass('c-category-nav--left');
                        } else {
                            $(this).parent().removeClass('c-category-nav--left');
                        }

                        if ($(this).scrollLeft() == scrollOver) {
                            $(this).parent().removeClass('c-category-nav--right');
                        } else {
                            $(this).parent().addClass('c-category-nav--right');
                        }
                    });
                }

                var sideNavElement = $('.c-category-nav--side .c-category-nav__container')[0];
                if (sideNavElement && window.matchMedia('(min-width: 678px)').matches) {
                    var sideNavBar = new SimpleBar(sideNavElement);
                }
            }).resize();
        }

        // Event sidebar form move for mobiles

        if ($('.c-article__form').length) {

            $(window).resize(function () {

                if (!$('.c-content > .c-article__form').length && window.matchMedia('(max-width: 767px)').matches) {
                    var articleForm = $('.c-article__form').detach();
                    $(".c-article__media").after(articleForm);
                } else if (!$('.c-content__side .c-article__form').length && window.matchMedia('(min-width: 768px)').matches) {
                    var articleForm = $('.c-article__form').detach();
                    $(".c-content__side").prepend(articleForm);
                }
            }).resize();
        }

        // Footer nav wrap

        $(window).on('resize', function () {

            if ($(window).width() > 767) {
                if (!$('.wrap-unwrap__child').parent().hasClass('wrap-unwrap')) {
                    $('.wrap-unwrap__child').wrapAll("<div class='wrap-unwrap' />");
                }
            } else {
                $('.wrap-unwrap').contents().unwrap();
            }

        }).resize();

    }
}

unilyApp.init();

// NOTE - This script is used in the template https://harrietnewell.github.io/unilywebsite2020/card-design.html, 
// which is not used in the live site as of yet (16/05/2021)
// Display svg when document is loaded (e.g. svg after font is loaded)
//document.fonts.ready.then(function() {
//    $('.display-after-font').show();
//});

