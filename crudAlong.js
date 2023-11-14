const fs = require("fs");

const action = process.argv[2];

function printAllNotes() {
    fs.readFile("./data.json", "utf8"), (err, data) => {
        const notes = JSON.parse(data);
        console.log("Here are all your notes:\n\n");
        for (let i = 0; i < notes.length; i++) {
            console.log(notes[i].title + "\n");
            console.log(notes[i].text + "\n");
        }
    }
}

function printNote(id) {
    fs.readFile("./data.json", "utf8", (err, data) => {
        const notes = JSON.parse(data);
        console.log("Here is that note:\n\n");
        for (let i = 0; i < notes.length; i++) {
            if (i === id) {
                console.log(notes[i].title + "\n");
                console.log(notes[i].text + "\n");
            }
        }
    });
}

function saveNote(newNote) {
    fs.readFile("./data.json", "utf8", (err, data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);
        const jsonVersion = JSON.stringify(notes, null, 2);
        fs.writeFile("./data.json", jsonVersion, "utf8", (err) => {
            console.log("Note successfully written to the file!");
        });
    });
}

function deleteNote(id) {
    fs.readFile("./data.json", "utf8", (err, data) => {
        const notes = JSON.parse(data);
        // Deletes 1 items starting at index `id`.
        // Research the splice array method for how this works!
        notes.splice(id, 1);
        const jsonVersion = JSON.stringify(notes, null, 2);
        fs.writeFile("./data.json", jsonVersion, "utf8", (err) => {
            console.log("Successfully deleted note.");
        });
    });
}

function updateNote(id, replacingNote) {
    fs.readFile("./data.json", "utf8", (err, data) => {
        const notes = JSON.parse(data);
        // Deletes 1 item starting at index `id`, then inserts the replacing note.
        // Research the splice array method for how this works!
        notes.splice(id, 1, replacingNote);
        const jsonVersion = JSON.stringify(notes, null, 2);
        fs.writeFile("./data.json", jsonVersion, "utf8", (err) => {
            console.log("Note successfully written to the file!");
        });
    });
}

if (action === "read") {
    const id = process.argv[3];
    if (id === undefined) {
        printAllNotes();
    } else {
        printNote(Number(id));
    }
} else if (action === "create") {
    const title = process.argv[3];
    const text = process.argv[4];
    const newNote = { title: title, text: text };
    saveNote(newNote);
} else if (action === "delete") {
    const id = Number(process.argv[3]);
    deleteNote(id);
} else if (action === "update") {
    const id = Number(process.argv[3]);
    const title = process.argv[4];
    const text = process.argv[5];
    const replacingNote = { title: title, text: text };
    updateNote(id, replacingNote);
} else {
    console.log(`Valid actions are "create", "read", "update", and "delete".`);
}