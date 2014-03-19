<script>

    var socket = io.connect('http://192.168.0.109');

    function switchPin(id){
        socket.emit("switchPin", id);
    }

    $(document).ready(function(){
        socket.on('initPins', function (pins) {
            $('.row').empty();
            pins.forEach(function(pin) {
                if (pin.State == true){
                    var $element = $("<div id = " + pin._id + " + onclick = switchPin(" + pin._id + ") class=\"col-lg-2 col-md-4 col-sm-4 col-xs-6\"><div data-effect=\"bounce\" class=\"effect-button pulse-button\"><i class=\"fa fa-star\"></i>" + pin.Name + "</div></div>");
                    $($element).appendTo('.row');
                }else{
                    var $element = $("<div id = " + pin._id + " + onclick = switchPin(" + pin._id + ") class=\"col-lg-2 col-md-4 col-sm-4 col-xs-6\"><div data-effect=\"bounce\" class=\"effect-button bounce-button\"><i class=\"fa fa-star\"></i>" + pin.Name + "</div></div>");
                    $($element).appendTo('.row');
                }
            });
        });

        socket.on('changeState', function (data) {
            $('#' + data.id).children().removeClass();

            if(data.state == true){
                $('#' + data.id).children().addClass("effect-button bounce-button");
            }else if(data.state == false){
                $('#' + data.id).children().addClass("effect-button pulse-button");
            }
        });
    });
</script>

<h2>GPIO Control</h2>

<div class="row"></div>
