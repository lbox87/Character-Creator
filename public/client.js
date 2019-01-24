import { request } from "http";

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

// store submitted character
function newCharacterSubmitted() {
    $('.create-character').submit(event => {
        event.preventDefault();
        console.log(`new character is running`);
        let submittedCharacter = {};
        submittedCharacter["\"name\""] = $('.character-name').val();
        submittedCharacter["\"race\""] = $('.character-race').val();
        submittedCharacter["\"class\""] = $('.character-class').val();
        submittedCharacter["\"level\""] = $('.character-level').val();
        submittedCharacter["\"alignment\""] = $('.character-alignment').val();
        console.log(submittedCharacter);
        return submittedCharacter;
    });
}

function addCharacter(){
    $.post('/characters', function(data) {
        console.log(data);
    });
}

function editSubmitted(){

}

function editCharacter(){
    $.put('/characters/:id', function(data) {
        console.log(data);
    });
}

function deleteSubmitted(){
    
}

function deleteCharacter(){
    $.delete('/characters/:id', function(data) {
        console.log(data);
    });
}

function docReady() {
    // newAccountToggle();
    viewAllCharacters();
    newCharacterSubmitted();
}

$(docReady);