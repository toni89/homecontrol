<!DOCTYPE html>
<html class="fuelux" lang="en">
<head>
    <title>{%METATITLE%}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Fonts -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/fonts/Lobster/Lobster.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/fonts/Lato/Lato.css" />

    <!-- Stylesheets -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/assets/bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/assets/font-awesome/css/font-awesome.min.css" />

    <!-- Stylesheets / Assets -->
    <link rel='stylesheet' type='text/css' href="{%BASEDIR%}/simplicity/assets/jquery-ui/ui-lightness/jquery-ui-1.10.3.custom.css" />

    <!-- Stylesheets / Symplicity -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/css/styles-less.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/css/responsive.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity/css/animate.css" />

    <!-- Stylesheets / Symplicity-child -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity-child/css/styles-less.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/simplicity-child/css/responsive.css" />


    <!-- Stylecheets / Custom -->
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/js/sidr-1.2.1/stylesheets/jquery.sidr.dark.css" />
    <link rel="stylesheet" type="text/css" href="{%BASEDIR%}/css/style.css" />



    <!-- IE9 Compatibility -->
    <!--[if lt IE 9]>
    <script src="{%BASEDIR%}/simplicity/js/html5shiv.js"></script>
    <script src="{%BASEDIR%}/simplicity/js/respond.min.js"></script>
    <![endif]-->


    <!-- JavaScripts -->
    <script src="{%BASEDIR%}/js/enquire.min.js"></script>
    <script src="{%BASEDIR%}/js/socket.io.min.js"></script>


    <script>
        var socket = io.connect('http://localhost');
        socket.on('hello', function (data) {
            console.log(data);
        });
    </script>


</head>
<body>
    <section class="content">

        <!-- Sidebar Start -->
        <div id="sidr-sidebar">
            <!-- Your content -->
            <ul>
                <li><a href="#">List 1</a></li>
                <li class="active"><a href="#">List 2</a></li>
                <li><a href="#">List 3</a></li>
            </ul>
        </div>
        <!-- Sidebar End -->


        <div class="content-liquid-full">
            <div class="container">

                <!-- header start -->
                <div class="row header-bar">
                    <ul class="left-icons">
                        <li><a id="toogle-sidr-sidebar" href="#sidr-sidebar" class="collapse-sidebar"><i class="fa fa-bars"></i></a></li>
                    </ul>
                </div>
                <!-- header end -->


                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="container">
                            <h3>Gpio test</h3>
                            <div class="boxed">
                                <div class="inner">
                                    test
                                </div>
                            </div>

                        </div>

                    </div>
                </div>




            </div>
        </div>
    </section>

    <!-- Javascripts -->
    <script src="{%BASEDIR%}/simplicity/assets/jquery/jquery.min.js"></script>
    <script src="{%BASEDIR%}/simplicity/assets/nicescroll/jquery.nicescroll.min.js"></script>
    <script src="{%BASEDIR%}/simplicity/assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="{%BASEDIR%}/simplicity/assets/jquery-ui/jquery-ui-1.10.3.custom.min.js"></script>

    <script src="{%BASEDIR%}/js/sidr-1.2.1/jquery.sidr.min.js"></script>

    <script src="{%BASEDIR%}/js/page.js"></script>

</body>
</html>