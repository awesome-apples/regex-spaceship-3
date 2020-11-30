// const { fetchRandomTasks } = require("../../src/store/randomTasks");
// const store = require("../../src/store");

const axios = require("axios");

let serverState = {
  users: [],
  randomTasks: [],
  scores: [],
  gameScore: 0,
};

const players = {};
let numPlayers = 0;

const twoRandomTasks = //axios call
  // async function startGameState() {
  //   await store.dispatch(fetchRandomTasks());
  //   state = store.getState();
  // }

  // var players = {};
  // var star = {
  //   x: Math.floor(Math.random() * 700) + 50,
  //   y: Math.floor(Math.random() * 500) + 50,
  // };
  // var score = 0;

  (module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log(numPlayers);
      console.log(
        `A socket connection to the server has been made: ${socket.id}`
      );
      // startGameState();
      players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: Math.floor(Math.random() * 2) == 0 ? "red" : "blue",
      };
      numPlayers = Object.keys(players).length;
      // send the players object to the new player
      socket.emit("currentPlayers", players);
      // send the star object to the new player
      // socket.emit("starLocation", star);
      // send the current scores
      socket.emit("scoreUpdate", serverState.gameScore);
      // set initial state
      socket.emit("setState", serverState);
      // update all other players of the new player
      socket.broadcast.emit("newPlayer", players[socket.id]);
      // when a player disconnects, remove them from our players object
      socket.on("disconnect", function () {
        console.log("user disconnected: ", socket.id);
        // remove this player from our players object
        delete players[socket.id];
        numPlayers = Object.keys(players).length;
        // emit a message to all players to remove this player
        io.emit("disconnected", socket.id);
      });
      // when a player moves, update the player data
      socket.on("playerMovement", function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        // emit a message to all players about the player that moved
        socket.broadcast.emit("playerMoved", players[socket.id]);
      });
      socket.on("completedTask", function () {
        serverState.gameScore++;
        io.emit("scoreUpdate", serverState.gameScore);
      });
      socket.on("createTasks", async function () {
        //axios call to database to set random tasks
        const { data } = await axios.get(`/api/tasks/randomTasks`);
        serverState.randomTasks = data;
        io.emit("updateState", serverState);
      });
    });
  });
