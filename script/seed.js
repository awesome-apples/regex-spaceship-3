"use strict";

const db = require("../server/db");
const { TopChart, User } = require("../server/db/models");

const topchartdata = [
  {
    points: 139,
    time: 390,
    style: "single",
    score: 251,
    userId: 1,
  },
  {
    points: 125,
    time: 500,
    style: "single",
    score: 337,
    userId: 1,
  },
  {
    points: 45,
    time: 700,
    style: "single",
    score: 655,
    userId: 1,
  },
  {
    points: 66,
    time: 600,
    style: "single",
    score: 534,
    userId: 2,
  },
  {
    points: 99,
    time: 450,
    style: "single",
    score: 351,
    userId: 2,
  },
  {
    points: 121,
    time: 800,
    style: "single",
    score: 679,
    userId: 3,
  },
];

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({ username: "cyberpunkkkk", password: "123" }),
    User.create({ username: "eboy38904", password: "123" }),
    User.create({ username: "sadly", password: "12321" }),
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
