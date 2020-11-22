"use strict";

const db = require("../server/db");
const { TopChart, User } = require("../server/db/models");

const topchartdata = [
  {
    points: 150,
    time: 400,
    style: "single",
    score: 250,
    userId: 1,
  },
  {
    points: 170,
    time: 500,
    style: "single",
    score: 330,
    userId: 1,
  },
  {
    points: 45,
    time: 60,
    style: "single",
    score: 15,
    userId: 1,
  },
  {
    points: 578,
    time: 87,
    style: "single",
    score: -490,
    userId: 2,
  },
  {
    points: 560,
    time: 13,
    style: "single",
    score: 546,
    userId: 2,
  },
];

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({ username: "cyberpunkkkk", password: "123" }),
    User.create({ username: "eboy38904", password: "123" }),
  ]);

  const charts = await Promise.all(
    topchartdata.map((chart) => {
      return TopChart.create(chart);
    })
  );

  console.log(`seeded ${charts.length} charts`);
  console.log(`seeded ${users.length} users`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
