<!DOCTYPE html>
<html>
<head>
    <title>{%METATITLE%}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Fonts -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/fonts/Lobster/Lobster.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/fonts/Lato/Lato.css" />

    <!-- Stylesheets -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/assets/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/assets/font-awesome/css/font-awesome.min.css" />

    <!-- Stylesheets / Symplicity -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/css/styles-less.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/css/responsive.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/css/animate.css" />

    <!-- Stylesheets / Symplicity-child -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity-child/css/styles-less.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity-child/css/responsive.css" />


    <!-- IE9 Compatibility -->
    <!--[if lt IE 9]>
    <script src="{%BASEDIR%}/simplicity/js/html5shiv.js"></script>
    <script src="{%BASEDIR%}/simplicity/js/respond.min.js"></script>
    <![endif]-->
</head>

<body class="login-page">

<section class="content login-page">

    <div class="content-liquid">
        <div class="container">

            <div class="row">

                <div class="login-page-container">

                    <div class="boxed animated flipInY">
                        <div class="inner">

                            <div class="login-title text-center">
                                <h4>Login to your account</h4>
                                <h5>We're happy to see you return</h5>
                            </div>

                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                <input type="text" class="form-control" placeholder="Username" id="name"/>
                            </div>

                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                <input type="password" class="form-control" placeholder="Password" id="password"/>
                            </div>

                            <input type="submit" class="btn btn-lg btn-success" value="Login to your account" name="submit" id="submit" />

                            <p class="footer">

                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>



<!-- Javascripts -->
<script src="{%BASEDIR%}/simplicity/assets/jquery/jquery.min.js"></script>
<script src="{%BASEDIR%}/simplicity/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="{%BASEDIR%}/js/socket.io.min.js"></script>
<script src="{%BASEDIR%}/js/homecontrol/core.js"></script>

<script type="text/javascript">

    jQuery(document).ready(function($){

        var min_height = jQuery(window).height();
        jQuery('div.login-page-container').css('min-height', min_height);
        jQuery('div.login-page-container').css('line-height', min_height + 'px');

        // Check for click
        $("#submit").click(function() {
            login();
        });

        // Check for enter
        $(document).keypress(function(e) {
            if(e.which == 13) {
                login();
            }
        });

        var login = function() {
            var name = $("input#name"),
                password = $("input#password"),
                message = $("p.footer"),
                error = false;


            if(name.val() == '') {
                name.addClass("error");
                name.attr('placeholder', 'Please enter username');
                error = true;
            }else {
                name.removeClass("error");
                name.attr('placeholder', 'Username');
            }

            if(password.val() == '') {
                password.addClass("error");
                password.attr('placeholder', 'Please enter password');
                error = true;
            }else {
                password.removeClass("error");
                password.attr('placeholder', 'Password');
            }

            if(!error) {

                Usermanager.login(name.val(), password.val(), function(error, success) {
                    if(error) {
                        if(error == "user not found")
                            message.html("<span style=\"color: red\">Can't find user</span>");

                        if(error == "password is wrong")
                            message.html("<span style=\"color: red\">Password is wrong</span>");
                    }/*else
                        window.location = "/";*/
                });

            }
        };
    });

</script>

</body>
</html>