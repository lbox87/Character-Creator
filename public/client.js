// toggle whether sign in or sign up
// function newAccountToggle() {
//     $('#js-account-check').change(event => {
//         if ( $('#js-account-check').prop('checked') ) {
//             $('.signupbtn').removeClass('hidden');
//             $('.signinbtn').addClass('hidden');
//         } 
//         else {
//             $('.signinbtn').removeClass('hidden');
//             $('.signupbtn').addClass('hidden');
//         }
//     });
// }

// function signInButton(){
    
// }

// function signUpButton(){

// }


// GET request for characters
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

function newCharacterSubmitted() {
    $('.create-character').submit(event => {
        event.preventDefault();
        console.log(`new character is running`);
        const submittedName = $('.character-name').val();
        const submittedRace = $('.character-race').val();
        const submittedClass = $('.character-class').val();
        const submittedLevel = $('.character-level').val();
        const submittedAlignment = $('.character-alignment').val();
        const submittedCharacter = {
           "name": `"${submittedName}"`, 
           "race": `"${submittedRace}"`,
           "class": `"${submittedClass}"`,
           "level": `"${submittedLevel}"`,
           "alignment": `"${submittedAlignment}"`
        };
        console.log(`submitted is ${submittedCharacter}`);
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
    // newAccountToggle();
    viewAllCharacters();
    newCharacterSubmitted();
}

$(docReady);