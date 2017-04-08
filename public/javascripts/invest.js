
// DOM Ready =============================================================
$(document).ready(function() {
    // Add User button click
    $('button#invest').on('click', inv);
    console.log(userId);


});

// Functions =============================================================

// Add User
function inv(event) {
    event.preventDefault();
    $('button#inv').text('Processing...');
    // Super basic validation - increase errorCount variable if any fields are blank
    if($('input#inv').val()>0){
        // If it is, compile all user info into one object
        var userReg = {
            target: ideaId,
            user: userId,
            support: $('input#inv').val()
          };
        // Use AJAX to post the object to our addProp service
        $.ajax({
            type: 'PUT',
            data: userReg,
            url: '/invest',
            dataType: 'JSON',
            }).done(function(response) {
          if (response.message === 'Done') {

            // Clear the form inputs
            $('#reg input').val('');
            window.location.href = "/crowdfundig";
        }
        else {
          $('button#inv').text('Invest');

            // If something goes wrong, alert the error message that our service returned
            alert(err);

        }});
    }
    else {
        // If errorCount is more than 0, error out
        $('button#inv').text('Invest');
        alert('Please correct the amount you would like to invest');
    }
};
