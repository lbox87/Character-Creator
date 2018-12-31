// toggle whether sign in or sign up
function newAccountToggle() {
    $('#js-account-check').change(event => {
        if ( $('#js-account-check').prop('checked') ) {
            $('.signupbtn').removeClass('hidden');
            $('.signinbtn').addClass('hidden');
        } 
        else {
            $('.signinbtn').removeClass('hidden');
            $('.signupbtn').addClass('hidden');
        }
    });
}

function signInButton(){
    
}

function signUpButton(){

}



function docReady() {
    newAccountToggle();
}

$(docReady);