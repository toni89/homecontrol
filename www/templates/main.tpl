<script>
    $(document).ready(function(){
       $("button#logout").click(function() {
           Usermanager.logout();
       });
    });


</script>

<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="container">
            <h3>Gpio test</h3>
            <div class="boxed">
                <div class="inner">
                    <button type="button" class="btn btn-danger" id="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</div>


