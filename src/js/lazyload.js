// import '../js/library/jquery-1.11.0.min.js';
import '../js/library/jquery.lazyload.js';
$(function() {
    $("img.lazy").lazyload({
        effect: "fadeIn"
    });
});