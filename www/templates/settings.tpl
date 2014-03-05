<script>
    $(document).ready(function() {
        $('#usertable').dataTable({
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false
        });
    } );
</script>


<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3>Settings</h3>
        <div class="boxed">
            <div class="title-bar white">
                <h4>Users</h4>
            </div>

            <div class="inner no-radius">

                <table id="usertable">
                    <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Row 1 Data 1</td>
                        <td>Row 1 Data 2</td>
                    </tr>
                    <tr>
                        <td>Row 2 Data 1</td>
                        <td>Row 2 Data 2</td>
                    </tr>
                    </tbody>
                </table>


                <button type="button" class="btn btn-lg btn-primary">New User</button>



            </div>


        </div>
    </div>
</div>