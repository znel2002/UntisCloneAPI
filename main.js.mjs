import { WebUntis } from 'webuntis';

const untis = new WebUntis('dathe-gymnasium', 'HarreKim', 'Coco2014!', 'nessa.webuntis.com');
var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
await untis.login();
const timetable = await untis.getOwnTimetableForToday();
// const test = await untis.getOwnTimetableForWeek(new Date());
const grid = await untis.getTimegrid()

import fs from 'fs';
const testData = fs.readFileSync('test2.json');
const test = JSON.parse(testData);
console.log(typeof test)
// const week = test.groupBy(a => a.date);
console.log("START")

// simple express server

import express from 'express';
import cors from 'cors';
const app = express();
const port = 8080;
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.get("/grid", (req, res) => {
  res.send(grid);
})

app.get("/test",(req, res) => {
  console.log(test);
  res.send(test);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);