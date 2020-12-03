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
        "Matching repeated characters: Below are a few simple strings that you can match using both the star and plus metacharacters",
      matchArray: ["aaaabcc", "aabbbc", "aacc"],
      skipArray: ["a"],
      possibleSolutions: ["aa+b*c+", "a{2,4}b{0,4}c{1,2}"],
      category: "one",
    }),
    Task.create({
      problem:
        "Matching repeated characters: Try writing a pattern that matches only the first two spellings by using the curly brace notation above.",
      matchArray: ["wazzzzzup", "wazzzup"],
      skipArray: ["wazup"],
      possibleSolutions: ["waz{3,5}up"],
      category: "one",
    }),
    Task.create({
      problem:
        "Matching optional characters: Try writing a pattern that uses the optionality metacharacter to match only the lines where one or more files were found.",
      matchArray: ["1 file found?", "2 files found?", "24 files found?"],
      skipArray: ["No files found."],
      // possibleSolutions: ['\d+ files? found\?'],
      category: "one",
    }),
    Task.create({
      problem:
        "Matching whitespaces: Try writing a pattern that can match each line containing whitespace characters between the number and the content. Notice that the whitespace characters are just like any other character and the special metacharacters like the star and the plus can be used as well.",
      matchArray: ["1.  abc", "2.   abc", "3.       abc"],
      skipArray: ["4.abc"],
      // possibleSolutions: ['\d\.\s+abc'],
      category: "one",
    }),
    Task.create({
      problem:
        "Go ahead and try writing a conditional pattern that matches only the lines with small fuzzy creatures below.",
      matchArray: ["I love cats", "I love dogs"],
      skipArray: ["I love logs", "I love cogs"],
      possibleSolutions: ["I love (cats|dogs)"],
      category: "one",
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
