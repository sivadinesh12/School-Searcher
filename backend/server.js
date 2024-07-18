const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const dbPath = path.join(__dirname, "schoolData.db");
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });

    await db.exec("PRAGMA journal_mode = WAL;");

    await db.exec(`
      CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact TEXT NOT NULL,
        email TEXT NOT NULL,
        urlOfImg TEXT NOT NULL
      );
    `);

    app.listen(5000, () => {
      console.log("Server Running at http://localhost:5000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.post("/schools", async (req, res) => {
  const { name, address, city, state, contact, email, urlOfImg } = req.body;
  const insertSchoolQuery = `
    INSERT INTO schools (name, address, city, state, contact, email, urlOfImg)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const result = await db.run(insertSchoolQuery, [
      name,
      address,
      city,
      state,
      contact,
      email,
      urlOfImg,
    ]);
    res
      .status(201)
      .json({ id: result.lastID, message: "School added successfully!" });
  } catch (e) {
    res.status(500).json({ error: `Database Error: ${e.message}` });
  }
});

app.get("/getSchools", async (req, res) => {
  const getSchoolsQuery = `
    SELECT *
    FROM schools;
  `;
  try {
    const schools = await db.all(getSchoolsQuery);
    res.status(200).json(schools);
  } catch (e) {
    res.status(500).json({ error: `Database Error: ${e.message}` });
  }
});
