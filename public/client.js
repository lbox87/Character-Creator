// import { request } from "http";

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
function getCharacters() {
    $('.view-all').click(event => {
        event.preventDefault();
        fetch('/characters')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // console.log(response);
                // if (response.statusText == "") {
                //     throw new Error("Try Again");
                // }
                // throw new Error(response.statusText);
            })
            .then(response => {
                console.log(response);
                displayCharacters(response);})
    })
}

function displayCharacters(data) {
    for (index in data.characters) {
        $('ul').append(
            '<li>' +
            data.characters[index].name + " the level " +
            data.characters[index].level + " " +
            data.characters[index].alignment + " " +
            data.characters[index].race + " " +
            data.characters[index].class + " " +
            '</li>');
    }
}

// function getCharacters() {

// }

// store submitted character
function newCharacterSubmitted() {
    $('.create-character').submit(event => {
        event.preventDefault();
        console.log(`new character is running`);
        let submittedCharacter = {};
        submittedCharacter["name"] = $('.character-name').val();
        submittedCharacter["race"] = $('.character-race').val();
        submittedCharacter["class"] = $('.character-class').val();
        submittedCharacter["level"] = $('.character-level').val();
        submittedCharacter["alignment"] = $('.character-alignment').val();
        console.log(submittedCharacter);
        // return submittedCharacter;
        // $.post('/characters', submittedCharacter, function(data) {
        //     console.log('submit');
        // })
        console.log(JSON.stringify(submittedCharacter));
        fetch('/characters', {
            method: "POST",
            body: JSON.stringify(submittedCharacter),
            headers: { "Content-Type": "application/json" },
        })
    });
}

// function addCharacter(){
//     $.post('/characters', newCharacterSubmitted()
// }

// function editSubmitted(){

// }

// function editCharacter(){
//     $.put('/characters/:id', function(data) {
//         console.log(data);
//     });
// }

// function deleteSubmitted(){

// }

// function deleteCharacter(){
//     $.delete('/characters/:id', function(data) {
//         console.log(data);
//     });
// }

function docReady() {
    // newAccountToggle();
    getCharacters();
    newCharacterSubmitted();
}

$(docReady);