import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("backend/images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-ALlow-Headers", "Content-Type");

  next();
});

app.get("/user-found-longdogs", async (req, res) => {
  const fileData = await fs.readFile("./backend/data/user-found-longdogs");

  const longDogs = JSON.parse(fileData);

  res.status(200).json({ longDogs });
});

app.put("/user-found-longdogs", async (req, res) => {
  const longDogs = req.body.longDogs;

  await fs.writeFile(
    "./backend/data/user-found-longdogs.json",
    JSON.stringify(longDogs)
  );

  res.status(200).json({ message: "Found long dog added!" });
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
