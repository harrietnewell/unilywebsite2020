$(document).ready(function (){
    
    // Open this video in modal
    $(document).on('click', '.open-video-modal', function (e) {
        e.preventDefault();
        var currentVideo = $(this).find('video');
        var videoModal = $(this).closest('.video-section-wrapper').find('.video-section__modal');
        var video = videoModal.find('video');
    
        currentVideo.prop('muted', true);
        
        videoModal.addClass('open');
        video.prop('muted', false);
        // video.get(0).currentTime = currentVideo.get(0).currentTime;
        video.get(0).play();
        // console.log('aaa'+currentVideo.get(0).currentTime);
        
    })
    
    // Close modal and switch playing video
    $(document).on('click', '.video-section__modal-close', function (e) {
        e.preventDefault();
        var mainVideo = $(this).closest('.video-section-wrapper').find('.video-section__cover').find('video');
        var videoModal = $(this).closest('.video-section__modal');
        var video = videoModal.find('video');
    
        // mainVideo.prop('muted', false);
        
        videoModal.removeClass('open');
        video.prop('muted', true);
        
    })
});
// if( $("video").prop('muted') )
//     if( $("video").prop('muted', true) )