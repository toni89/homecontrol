CANVAS_X = 300;
CANVAS_Y = 100;

$(document).ready(function()
{
l_canvas = new Raphael("d_canvas", CANVAS_X, CANVAS_Y);
circle.init(l_canvas);
});

CIRCLE_WIDTH = 50;
CIRCLE_HEIGHT = 25;
CIRCLE_X = 50;
CIRCLE_Y = 50;
CIRCLE_COLOR = '#666666';

var circle =
{ width:    CIRCLE_WIDTH,
    height:   CIRCLE_HEIGHT,
    x:        CANVAS_X/2,
    y:        CIRCLE_Y,
    vx: 2,

    // Private Members
    v_svg:    null,

    // Initializes the circle
    init:
        function(p_canvas)
        { this.v_svg
            = p_canvas
            .circle(this.x, this.y, this.width, this.height)
            .attr({"stroke"       : CIRCLE_COLOR,
                "stroke-width" : 0,
                "fill"         : CIRCLE_COLOR
            });
        },

    animate:
        function(ix)
        {
            console.log(this.x);
            this.x = this.x + ix;

            if(this.x > 0 && this.x < CANVAS_X){
                this.v_svg.attr({cx: this.x});
            }
        },

    // Draws the circle
    draw:
        function()
        {
            this.v_svg.attr({x: this.x, y: this.y});
        }
};
