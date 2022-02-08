const chalk = require("chalk");
const { addNote, getAllNotes, removeNote } = require("./notes.controller");
const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

const client = path.join(__dirname, "client");

app.use(express.static(client));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = 3000;

app.get("/", async (req, res) => {
  res.render("index", {
    notes: await getAllNotes(),
    isCreated: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title);
    res.render("index", {
      notes: await getAllNotes(),
      isCreated: true,
    });
  } catch (error) {
    console.error(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await removeNote(req.params.id);
    res.render("index", {
      notes: await getAllNotes(),
      isCreated: false,
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(
    chalk.green(`Server has been sucsessfuly started on port ${port}...`)
  );
});
