# Web Server Codealong

### Learning Objectives

Students should be able to:

- List web server uses.
- Discuss how _we_ will use web servers.
- Explain how Express fits into the back end.
- List the advantages of Express.
- Discuss and use NPM's initial commands.

### Introduction

This codealong is for a note-taking API that will use CRUD operations to manipulate the notes in a JSON file. The `data.json` file already exists—you'll find it in the `data` directory.

Your job will be to create a JavaScript file (preferably in the `src` directory) to run as a web server, handling incoming requests, accessing and manipulating the JSON file, and responding according to the specifications below.

### About This Codealong

#### Goal

The solution should adhere to the following API (_not_ a REST API):

##### Reading All Notes

Respond with the JSON of all notes from the data file.

###### Example Request

GET `/read-notes`

###### Expected Response

```json
[
  {
    "title": "Node's FS Module",
    "text": "Node's FS Module has methods to deal with the filesystem. The first methods we used were `readFile` and `writeFile`. See the notes on those."
  },
  {
    "title": "fs.readFile",
    "text": "`fs.readFile` is a Node FS method for reading a local file. It takes 3 arguments: the path to the file to open (a string), the character encoding (a string, usually \"utf8\"), and a callback function. The callback receives 2 arguments: an error object if there's an error, and the data (a string), which is the contents of the file."
  },
  {
    "title": "fs.writeFile",
    "text": "`fs.writeFile` is a Node FS method for writing a local file. It takes 4 arguments: the path to the file to open (a string), the data (a string) that you want to replace the contents of the file with, the character encoding (a string, usually \"utf8\"), and a callback function. The callback receives 1 argument: an error object if there's an error."
  },
  {
    "title": "CRUD",
    "text": "CRUD is an acronym for Create, Read, Update, Delete, which are the four major actions you can take on data."
  }
]
```

##### Reading One Note

Respond with the JSON of the note at index `id`. This is a pure index in the array—there is **no `id` field** in the note objects.

###### Example Request

GET `/read-note/0`

###### Example Response

```json
{
  "title": "Node's FS Module",
  "text": "Node's FS Module has methods to deal with the filesystem. The first methods we used were `readFile` and `writeFile`. See the notes on those."
}
```

##### Deleting One Note

Delete the note from the data file at index `id`. This is a pure index in the array—there is **no `id` field** in the note objects.

###### Example Request

GET `/delete-note/1`

###### Example Response

Arbitrary. But they should respond with _something_, or the server may hang!.

This solution uses, "Successfully deleted note.".

#### Repo Usage

This codealong should likely be coded by the instructor with help from the group.

Right now, this repo has:

- Example code solutions to work towards.
- The data to work with in `data/data.json`.
- A backup of that data in `data/backup-data.json`, in case you accidentally overwrite the data. If you do, be _sure_ to copy it over to `data.json` rather than work with `backup-data.json` directly, so that you retain a backup for when you inevitably overwrite it a second time.
- A `src` directory for you to create a JavaScript file as your server program.

As you're working on your JS file, you should be able to run it with `node [file name]` and get the server listening on your local host—or `node --watch [file name]` if you want to have it reload the server as you save changes in the file.

#### Hitting Those Endpoints

**You can hit every endpoint from this codealong and its accompanying lab via the browser**. 

We were able to accomplish this by making sure each endpoint is:

1. Accessed via a GET request (even the one that really _should_ be a DELETE request).
2. No information needs to be sent in the body.

More advanced endpoints will be hit in part 2, which will necessitate Postman or a similar tool. Postman is our recommendation, since it's the most popular one out there.

#### Data Location

Ideally, you should separate the data into its own directory and the code into another. This is best practice in the industry, and it's good to model that, but more immediately relevant is that if you are watching the code for changes, you do _not_ want to be watching the data file for changes as well, as this will lead to a server restart whenever the code changes the data.

Node can now run files in watch mode without an external library, as long as you have Node version 18.11 or greater, which everyone should. Simply run `node --watch [file name]` to do this.

If you do not have that version of Node, or want a more established way to do this (Node having this feature is relatively new), a good way to run the server in watch mode is to install `nodemon` with `npm install --global nodemon` and run `nodemon [file name]` instead of `node [file name]`. Alternately, you can run `npx nodemon [file name]` to temporarily install `nodemon` for the length of the command, uninstalling it immediately after.

Watch mode is a great way to rapidly develop, reloading the server on every file change. You may want to turn off auto-save in your editor (it's right in the File menu in VS Code), since then you only reload the server when you explicitly want to, and not in the middle of writing a line of code (which can error out).

#### Suggestions For Running The Codealong

These are suggestions for the instructor as they proceed in this codealong.

- Although you could get it started beforehand, making the directory and running `npm init` (or `npm init -y`) and `npm install express`, and running them through what these commands do, can be very helpful. You may have to run through the steps for the next few codealongs, and be ready to help in labs with `npm` workflow mistakes.
- Show the endpoints at work as you finish them. You can access all endpoints in this codealong and see their response in the browser.
- Explaining what each `app` method call does is crucial, even the `app.use` and `app.listen` calls, but try to keep to their general thrust—we recommend avoiding lengthy discussions of subjects like ports and `app.use` middleware.
- Once you have the server running and listening, you may want to start with a simple `app.get` handler, like so:

```javascript
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
```

Then you can hit that route with your browser and see the string printed on the DOM.

- You may want to follow that up with showing that you can send data, and explain that this is what APIs do at their core.

```javascript
app.get("/", (req, res) => {
  const someData = { name: "Bubbles", color: "blue" };
  res.send(someData);
});
```

- You could, if you wanted to build their knowledge slowly, proceed to explain why we send JSON instead of raw JavaScript data, since only JavaScript apps can read JavaScript objects, while every programming language can parse JSON.

```javascript
app.get("/", (req, res) => {
  const someData = { name: "Bubbles", color: "blue" };
  const someDataButInJsonFormat = JSON.stringify(someData, null, 2);
  res.send(someDataButInJsonFormat);
});
```

(Optionally skipping the `null, 2` arguments, which just format the JSON string to be more readable.)

- From here, you can likely simply code to whatever solution you think is best.
- Note that this is not a REST API on purpose, as that will help us learn REST by contrasting that codealong/lab with this one.
- You could start out coding the solution below without refactoring into functions, or indeed stick with all the code in the handler and never refactor. It depends on what you want to emphasize, but overall I think time spent on how you'd refactor should not take away at this point from the main concepts. Advanced code patterns and engineering towards future change is for those who've been programming for a while.
- Decide beforehand whether you'll do `async`/`await` or callbacks, depending on where your students are at.
- Introducing dynamic routes (as in the `/read-notes/:id` route) may be better done with an example like so:

```javascript
app.get("/greet/instructor", (req, res) => {
  res.send("Hello, oh wise sage of the art!");
});

app.get("/greet/:person", (req, res) => {
  res.send("Hello, " + req.params.person + "!");
});
```

You can also show how the order matters—since Express will stop at the first matching request handler, if you swap the above two, then a request to `/greet/instructor` will get a response of "Hello, instructor!".

- Ideally, you do the above example just prior to the example of the relevant use case—getting one note.

### Solutions

Here are some immediate solutions for quick reference.

#### Cleanest Solution

This solution uses `async`/`await`. If the students don't know `async`/`await`, there is a callback-using version below.

**Note the change in how you require `fs`**—this is necessary if you want to use `async`/`await`.

Although this is an unrefactored version of the solution, this or the also-unrefactored callback version may ultimately be better solutions to demo for students than the refactored one.

```javascript
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
```

#### Callback Version

This version uses callbacks instead of `async`/`await`. It's up to you to decide which your students will be more comfortable with, or, if they are comfortable with neither, which you want to teach.

```javascript
// Pull in dependencies.
const express = require("express");
const fs = require("fs");

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
app.get("/read-notes", (req, res) => {
  fs.readFile("../data/data.json", "utf8", (err, data) => {
    res.send(data);
  });
});

// Handler for how to respond to requests to base url with /read-note/[a note id] at the end.
app.get("/read-note/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("../data/data.json", "utf8", (err, data) => {
    const notes = JSON.parse(data);
    for (let i = 0; i < notes.length; i++) {
      if (i === id) {
        const note = notes[i];
        const jsonVersion = JSON.stringify(note);
        res.send(jsonVersion);
      }
    }
  });
});

// Handler for how to respond to requests to base url with /delete-note/[a note id] at the end.
app.get("/delete-note/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("../data/data.json", "utf8", (err, data) => {
    const notes = JSON.parse(data);
    // Deletes 1 item starting at index `id`.
    // Research the splice array method for how this works!
    notes.splice(id, 1);
    const jsonVersion = JSON.stringify(notes, null, 2);
    fs.writeFile("../data/data.json", jsonVersion, "utf8", (err) => {
      res.send("Successfully deleted note.");
    });
  });
});
```

#### Refactored Solution

This solution uses functions to separate the request handling code from the actual CRUD actions. It also uses `async`/`await` and other advanced syntax.

It's likely _not_ the one you want to code live for students, as they're likely to get caught up on the syntax. But you can release this version later if yo uwant to give them a chance to study what a more modern JS approach might look like.

```javascript
const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Our hello user app is now listening on http://localhost:3000");
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
```
