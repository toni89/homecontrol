$(document).ready(function() {

    var recalculateWidth = false;

    var recalcutate = function() {
        $("body").width( $(window).width() - $("#sidr-sidebar").width() );
    }

    // Register sidebar + togglebutton
    $('#toogle-sidr-sidebar').sidr({
        name: "sidr-sidebar",
        source: "#sidr-sidebar",
        onOpen: function() {
            if(recalculateWidth)
                recalcutate();
        }
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
        if(recalculateWidth)
            recalcutate();
    });

    // Add Touch Gestures
    $(window).touchwipe({
        wipeLeft: function() {
            $.sidr('close', 'sidr-sidebar');
        },
        wipeRight: function() {
            $.sidr('open', 'sidr-sidebar');
        },
        preventDefaultEvents: false
    });
});