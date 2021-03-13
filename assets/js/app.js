$(document).ready(function() {


  // Mobile Navigation Icon

  $('.js-nav-toggle').on('click', function() {
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
  });


  // Mobile Secondary Navigation

  $(window).resize(function() {
    if (window.matchMedia('(max-width: 999px)').matches) {
      $('.js-subnav-link').on('click', function() {
        $(this).next().addClass('active');
        return false;
      });
    }
  }).resize();

  $('.js-subnav-back').on('click', function() {
    $(this).parent().removeClass('active');
    $('.c-subnav, .c-subnav__link').removeClass('active');
    return false;
  });


  // Search
 
  $('.js-link-search').on('click', function() {
    $('.c-search').addClass('active');
    $('.c-head').addClass('c-head--search');
	$('.c-search__field').focus();
    return false; //event.stopPropagation();
  });

  function closeSearch() {
    $('.c-search').removeClass('active');
    $('.c-head').removeClass('c-head--search');
  $('.c-head').addClass('c-head--search-close').delay(1100).queue(function(){
      $(this).removeClass('c-head--search-close').dequeue();
    });
  }

  $('.js-search-close').on('click', function() {
    closeSearch(); 
  });
 

  // Desktop Dropdown

  $('.js-dropdown-link').on('mouseenter', function() {
    var dataId = $(this).attr("data-link");
    var activeLink = $(this);

    this.interval = setTimeout(function(){
      $('.c-nav__link').removeClass('active');
      activeLink.addClass('active');
      $('.c-head').addClass('c-head--subnav');
      $('.c-dropdown__wrap').removeClass('active')
      $('.c-dropdown__wrap--'+dataId).addClass('active');
    }, 300);   
    }).on('mouseleave',function() {
      clearTimeout(this.interval);
  });

  $('.c-dropdown__wrap a, .c-dropdown__wrap .c-subscribe__form').on('click', function() {
    event.stopPropagation();
  });

  function closeDropdown(){
    if ($('.c-dropdown__wrap').hasClass('active')) {
      $('.c-dropdown__wrap').removeClass('active')
      $('.c-head').removeClass('c-head--subnav');
      $('.c-nav__link').removeClass('active');
    }
    if ($('.c-more__heading').hasClass('active')) {
      $('.c-more__heading').removeClass('active');
      $('.c-more__container').removeClass('active');
    }
  }

  $('.js-nav-link, .js-link-search, .c-nav__btn, .c-logo__img').on('mouseenter', function() {
    closeDropdown();
  });

  $(window).on('blur scroll', function() {
    closeDropdown();
  });

  $('body').on('mouseleave', function() {
    closeDropdown();
  });


  // On Document Click

  $(document).on('click', function(event) {

    closeDropdown();

    if ( !$(event.target).closest('.c-search').length && $('.c-search.active').length ) {
      closeSearch();
    }

  });


  // Navigation More Links

  $('.js-subnav-more').on('click', function() {
    $(this).toggleClass('active').next().toggleClass('active');
    return false;
  });

  // Dropdown More Links

  $('.js-link-more').on('click', function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').next().removeClass('active');
    } else {
      $(this).addClass('active').next().addClass('active');
      new SimpleBar($(this).next()[0]);
    }
    return false;
  });


  // Popular Links Footer

  $('.js-link-popular').on('click', function() {
    $('.c-popular__row').toggleClass('active');
    $(this).toggleClass('active');
    return false;
  });


  //Page Alert

  if($('.c-alert').length) {
    $(window).resize(function() {
      if($('.c-alert:visible').length) {
        var alertHeight = $('.c-alert').outerHeight();
        $('body').css('padding-top', alertHeight);
      }
    }).resize();
  }

  $('.js-alert-close').on('click', function() {
    $(this).parent().hide();
    $('body').css('padding-top', '0');
  });


  // Transparent Head

  if($('.c-head--transparent').length) {
    $(window).scroll(function() {
      if ($(document).scrollTop() > 100) {
        $('.c-head').addClass('scrolling');
      }
      else {
        $('.c-head').removeClass('scrolling');
      }
    });
  }



  // Loading Screen

  setTimeout(function(){
    $('.c-loading').addClass('hidden');
  }, 100);


  // Custom Scrollbars (Using SimpleBar)

   if($('.c-articles__wrap').length) {
    new SimpleBar($('.c-articles__wrap')[0]);
  } 

  if($('.c-testimonials__wrap').length) {
    new SimpleBar($('.c-testimonials__wrap')[0]);
  }

  // Pillar Page Scroll and Highlight

  if ( $('.js-category-nav').length ) {

    $(window).resize(function() {

      $('.js-category-nav a').on('click', function() {
        $('.js-category-nav a').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 115
        }, 400);
      });

    }).resize();

    $(window).on('scroll', function() {
      $('.c-category-nav__content').each(function() {
        if($(window).scrollTop() >= ($(this).offset().top - 115)) {
          var id = $(this).attr('id');
          $('.js-category-nav a').removeClass('active');
          $('.js-category-nav a[href=\\#'+ id +']').addClass('active');
        }
      });
    });

  }


// Cookie
  
 /* if($('#onetrust-banner-sdk').length) {
	  ('#onetrust-banner-sdk').wrap('div class="c-cookie"></div>');
  }
  */
  if ($(".c-alert").length > 1){

   if($('#onetrust-banner-sdk').length && $('.c-alert').length && (window.matchMedia('screen and (min-width: 1028px)').matches))  {
    $(window).resize(function() {
      if($('#onetrust-banner-sdk:visible').length ) {
        var alertHeight = $('.c-alert').outerHeight();
        var headHeight =  $('.c-head__wrap').outerHeight();
        $('#onetrust-banner-sdk').css('min-height', alertHeight+headHeight);
      }
    }).resize(),
	$('#onetrust-consent-sdk').appendTo(".c-head");
  }
  } else {
	  
	$(window).resize(function() {
      if($('#onetrust-banner-sdk:visible').length ) {
        var headHeight =  $('.c-head__wrap').outerHeight();
        $('#onetrust-banner-sdk').css('min-height',headHeight);
      }
    }).resize(),
	$('#onetrust-consent-sdk').appendTo(".c-head");  
	  
  }
  
  
//$('#onetrust-consent-sdk').appendTo(".c-head");



  // Insights horizontal navigation

  if($('.c-category-nav__container').length) {

    $(window).resize(function() {

      if (window.matchMedia('(max-width: 677px)').matches) {

        var scrollContainer = $('.c-category-nav__container').width();
        var scrollArea = $('.c-category-nav__list').get(0).scrollWidth;
  
        if (scrollContainer < scrollArea) {
          $('.c-category-nav__container').parent().addClass('c-category-nav--right');
        } else {
          $('.c-category-nav__container').parent().removeClass('c-category-nav--right');
        }
  
        $('.c-category-nav__container').scroll(function(){
  
          var scrollContainer = $(this).width(); //get the one specific to this
          var scrollArea = $(this).children().get(0).scrollWidth;
          var scrollOver = scrollArea-scrollContainer;

  
          if($(this).scrollLeft() >= 1){
            $(this).parent().addClass('c-category-nav--left');
          } else {
            $(this).parent().removeClass('c-category-nav--left');
          }
  
          if($(this).scrollLeft() == scrollOver) {
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

  if($('.c-article__form').length) {

    $(window).resize(function() {

      if(!$('.c-article > .c-article__form').length && window.matchMedia('(max-width: 767px)').matches) {
        var articleForm = $('.c-article__form').detach();
        $(".c-article__media").after(articleForm);
      } else if(!$('.c-article__side .c-article__form').length && window.matchMedia('(min-width: 768px)').matches) {
        var articleForm = $('.c-article__form').detach();
        $(".c-article__side").prepend(articleForm);
      }

    }).resize();

  }

});