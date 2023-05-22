'use strict';

var unilyInsightsCarousel = {

    init: function init(element) {

        var carouselWrap = $(element);

        element.nodeId = carouselWrap.attr('data-node-id');
        element.currentCulture = carouselWrap.attr('data-current-culture');
        element.page = 1;

        var tagIdsStr = carouselWrap.attr('data-tag-ids');
        if (tagIdsStr)
            element.tagIds = tagIdsStr.split(',').map(Number);

        var typeIdsStr = carouselWrap.attr('data-type-ids');
        if (typeIdsStr)
            element.typeIds = typeIdsStr.split(',').map(Number);

        var cacheKey = carouselWrap.attr('data-cache-key');
        if (cacheKey)
            element.cacheKey = cacheKey;

        var simplebar = new SimpleBar(carouselWrap[0]);
        var scrollElement = simplebar.getScrollElement();
        var scrollWidth = $(scrollElement)[0].scrollWidth;
        var scrollEndThreshold = 200;
        var itemsParent = carouselWrap.find("li.c-articles__item").parent();

        element.isLoading = false;
        element.isEndOfData = false;

        scrollElement.addEventListener('scroll', function () {

            if ($(scrollElement).scrollLeft() + $(scrollElement).innerWidth() >= scrollWidth - scrollEndThreshold && !element.isLoading && !element.isEndOfData) {

                element.isLoading = true;

                $.ajax({
                    method: 'POST',
                    url: '/umbraco/api/insights/GetWhereNextContent',
                    data: {
                        nodeId: element.nodeId,
                        page: element.page,
                        currentCulture: element.currentCulture,
                        ignorePageTags: true,
                        cacheKey: element.cacheKey,
                        tagIds: element.tagIds,
                        typeIds: element.typeIds
                    },
                    success: function success(data) {
                        if (data) {
                            itemsParent.append($($(data)));
                            unilyLazyLoading.refresh();
                            scrollWidth = $(scrollElement)[0].scrollWidth;
                            element.page++;
                            element.isLoading = false;
                        } else {
                            element.isEndOfData = true;
                        }
                    }
                });
            }
        });
    }
};
