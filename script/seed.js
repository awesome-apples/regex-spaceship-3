"use strict";

const db = require("../server/db");
const { User, Task, Game } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const games = await Promise.all([
    Game.create({ code: "389573", socketId: "jdghjkdhkd" }),
    Game.create({ code: "284759", socketId: "gfjdykhgkd" }),
  ]);

  const users = await Promise.all([
    User.create({ username: "cyberpunkkkk", password: "123", gameId: 1 }),
    User.create({ username: "eboy38904", password: "123", gameId: 1 }),
    User.create({ username: "sadly", password: "12321", gameId: 2 }),
  ]);

  const tasks = await Promise.all([
    Task.create({
      problem:
        "The alien has destroyed our inventory tracker! We need to recount all our rations. Luckily, we have a list of box contents. Given the string below, write a regular expression matches the word “rations”, based on your input, we will count the number of boxes we have.",
      string:
        "toilet paper, circuit boards, oxygen tanks, rations, rations, circuit boards, space suits, toilet paper, circuit boards, rations, space suits",
      hint: "/ / g",
      expectedOutput: "3",
      possibleSolution: "/rations/g",
      location: "cargoHold",
      category: "count",
    }),
    Task.create({
      problem:
        "The alien has contaminated our samples! The name of the bacteria is hidden in the medical files. Write a regex that matches all the lowercase letters and whitespace in the string below, and we will remove them for you. All thats left will be the name of the bacteria.",
      string: "Emmas health is exCellent her metabOlism and refLexes are quIck",
      hint: "/ [ ] \\s /",
      expectedOutput: "ECOLI",
      possibleSolution: "/[a-z]|\\s/g",
      callback: "(chr) => ''",
      location: "medBay",
      category: "replace",
    }),
    Task.create({
      problem:
        "The alien has contaminated our samples! The name of the bacteria is hidden in the medical files. Write a regex that matches all the lowercase letters and whitespace in the string below, and we will remove them for you. All thats left will be the name of the bacteria.",
      string: "Sarahs hearT RatE and blood Pressure are healthy",
      hint: "/ [ ] \\s /",
      expectedOutput: "STREP",
      possibleSolution: "/[a-z]|\\s/g",
      callback: "(chr) => ''",
      location: "medBay",
      category: "replace",
    }),
    Task.create({
      problem:
        "The alien has contaminated our samples! The name of the bacteria is hidden in the medical files. Write a regex that matches all the lowercase letters and whitespace in the string below, and we will remove them for you. All thats left will be the name of the bacteria.",
      string:
        "SierrA has Low blood sugar she Must eat snacks OfteN to keEp her LeveLs up",
      hint: "/ [ ] \\s /",
      expectedOutput: "SALMONELLA",
      possibleSolution: "/[a-z]|\\s/g",
      callback: "(chr) => ''",
      location: "medBay",
      category: "replace",
    }),
    Task.create({
      problem:
        "The alien put a bunch of space junk in our vending machine! It is crucial to keep our crew snacking. Write a regex that matches only the items that should be found in our vending machines.",
      string:
        "Rocks, meteors, chips, rocks, soda, meteors, candy, rocks, rocks, meteors",
      hint: "/ | / g",
      expectedOutput: "chips, soda, candy",
      possibleSolution: "/chips|soda|candy/g",
      location: "vendingMachine",
      category: "match",
    }),
    Task.create({
      problem:
        "The alien put a bunch of space junk in our vending machine! It is crucial to keep our crew snacking. Write a regex that returns only the items that should be found in our vending machines.",
      string:
        "chocolate, slime, potato chips, cookies, rocks, contract for world domination, granola bar",
      hint: "/ | / g",
      expectedOutput: "chocolate, potato chips, granola bar",
      possibleSolution: "/potato chips|cookies|granola bar/g",
      location: "vendingMachine",
      category: "match",
    }),
    Task.create({
      problem:
        "The alien has managed to tarnish our precious company birthday list! Someone on the team might send a birthday present to an alien! Write a regex that matches the alien name and birthday on this list, and we will remove it for you",
      string:
        "Emma January 12, George March 6, Zviverzxkinzop 8th Lunar Rotation, Carlos December 6",
      hint: "/ / g",
      expectedOutput: "Emma January 12, George March 6, Carlos December 6",
      possibleSolution: "/Zviverzxkinzop 8th Lunar Rotation, /g",
      callback: "(alien) => ''",
      location: "birthdayList",
      category: "replace",
    }),
    Task.create({
      problem:
        "The alien has put a bunch of bugs in our engine! Now bugs are all tangled in our wires. write a regex that finds all instances of the word “bug” and we will pull them out of the engine for you",
      string:
        "wire wire wire wire bug wire wire wire bug wire wire wire bug wire wire",
      hint: "/ ( ) / g",
      expectedOutput:
        "wire wire wire wire wire wire wire wire wire wire wire wire",
      possibleSolution: "/(bug )/g",
      callback: "(c) => ''",
      location: "engineRoom",
      category: "replace",
    }),
    Task.create({
      problem:
        "The alien snuck into the lavatory and clogged a bunch of our toilets! Given the string below, write a regex that matches “clogged” and we will replace it with “plunged” for you.",
      string:
        "empty empty clogged empty empty empty clogged empty empty empty clogged empty empty",
      hint: "/ ( ) / g",
      expectedOutput:
        "empty empty plunged empty empty empty plunged empty empty empty plunged empty empty",
      possibleSolution: "/(clogged)/g",
      callback: "(c) => 'plunged'",
      location: "lavatory",
      category: "replace",
    }),
    Task.create({
      problem:
        "The alien has scrambled all our maps! Given the string below, write a regex that will find the coordinates (index) of the first instance of an incoming meteor.",
      string:
        "space space space planet space space meteor space space planet space",
      hint: "/ [ ] /",
      expectedOutput: "37",
      possibleSolution: "/[m]/",
      location: "cockpit",
      category: "search",
    }),
    Task.create({
      problem:
        "The alien has scrambled all our maps! Given the string below, write a regex that will find the coordinates (index) of the first instance of an incoming meteor.",
      string:
        "space space space planet meteor space space space space planet space",
      hint: "/ [ ] /",
      expectedOutput: "25",
      possibleSolution: "/[m]/",
      location: "cockpit",
      category: "search",
    }),
  ]);

  console.log(`seeded ${tasks.length} tasks`);
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
