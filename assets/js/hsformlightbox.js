'use strict';

var unilyHsFormLightbox = {

    lightboxIdAttr: "data-hs-lightbox-id",
    openAttr: "data-hs-lightbox-open-id",
    closeAttr: "data-hs-lightbox-close-id",
    lightboxSelector: "[data-hs-lightbox-id]",
    openSelector: "[data-hs-lightbox-open-id]",
    containerSelector: ".c-lightbox__container",
    closeSelector: "[data-hs-lightbox-close-id]",
    trackBySessionAttr: "data-hs-lightbox-track-by-session",
    closeOnSubmissionAttr: "data-hs-lightbox-close-on-submission",
    hsFormLightboxIdAttr: "data-hs-form-lightbox-id",
    hsFormIdAttr: "data-hs-form-id",
    hsFormVideoSelector: "data-hs-form-video",
    
    init: function init() {

        $(document).on('click', unilyHsFormLightbox.openSelector, function (e) {
            e.preventDefault();
            var hsLightboxId = $(this).attr(unilyHsFormLightbox.openAttr);
            unilyHsFormLightbox.open(hsLightboxId);
        });

        $(document).on('click', unilyHsFormLightbox.closeSelector, function (e) {
            e.preventDefault();
            var hsLightboxId = $(this).attr(unilyHsFormLightbox.closeAttr);
            unilyHsFormLightbox.close(hsLightboxId);
        });

        $(document).on('click', unilyHsFormLightbox.containerSelector, function (e) {
            if (e.target == e.currentTarget) {
                e.preventDefault();
                var hsLightboxId = $(this).closest(unilyHsFormLightbox.lightboxSelector).attr(unilyHsFormLightbox.lightboxIdAttr);
                unilyHsFormLightbox.close(hsLightboxId);
            }
        });

        unilyHsFormLightbox.pinLightboxesToBody();
    },

    pinLightboxesToBody: function pinLightboxesToBody() {
        // This is done to prevent an overlap issue with the header on mobile
        $(unilyHsFormLightbox.lightboxSelector).prependTo('body');
    },

    open: function open(hsLightboxId) {

        if (unilyHsFormLightbox.isTrackBySession(hsLightboxId)) {

            var hsFormId = unilyHsFormLightbox.getHsFormId(hsLightboxId);
            $.ajax({
                method: 'GET',
                url: '/umbraco/surface/hsformlightbox/checksubmission/' + hsFormId,
                success: function success(data) {
                    if (data === 'True') { // If already submitted, play video straight... // TODO - Make this more generic, rather than hard coding to video playing
                        $(`[${unilyHsFormLightbox.hsFormLightboxIdAttr}='${hsLightboxId}']`).find(`a[${unilyHsFormLightbox.hsFormVideoSelector}]`).click();
                    } else { // ...otherwise show form
                        $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).addClass('opened');
                    }
                },
                error: function error() {
                    $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).addClass('opened');
                }
            });

        } else {
            $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).addClass('opened');
        }
    },

    close: function close(hsLightboxId) {
        $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).removeClass('opened');
    },

    confirmSubmission: function confirmSubmission(hsLightboxId) {

        if (unilyHsFormLightbox.isTrackBySession(hsLightboxId)) {

            var hsFormId = unilyHsFormLightbox.getHsFormId(hsLightboxId);
            $.ajax({
                method: 'POST',
                url: '/umbraco/surface/hsformlightbox/confirmsubmission/' + hsFormId
            });
        }

        if (unilyHsFormLightbox.isCloseOnSubmission(hsLightboxId)) {
            unilyHsFormLightbox.close(hsLightboxId);
        }
    },

    getHsFormId: function getHsFormId(hsLightboxId) {
        return $(`[${unilyHsFormLightbox.hsFormLightboxIdAttr}='${hsLightboxId}']`).attr(unilyHsFormLightbox.hsFormIdAttr);
    },

    isTrackBySession: function isTrackBySession(hsLightboxId) {
        return $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).attr(unilyHsFormLightbox.trackBySessionAttr) === 'true';
    },

    isCloseOnSubmission: function isCloseOnSubmission(hsLightboxId) {
        return $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).attr(unilyHsFormLightbox.closeOnSubmissionAttr) === 'true';
    }
};

$(document).ready(function () {
    unilyHsFormLightbox.init();
});
