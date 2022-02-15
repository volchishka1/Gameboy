// Получить случайное число от 0 до size - 1
let getRandomNumber = function (size) {
    return Math.floor(Math.random() * size)
}

// Вычислить расстояние от клика (event) до клада (target)
let getDistance = function (event, target) {
    var diffX = event.offsetX - target.x
    var diffY = event.offsetY - target.y
    return Math.sqrt((diffX * diffX) + (diffY * diffY))
}

let drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Счет: " + distanceHint);
};

let gameOver = function () {
    playing = false;
    ctx.font = "60px Courier";
    ctx.fillStyle = "#FFB02E";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры", width / 1.6, height / 3);
}; 

let win = function () {
    playing = false;
    ctx.font = "35px Courier";
    ctx.fillStyle = "#FFB02E";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Клад найден! Сделано кликов: " + clicks, width / 1.6, height / 3);
}
//  Получить для расстояния строку подсказки
let getDistanceHint = function (distance) {
    if (distance < 20) {
        return "Обожжешься!"
    } else if (distance < 40) {
        return "Очень горячо!"
    } else if (distance < 80) {
        return "Горячо!"
    } else if (distance < 100) {
        return "Тепло!"
    } else if (distance < 160) {
        return "Холодно"
    } else if (distance < 320) {
        return "Очень холодно!"
    } else if (distance < 540) {
        return "Очень-oчень холодно! " 
    } else {
        "Замерзнешь!"
    }
}

// Создём переменные
let clicks = 0
const width = 600
const height = 600
const clickLimit = 20
// Случайная позиция клада
let target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
}

let reloadPage = (a) => {
    setTimeout(() => {
        document.location.reload();
    }, a)
}

// Добавляем элементу img обработчик клика
$("#canvas").click(function (event){
    clicks++

    if (clicks > clickLimit) {
        gameOver();
        reloadPage(2000)
    }
    // Получаем расстояние от места клика до клада
    let distance = getDistance(event, target)

    // Преобразуем расстояние в подсказку
    let distanceHint = getDistanceHint(distance)

    // Записываем в элемент #distance новую подсказку
    $("#distance").text(distanceHint)

    $("#clicks-remaining").text("Осталось " + (clickLimit - clicks) + " попыток.");

    // Если клик был достаточно близко, поздравляем с победой
    if (distance < 18) {
        win();
        reloadPage(5000);
}
})

const img = new Image();
img.src = '../images/map.jpg';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};

function draw(e) {
    let pos = getMousePos(canvas, e);
    posx = pos.x - 12;
    posy = pos.y - 8;
    ctx.fillStyle = "#FFB02E";
    ctx.beginPath();
    ctx.arc(posx, posy, 7, 0, 2*Math.PI);
    ctx.fill();
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', function(event) {
    draw(event);
});