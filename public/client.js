function loadCharacters() {
    fetch('/characters')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        // if (response.statusText == "") {
        //     throw new Error("Try Again");
        // }
        // throw new Error(response.statusText);
    })
    .then(response => {
        console.log(response);
        displayCharacters(response);})
}

function getCharacters() {
    $('.view-all').click(event => {
        event.preventDefault();
        $('.view-fewer').removeClass('hidden');
        $('.view-all').addClass('hidden');
        loadCharacters();
        $('.character-number').html("Displaying all characters.");
    })
}

function getFewerCharacters() {
    $('.view-fewer').click(event => {
        $('.view-all').removeClass('hidden');
        $('.view-fewer').addClass('hidden');
        event.preventDefault();
        getInitialCharacters();
    })
}

// function viewToggle() {
//     if (${'.view-toggle'}.val === )
// }

function getInitialCharacters(){
    $('.character-number').html("Displaying ten oldest characters.");
    fetch('/summary')
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
}

function displayCharacters(data) {
    $('.list-characters').empty();
    for (index in data.characters) {
        $('.list-characters').append(
            '<li class="col-12 details">' +
            // '<div class="buttons">' +
            '<span class="col-3">' +
            `<button type="button" class="edit-character" id=\"${data.characters[index].id}\">Edit</button>`+
            `<button type="button" class="delete-character" id=\"${data.characters[index].id}\">Delete</button>`+
            '</span>' +
            // '</div>' +
            '<span class="col-9">' +
            data.characters[index].name + " the level " +
            data.characters[index].level + " " +
            data.characters[index].alignment + " " +
            data.characters[index].race + " " +
            data.characters[index].class + " " +
            '</span>' +
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
        .then(loadCharacters);
        clearEdits();
    });
}

function editCharacterScreen() {
    $('.list-characters').on('click', '.edit-character', event => {
        console.log(`edit endpoint is /characters/${event.target.id}`);
        $('.submit-changes').removeClass('hidden');
        fetch(`/characters/${event.target.id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(response => {
            console.log(response);
            displayEdits(response);
        })
    });
}

function displayEdits(data) {
    $('.edit-who').html(`You are editing ${data.name}.`).removeClass('hidden');
    $('.character-number').addClass('hidden');
    $('.character-name').val(data.name);
    $('.character-level').val(data.level);
    $('.character-alignment').val(data.alignment);
    $('.character-race').val(data.race);
    $('.character-class').val(data.class);
    $('.submit-changes').attr(`id`, data.id);
}

function editCharacterSubmit(){
    $('.submit-changes').click(event => {
        event.preventDefault();
        console.log(`submit changes is running and id is ${event.target.id}`);
        let editedCharacter = {
            id: event.target.id,
            name: $('.character-name').val(),
            race: $('.character-race').val(),
            class: $('.character-class').val(),
            level: $('.character-level').val(),
            alignment: $('.character-alignment').val()
        };
        $('.submit-changes').addClass('hidden');
        console.log(JSON.stringify(editedCharacter));
        fetch(`/characters/${event.target.id}`, {
            method: "PUT",
            body: JSON.stringify(editedCharacter),
            headers: { "Content-Type": "application/json" },
        })
        .then(loadCharacters)
        clearEdits()
        $('.edit-who').html('').addClass('hidden');
        $('.character-number').removeClass('hidden');
    });
}

function clearEdits() {
    $('.character-name').val('');
    $('.character-level').val('');
    $('.character-alignment').val('');
    $('.character-race').val('');
    $('.character-class').val('');
}

function deleteCharacter() {
    $('.list-characters').on('click', '.delete-character', event => {
        console.log(`delete endpoint is /characters/${event.target.id}`);
        let characterDelete = {
            id: event.target.id
        };
        fetch(`/characters/${event.target.id}`, {
            method: "DELETE",
            body: JSON.stringify(characterDelete),
            headers: { "Content-Type": "application/json" },
        })
        .then(loadCharacters);
    });
}

function docReady() {
    getCharacters();
    getFewerCharacters();
    newCharacterSubmitted();
    deleteCharacter();
    editCharacterScreen();
    editCharacterSubmit();
    getInitialCharacters();
}

$(docReady);