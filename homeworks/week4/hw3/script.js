const q = (selecror) => document.querySelector(selecror);

// Global variables

const myClientID = 'jdsl3lgf1c8gcxi44u29sm30m015n3';
let gameResp;
let gameID;
let streamResp;

getTop5GamesFromAPI(function () {
  // Show game names on buttons, record game IDs
})

// Default: display 1st game's streams
/*
q('.game-btn').addEventListener('click', e => {
  gameID = e.target.id;
  getStreamsFromAPI(function () {
    showStreams();
  })
})
*/

// Functions

function getTop5GamesFromAPI(callback) {

  const xhr =  new XMLHttpRequest();
  const url = 'https://api.twitch.tv/helix/games/top?first=5';

  xhr.open('GET', url);
  xhr.setRequestHeader('Client-ID', myClientID);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      gameResp = xhr.response;
      console.log(gameResp);
      callback(gameResp);
    }
  }
  xhr.send();
}

function getStreamsFromAPI(callback) {

  const xhr =  new XMLHttpRequest();
  const url = `https://api.twitch.tv/helix/streams?game=${gameID}&first=20`;

  xhr.open('GET', url);
  xhr.setRequestHeader('Client-ID', myClientID);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      streamResp = xhr.response;
      console.log(gameResp);
      callback(streamResp);
    }
  }
  xhr.send();
}

function showStreams() {}
