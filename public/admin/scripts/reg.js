$(function(){
    addEventListener("load", function() {
        setTimeout(hideURLbar, 0);
    }, false);
    function hideURLbar(){
        window.scrollTo(0,1);
    }
    $('#horizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true   // 100% fit in a container
    });
});

