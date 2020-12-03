const { Task } = require('../db/models');

const gameRooms = {
  // [roomKey]: {
  //     users: [],
  //     randomTasks: [],
  //     scores: [],
  //     gameScore: 0,
  //     players: {},
  //     numPlayers: 0
  // }
};

//write join room

//hash table
//key is the gameroom id
// it holds and object with the games state
// const gameRooms= [{gameScore: , roomId: , players, numPlayers}]

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );
    socket.on('joinRoom', (arg) => {
      const { roomKey, socket } = arg;
      socket.join(roomKey);
      const roomInfo = (gameRooms[roomKey] = {});
      console.log(roomInfo.numPlayers);
      roomInfo.players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: Math.floor(Math.random() * 2) == 0 ? 'red' : 'blue',
      };
      roomInfo.numPlayers = Object.keys(roomInfo.players).length;
      console.log(roomInfo.numPlayers);
      // send the players object to the new player
      socket.emit('currentPlayers', {
        players: roomInfo.players,
        numPlayers: roomInfo.numPlayers,
      });
      // set initial state
      socket.emit('setState', roomInfo);
      // update all other players of the new player
      socket.broadcast.emit('newPlayer', {
        playerInfo: roomInfo.players[socket.id],
        numPlayers: roomInfo.numPlayers,
      });
    });
    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
      //find which room they belong to
      let roomKey = 0;
      for (let keys1 in gameRooms) {
        for (let keys2 in gameRooms[keys1]) {
          for (let keys3 in gameRooms[keys1][keys2]) {
            Object.keys(gameRooms[keys1][keys2]).map((el) => {
              if (el === socket.id) {
                roomKey = keys1;
              }
            });
          }
        }
      }
      const roomInfo = gameRooms[roomKey];
      console.log('user disconnected: ', socket.id);
      // remove this player from our players object
      delete roomInfo.players[socket.id];
      numPlayers = Object.keys(roomInfo.players).length;
      console.log(roomInfo.numPlayers);
      // emit a message to all players to remove this player
      io.to(roomKey).emit('disconnected', {
        playerId: socket.id,
        numPlayers: roomInfo.numPlayers,
      });
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (data) {
      const { x, y, roomKey } = data;
      gameRooms[roomKey].players[socket.id].x = x;
      gameRooms[roomKey].players[socket.id].y = y;
      // emit a message to all players about the player that moved
      socket
        .to(roomKey)
        .emit('playerMoved', gameRooms[roomKey].players[socket.id]);
    });
    socket.on('completedTask', function (data) {
      const { roomKey } = data;
      gameRooms[roomKey].gameScore++;
      io.to(roomKey).emit('scoreUpdate', {
        gameScore: gameRooms[roomKey].gameScore,
      });
    });

    socket.on('startGame', async function (roomKey) {
      try {
        const tasks = await Task.findAll();
        const randomIdOne = Math.ceil(Math.random() * tasks.length);
        const randomIdTwo = Math.ceil(Math.random() * tasks.length);
        const taskOne = await Task.findByPk(randomIdOne);
        const taskTwo = await Task.findByPk(randomIdTwo);
        gameRooms[roomKey].randomTasks = [taskOne, taskTwo];

        io.to(roomKey).emit('updateState', gameRooms[roomKey]);
        io.to(roomKey).emit('destroyButton');
        io.to(roomKey).emit('startTimer');
      } catch (err) {
        console.log('error starting game', err);
      }
    });
    socket.on('disablePanel', function (data) {
      const { controlPanel, roomKey } = data;
      socket.to(roomKey).emit('setInactive', controlPanel);
    });
  });
};
