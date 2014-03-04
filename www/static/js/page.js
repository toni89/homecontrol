$(document).ready(function() {

    var recalculateWidth = false;

    // Register sidebar + togglebutton
    $('#toogle-sidr-sidebar').sidr({
        name: "sidr-sidebar",
        source: "#sidr-sidebar"
    });

    // Handle automatic sidebar behaviour
    enquire.register("screen and (min-width:1024px)", {
        match: function() {
            recalculateWidth = true;
            $.sidr('open', 'sidr-sidebar');
        },
        unmatch: function() {
            recalculateWidth = false;
            $.sidr('close', 'sidr-sidebar');
        }
    });

    // Resize automatically content for desktops
    $(window).resize(function() {
        if(recalculateWidth) {
            $("body").width( $(window).width() - $("#sidr-sidebar").width() );
        }
    });
});