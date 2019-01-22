// sample data template
var currentCharacters = {
    "characters": [
        {
            "name": "Joe Smash",
            "race": "Human",
            "class": "Barbarian",
            "level": 1,
            "alignment": "chaotic neutral"
        },
        {
            "name": "Jane Slash",
            "race": "Elf",
            "class": "Rogue",
            "level": 2,
            "alignment": "lawful good"
        },
        {
            "name": "Jim Splash",
            "race": "Half-Orc",
            "class": "Wizard",
            "level": 3,
            "alignment": "true neutral"
        },
        {
            "name": "Jen Stash",
            "race": "Halfling",
            "class": "Bard",
            "level": 4,
            "alignment": "chaotic good"
        }
    ]
};
// sample page load
// function getCharacters(callbackFn) {
//     setTimeout(function(){ callbackFn(currentCharacters)}, 100);
// }

// this function stays the same when we connect
// to real API later
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

// this function can stay the same even when we
// are connecting to real API
// function getAndDisplayCharacters() {
//     getCharacters(displayCharacters);
// }

// $(function() {
//     getAndDisplayCharacters();
// })