import '../js/library/jquery.lazyload.js';
$(function() {
    $("img.lazy").lazyload({
        effect: "fadeIn"
    });
});