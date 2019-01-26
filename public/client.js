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
    $('.list-characters').empty();
    for (index in data.characters) {
        $('.list-characters').append(
            '<li>' +
            `<button type="button" class="edit-character" id=\"${data.characters[index].id}\">Edit Character</button>`+
            `<button type="button" class="delete-character" id=\"${data.characters[index].id}\">Delete Character</button>`+
            data.characters[index].name + " the level " +
            data.characters[index].level + " " +
            data.characters[index].alignment + " " +
            data.characters[index].race + " " +
            data.characters[index].class + " " +
            '</li>'
            );
    }
}

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
        // .then(response => {
        //     console.log(response);
        //     displayCharacters(response);})
    });
    
}

function characterClicked() {
    $('.list-characters').on('click', '.delete-character', event => {
        console.log(`endpoint is /characters/${event.target.id}`);
        let characterDelete = {
            id: `\"${event.target.id}\"`
        };
        fetch(`/characters/${event.target.id}`, {
            method: "DELETE",
            body: JSON.stringify(characterDelete),
            headers: { "Content-Type": "application/json" },
        })
    });
}

// fetch(`/characters/${event.target.id}`, {
//     method: "DELETE",
//     body: JSON.stringify(characterDelete),
//     headers: { "Content-Type": "application/json" },
// });

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
    characterClicked();
}

$(docReady);