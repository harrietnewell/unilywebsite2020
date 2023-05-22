"use strict";

var unilyVideoCarousel = {

    init: function init() {

        $(".video-carousel .video-carousel-prev, .video-carousel .video-carousel-next, .video-carousel .video-carousel-index").click(function (e) {
            e.preventDefault();
            var targetIndex = $(this).attr("data-target-index");
            var carouselContainer = $(this).closest("section.video-carousel");
            updateCarousel(targetIndex, carouselContainer);
        });

        // add swipe to all container instances on page
        $("section.video-carousel").each(function (idx, container) {
            var hammer = new Hammer(container);
            hammer.on('swipeleft', function (e) {
                e.preventDefault();
                updateCarousel("next", $(container));
            });

            hammer.on('swiperight', function (e) {
                e.preventDefault();
                updateCarousel("prev", $(container));
            });
        });

        function updateCarousel(targetIndex, carouselContainer) {

            var currentActiveItem = carouselContainer.children(".carousel-container:visible");

            if (targetIndex === "prev" || targetIndex === "next") {
                var itemCount = carouselContainer.children(".carousel-container").length;
                var currentActiveIndex = parseInt(currentActiveItem.attr('data-index'));

                if (targetIndex === "prev") {
                    targetIndex = currentActiveIndex == 0 ? itemCount - 1 : currentActiveIndex - 1;
                } else if (targetIndex === "next") {
                    targetIndex = currentActiveIndex == itemCount - 1 ? 0 : currentActiveIndex + 1;
                }
            }

            var targetItem = carouselContainer.children(".carousel-container[data-index='" + targetIndex + "']");
            var targetItemVideo = targetItem.find("video")[0];

            // hide currently playing video...
            $(currentActiveItem).hide();

            // ...and start start video from beginning (and show)
            $(targetItemVideo)[0].currentTime = 0;
            $(targetItem).show();

            carouselContainer.find(".video-carousel-index").removeClass('active');
            carouselContainer.find(".video-carousel-index[data-target-index='" + targetIndex + "']").addClass('active');
        }
    }
};

unilyVideoCarousel.init();
