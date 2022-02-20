"use strict";

const buttonRes = document.getElementById("restart");

buttonRes.onclick = function () {
    document.location.reload();
}

window.onhashchange = switchToStateFromURLHash;

function switchToStateFromURLHash() {

  const currentGame = window.location.hash.substr(1);

  var pageHTML = "";

  switch (currentGame) {
    case 'snake':
      $("#all").hide();
      pageHTML = `<canvas id="snakeCanvas" class="snake" width="740" height="410"></canvas>`;
      document.getElementById('IPage').innerHTML = pageHTML;
      script.src = './Snake/snake.js';
      document.head.appendChild(script);
      break;

    case 'ping-pong':
      $("#all").hide();
      pageHTML = `<div id="game" class="ping-pong"></div>`;
      document.getElementById('IPage').innerHTML = pageHTML;
      script.src = './Ping-Pong/ping_pong.js';
      document.head.appendChild(script);
      break;

    case 'arcanoid':
      $("#all").hide();
      pageHTML = `<canvas id="myCanvas" class="arcanoid" width="740" height="410"></canvas>`
      document.getElementById('IPage').innerHTML = pageHTML;
      script.src = './Arkanoid/arkanoid.js';
      document.head.appendChild(script);
      break;

    case 'find-treasure':
      $("#all").hide();
      pageHTML = `<div id="heading">
      <h1>Найди клад: <span id = "clicks-remaining"></span> <span id="distance"></span><h1></div>
      <canvas id="findCanvas" class="find-treasure" width="750" height="420"></canvas>`
      document.getElementById('IPage').innerHTML = pageHTML;
      script.src = './Find-treasure/findtreasure.js';
      document.head.appendChild(script);
      break;

  }
}
let script = document.createElement('script');

switchToStateFromURLHash();


