// Userlist data array for filling in info box
var userListData = [];
var type = String;
var funds = Number;
var picture = String;

// DOM Ready =============================================================
$(document).ready(function() {
    // Add User button click
    $('button#register').on('click', reg);

    $('img#driver').click(function() {
      type = "driver";
    $('#start').hide();
    $('#Register').show();
    funds = 30000;
    picture = '../images/cars/'+Math.floor((Math.random() * 2))+".jpg";
    });
    $('img#user').click(function() {
      type = "user";
      $('#start').hide();
      $('#Register').show();
      $('#matr').hide();
    });


});

// Functions =============================================================

// Add User
function reg(event) {
    event.preventDefault();
    $('button#register').text('Saving...');
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#reg input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var userReg = {
            username: $('input#usr').val(),
            email: $('input#email').val(),
            password: $('input#pwd').val(),
            debt: funds,
            picture: picture,
            type: type,
            matricula: $('input#mat').val()
          };
        // Use AJAX to post the object to our addProp service
        $.ajax({
            type: 'POST',
            data: userReg,
            url: '/register',
            dataType: 'JSON',
            statusCode: {
              500: function() {
                $('button#register').text('Submit');
                alert("Please try other username");
              }}
            }).done(function(response) {
          if (response.message === 'User Registered') {

            // Clear the form inputs
            $('#reg input').val('');
            window.location.href = "/crowdfundig";
        }
        else {
          $('button#register').text('Submit');

            // If something goes wrong, alert the error message that our service returned
            alert(err);

        }});
    }
    else {
        // If errorCount is more than 0, error out
        $('button#register').text('Submit');
        alert('Please fill all the the form cases');
    }
};
