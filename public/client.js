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

function viewAllCharacters(){
    $('.view-all').click(event => {
        event.preventDefault();
        console.log(`view all is running`);
        getCharacters();
    });
}

function getCharacters(){
    $.get('/characters', function(data) {
        console.log(data);
        displayCharacters(data);
    });
}


// -------------------
// client-side js
// function getCount() {
//     $.get('/the-count', function (data) {
//         $('.js-current-count').text(data.count);
//     });
// }

// $(function () {
//     getCount();
//     $('form').submit(function (event) {
//         event.preventDefault();
//         getCount();
//     });

// });
// ---------------------
function docReady() {
    newAccountToggle();
    viewAllCharacters();
}

$(docReady);