const http = require("http");
const nodemon = require("nodemon");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { addNote } = require("./notes.controller");

const port = 3000;

const pagesDir = path.join(__dirname, "/pages");
const indexHTML = path.join(pagesDir, "/index.html");

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const content = await fs.readFile(indexHTML);
    res.end(content);
  } else if (req.method === "POST") {
    const body = [];

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });
    req.on("end", () => {
      const tittle = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(tittle);
      res.end(`It's Work!!!`);
    });
  }
});

server.listen(port, () => {
  console.log(
    chalk.green(`Server has been sucsessfuly started on port ${port}...`)
  );
});
