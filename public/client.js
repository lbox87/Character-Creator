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
        let submittedCharacter = {
            name: $('.character-name').val(),
            race: $('.character-race').val(),
            class: $('.character-class').val(),
            level: $('.character-level').val(),
            alignment: $('.character-alignment').val()
        };
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

function editCharacterScreen() {
    $('.list-characters').on('click', '.edit-character', event => {
        console.log(`edit endpoint is /characters/${event.target.id}`);
        $('.character-edit').removeClass('hidden');
        fetch(`/characters/${event.target.id}`)
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
            displayEdits(response);
        })
        // let characterDelete = {
        //     id: `\"${event.target.id}\"`
        // };
        // fetch(`/characters/${event.target.id}`, {
        //     method: "DELETE",
        //     body: JSON.stringify(characterDelete),
        //     headers: { "Content-Type": "application/json" },
        // })
    });
}

function displayEdits(data) {
    $('.edit-character-name').val(data.name);
    $('.edit-character-level').val(data.level);
    $('.edit-character-alignment').val(data.alignment);
    $('.edit-character-race').val(data.race);
    $('.edit-character-class').val(data.class);
    $('.submit-changes').attr(`id`, data.id);
}

function editCharacterSubmit(){
    $('button.submit-changes').submit(event => {
        event.preventDefault();
        console.log(`submit changes is running`);
    });
}

function deleteCharacter() {
    $('.list-characters').on('click', '.delete-character', event => {
        console.log(`delete endpoint is /characters/${event.target.id}`);
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
    deleteCharacter();
    editCharacterScreen();
    editCharacterSubmit();
}

$(docReady);