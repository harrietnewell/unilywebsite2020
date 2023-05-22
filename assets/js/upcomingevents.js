﻿'use strict';

var unilyUpcomingEvents = {

    init: function init(element) {

        var carouselWrap = $(element);

        var nodeId = carouselWrap.attr('data-node-id');
        var currentCulture = carouselWrap.attr('data-current-culture');
        var page = 1;
        var simplebar = new SimpleBar(carouselWrap[0]);
        var scrollElement = simplebar.getScrollElement();
        var scrollWidth = $(scrollElement)[0].scrollWidth;
        var scrollEndThreshold = 200;
        var itemsParent = carouselWrap.find("li.w-upcoming-events-item").parent();

        var isLoading = false;
        var isEndOfData = false;

        scrollElement.addEventListener('scroll', function () {

            if ($(scrollElement).scrollLeft() + $(scrollElement).innerWidth() >= scrollWidth - scrollEndThreshold && !isLoading && !isEndOfData) {

                isLoading = true;

                $.ajax({
                    method: 'GET',
                    url: '/umbraco/api/events/GetUpcomingEventsContent?nodeId=' + nodeId + '&page=' + page + '&currentCulture=' + currentCulture,
                    success: function success(data) {
                        if (data) {
                            itemsParent.append($($(data)));
                            unilyLazyLoading.refresh();
                            scrollWidth = $(scrollElement)[0].scrollWidth;
                            page++;
                            isLoading = false;
                        } else {
                            isEndOfData = true;
                        }
                    }
                });
            }
        });
    }
};
