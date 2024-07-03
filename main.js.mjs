import { WebUntis } from "webuntis";
import mysql from "mysql2/promise";

// include env
import dotenv from "dotenv";
dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const untis = new WebUntis(
  process.env.UNTIS_SCHOOL,
  process.env.UNTIS_USER,
  process.env.UNTIS_PASS,
  process.env.UNTIS_SERVER
);
var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
await untis.login();
const timetable = await untis.getOwnTimetableForWeek(new Date());
// const test = await untis.getOwnTimetableForWeek(new Date());
const grid = await untis.getTimegrid();

import fs from "fs";
const testData = fs.readFileSync("test2.json");
const test = JSON.parse(testData);
console.log(typeof test);
// const week = test.groupBy(a => a.date);
console.log("START");

// simple express server

import express from "express";
import cors from "cors";
import { type } from "os";
import e from "express";
const app = express();
const port = 8080;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/grid", (req, res) => {
  res.send(grid);
});

app.get("/test", (req, res) => {
  res.send(test);
});

app.get("/timetable", async (req, res) => {
  try {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(monday.getDate() - monday.getDay() + 1);

    const structureGrid = await Promise.all(
      grid.map(async (item) => {
        const day = new Date(monday);
        day.setDate(day.getDate() + item.day - 2);
        const formattedDay = day.toISOString().split("T")[0].replace(/-/g, "");

        // merge db with timetable

        const elementInTimetable = timetable
          .filter((element) => element.date === parseInt(formattedDay))
          .sort((a, b) => a.startTime - b.startTime);

        for (
          let i = elementInTimetable.length;
          i < grid[0].timeUnits.length;
          i++
        ) {
          elementInTimetable.push({
            date: parseInt(formattedDay),
            startTime: item.timeUnits[i].startTime,
            endTime: item.timeUnits[i].endTime,
            elements: [],
          });
        }

        const homeworks = await getHomeWorkFromUser(1);
        console.log(homeworks);

        // add homework to elementInTimetable
        elementInTimetable.forEach((element) => {
          const homework = homeworks.find(
            (homework) =>
              homework.formattedDay === element.date &&
              homework.lesson_id === element.lessonId
          );
          if (homework) {
            element.homework = homework;
          }
        });

        return {
          day: item.day - 2,
          formattedDay: formattedDay,
          elements: elementInTimetable,
        };
      })
    );

    // structureGrid.push(structureGrid.shift());
    res.send(structureGrid);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// implement week endpoint

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(await getHomework());
});

async function getHomework() {
  const [results, fields] = await connection.query("SELECT * FROM homework");
  return results;
}

async function getHomeWorkFromUser(id, formattedDay) {
  const [results, fields] = await connection.query(
    "SELECT * FROM homework WHERE user_id = ?",
    [id]
  );
  return results;
}
