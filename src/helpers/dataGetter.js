import axios from 'axios';
import apiKeys from '../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllPlayersFromDb = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/players.json`)
    .then((result) => {
      // Problemm : Result is an object and I need it to be an array
      const allPlayersObject = result.data;
      const allPLayersArray = [];
      if (allPlayersObject != null) {
        Object.keys(allPlayersObject).forEach((playerId) => {
          const newPlayer = allPlayersObject[playerId];
          newPlayer.id = playerId;
          allPLayersArray.push(newPlayer);
        });
      }
      console.log(allPLayersArray);
      resolve(allPLayersArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getPlayersByTeam = teamId => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/players.json`)
    .then((data) => {
      const allPlayers = data.data;
      const correctPlayers = allPlayers.filter(x => x.teamId === teamId);
      resolve(correctPlayers);
    })
    .catch((err) => {
      reject(err);
    });
});

const getAllTeamsFromDb = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/teams.json`)
    .then((result) => {
      // Problemm : Result is an object and I need it to be an array
      const allPlayersObject = result.data;
      const allPLayersArray = [];
      if (allPlayersObject != null) {
        Object.keys(allPlayersObject).forEach((playerId) => {
          const newPlayer = allPlayersObject[playerId];
          newPlayer.id = playerId;
          allPLayersArray.push(newPlayer);
        });
      }
      console.log(allPLayersArray);
      resolve(allPLayersArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllPositionsFromDb = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/positions.json`)
    .then((result) => {
      // Problemm : Result is an object and I need it to be an array
      const allPlayersObject = result.data;
      const allPLayersArray = [];
      if (allPlayersObject != null) {
        Object.keys(allPlayersObject).forEach((playerId) => {
          const newPlayer = allPlayersObject[playerId];
          newPlayer.id = playerId;
          allPLayersArray.push(newPlayer);
        });
      }
      console.log(allPLayersArray);
      resolve(allPLayersArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getFullPlayerInfo = players => Promise.all([getAllTeamsFromDb(), getAllPositionsFromDb()])
  .then((dataArray) => {
    const playersFromDb = players;
    const teamsFromDb = dataArray[0];
    const positionsFromDb = dataArray[1];
    const newPlayers = [];
    playersFromDb.forEach((player) => {
      const newPlayer = player;
      teamsFromDb.forEach((team) => {
        if (player.teamId === team.id) {
          newPlayer.team = team.name;
        }
      });
      positionsFromDb.forEach((position) => {
        if (player.positionId === position.id) {
          newPlayer.position = position.name;
        }
      });
      newPlayers.push(newPlayer);
    });
    return Promise.resolve(newPlayers);
  })
  .catch((error) => {
    console.error({ error });
  });

export default {
  getAllPlayersFromDb,
  getPlayersByTeam,
  getAllTeamsFromDb,
  getFullPlayerInfo,
};
