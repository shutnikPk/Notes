const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const NOTES_PATH = path.join(__dirname, "dbNotes.json");

async function addNote(title) {
  notes = await getAllNotes();
  const note = {
    title,
    id: Date.now(),
  };
  notes.push(note);
  await fs.writeFile("./dbNotes.json", JSON.stringify(notes));
}

async function getAllNotes() {
  const notes = await fs.readFile(NOTES_PATH, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes))
    ? JSON.parse(notes)
    : console.error("Invalit DataBASE");
}

async function printAllNotes() {
  notes = await getAllNotes();
  console.log(chalk.greenBright("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.red.bold(note.id), chalk.blue(note.title));
  });
}

async function removeNote(id) {
  console.log(typeof id);
  notes = await getAllNotes();
  notes = notes.filter((note) => note.id !== parseInt(id));
  await fs.writeFile("./dbNotes.json", JSON.stringify(notes));
}

module.exports = { addNote, getAllNotes, removeNote };
