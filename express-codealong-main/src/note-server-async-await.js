// Pull in dependencies.
const express = require("express");
const fs = require("fs").promises;

// Create Express server.
const app = express();

// Tell server to parse JSON.
app.use(express.json());

// Tell server to listen on the given port.
app.listen(3000, () => {
  console.log("Our hello user app is now listening on http://localhost:3000");
});

// Handler for how to respond to requests to base url with just a slash at the end.
// Not strictly necessary, but good practice!
app.get("/", (req, res) => {
  res.send("Hello, user!");
});

// Handler for how to respond to requests to base url with /read-notes at the end.
app.get("/read-notes", async (req, res) => {
  const data = await fs.readFile("../data/data.json", "utf8");
  res.send(data);
});

// Handler for how to respond to requests to base url with /read-note/[a note id]
// at the end.
app.get("/read-note/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = JSON.parse(data);
  for (let i = 0; i < notes.length; i++) {
    if (i === id) {
      const note = notes[i];
      const jsonVersion = JSON.stringify(note);
      res.send(jsonVersion);
    }
  }
});

// Handler for how to respond to requests to base url with /delete-note/[a note id]
// at the end.
app.get("/delete-note/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await fs.readFile("../data/data.json", "utf8");
  const notes = JSON.parse(data);
  // Deletes 1 item starting at index `id`.
  // Research the splice array method for how this works!
  notes.splice(id, 1);
  const jsonVersion = JSON.stringify(notes, null, 2);
  await fs.writeFile("../data/data.json", jsonVersion, "utf8");
  res.send("Successfully deleted note.");
});
