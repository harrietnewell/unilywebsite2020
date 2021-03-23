'use strict';

var unilyHsFormLightbox = {

    lightboxIdAttr: "data-hs-lightbox-id",
    openAttr: "data-hs-lightbox-open-id",
    openSelector: "[data-hs-lightbox-open-id]",
    closeAttr: "data-hs-lightbox-close-id",
    closeSelector: "[data-hs-lightbox-close-id]",
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
    },

    open: function open(hsLightboxId) {
        var hsFormId = unilyHsFormLightbox.getHsFormId(hsLightboxId);

        $.ajax({
            method: 'GET',
            url: '/umbraco/surface/hsformlightbox/checksubmission/' + hsFormId,
            success: function success(data) {
                console.log(data);
                if (data === 'True') { // If already submitted, play video straight...
                    $(`[${unilyHsFormLightbox.hsFormLightboxIdAttr}='${hsLightboxId}']`).find(`a[${unilyHsFormLightbox.hsFormVideoSelector}]`).click();
                } else { // ...otherwise show form
                    $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).addClass('opened');
                }
            },
			error: function error() {
				$(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).addClass('opened');
			}
        });
    },

    close: function close(hsLightboxId) {
        $(`[${unilyHsFormLightbox.lightboxIdAttr}='${hsLightboxId}']`).removeClass('opened');
    },

    confirmSubmission: function confirmSubmit(hsLightboxId) {

        var hsFormId = unilyHsFormLightbox.getHsFormId(hsLightboxId);
        $.ajax({
            method: 'POST',
            url: '/umbraco/surface/hsformlightbox/confirmsubmission/' + hsFormId
        });

        unilyHsFormLightbox.close(hsLightboxId);
    },

    getHsFormId: function getHsFormId(hsLightboxId) {
        return $(`[${unilyHsFormLightbox.hsFormLightboxIdAttr}='${hsLightboxId}']`).attr(unilyHsFormLightbox.hsFormIdAttr);
    }
};

$(document).ready(function () {
    unilyHsFormLightbox.init();
});
