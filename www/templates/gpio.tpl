<script>
    $(document).ready(function(){
        var socket = io.connect('http://localhost');

        $('.col-lg-2').click(function(event){
            socket.emit("setPin", this.id);
            //console.log('Pin ' + this.id + 'aktiviert');
        });

        socket.on('changeState', function (data) {

            console.log(data);
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

<div class="row">

<div class="col-lg-2 col-md-4 col-sm-4 col-xs-6" id="13">
    <div data-effect="bounce" class="effect-button bounce-button"><i class="fa fa-star"></i>GPIO 1</div>
</div>


<div class="col-lg-2 col-md-4 col-sm-4 col-xs-6" id="15">
    <div data-effect="pulse" class="effect-button bounce-button"><i class="fa fa-star"></i>GPIO 2</div>
</div>

<div class="col-lg-2 col-md-4 col-sm-4 col-xs-6" id="16">
    <div data-effect="flash" class="effect-button bounce-button"><i class="fa fa-star"></i>GPIO 3</div>
</div>

<div class="col-lg-2 col-md-4 col-sm-4 col-xs-6" id="18">
    <div data-effect="shake" class="effect-button bounce-button"><i class="fa fa-star"></i>GPIO 4</div>
</div>
