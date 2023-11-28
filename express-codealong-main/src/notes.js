const express = require("express");
// fs stands for File System
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Our note-taking app is now listening on http://localhost:3000. Also, it's Taco Tuesday!");
});

const getAllNotes = async () => {
  return JSON.parse(await fs.readFile("../data/data.json", "utf8"));
};

const getNote = async (id) => {
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = JSON.parse(data);
  return notes.find((note, i) => i === id);
};

const deleteNote = async (id) => {
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = JSON.parse(data).filter((note, i) => i !== id);
  const jsonVersion = JSON.stringify(notes, null, 2);
  await fs.writeFile("../data/data.json", jsonVersion, "utf8");
};

const saveNote = async (newNote) => {
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = [...JSON.parse(data), newNote];
  const jsonVersion = JSON.stringify(notes, null, 2);
  await fs.writeFile("../data/data.json", jsonVersion, "utf8");
};

const updateNote = async (id, updatedNote) => {
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = JSON.parse(data).map((note, i) => {
    return i === id ? updatedNote : note;
  });

  const jsonVersion = JSON.stringify(notes, null, 2);
  await fs.writeFile("../data/data.json", jsonVersion, "utf8");
};

app.get("/read-notes", async (req, res) => {
  const notes = await getAllNotes();
  res.send(JSON.stringify(notes, null, 2));
});

app.get("/read-note/:id", async (req, res) => {
  const note = await getNote(Number(req.params.id));
  res.send(JSON.stringify(note));
});

app.get("/delete-note/:id", async (req, res) => {
  await deleteNote(Number(req.params.id));
  res.send("Successfully deleted note.");
});

app.get("/create-note", async (req, res) => {
  await saveNote({title: req.body.title, text: req.body.text});
  res.send("Note successfully written to the file!");
});

app.get("/update-note/:id", async (req, res) => {
  const updatedNote = {
    title: req.body.title,
    text: req.body.text,
  };

  await updateNote(Number(req.params.id), updatedNote);
  res.send(updatedNote);
});