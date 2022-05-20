// Basket
const basketContainer = document.querySelector(".basketContainer");
let basketLeft = parseFloat(getComputedStyle(basketContainer).left);
let basketWidth = parseFloat(getComputedStyle(basketContainer).width);
let basketHeight = parseFloat(getComputedStyle(basketContainer).height);

let gameContainer = document.querySelector('.container');

//Buttons
let homeButton = document.querySelector('.homeButton');
let pauseButton = document.querySelector('.pauseButton');
let resumeButton = document.querySelector('.resumeButton');

let pauseMenu = document.getElementById('popupMenu');
const scoreLabel = document.getElementById('score');

// variables & Constants
let paused = false;
let fallingHeight = innerHeight - basketHeight - 20;
const containerWidth = parseFloat(getComputedStyle(gameContainer).width) - basketWidth - 20;

//Change Player Name Label
let playerName = getPlayerName.split(' ')[0];
let playerNameLabel = document.querySelector('.playerName');
playerNameLabel.innerText = playerName;


//Move Left >> decrease x --> increase left
function moveLeft() {
    if (basketLeft > 0) {
        basketLeft -= 30;
        basketContainer.style.left = `${basketLeft}px`;
    }
}

//Move Right >> increase x --> increase left
function moveRight() {
    if (!(basketLeft > containerWidth)) {
        basketLeft += 30;
        basketContainer.style.left = `${basketLeft}px`;
    }
}
//Events
// Key Press Events
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return 0;
    }
    switch (event.key) {
        case "ArrowLeft":
            moveLeft();
            break;

        case "ArrowRight":
            moveRight();
            break;

        case 'p':
        case 'Escape':
            isPaused();
            break;

        default:
            return 0;
    }
    event.preventDefault();
}, true);

pauseButton.addEventListener('click', function(){
    isPaused();
});

resumeButton.addEventListener('click', function(){
    paused=false;
    pauseMenu.style.visibility = 'hidden';
});

// action
////////////////////
function isPaused() {
    if (paused) {
        paused = false;
        pauseMenu.style.visibility = 'hidden';
    }
    else {
        paused = true;
        pauseMenu.style.visibility = 'visible';
    }
}
class Egg {
    constructor() {
        this.fallingEgg();
    }

    fallingEgg() {
        // Create Egg
        let egg = document.createElement('img');
        egg.setAttribute('src', 'assets/images/fullEgg.png');
        let randomValue = randomEggLeft();

        egg.style.cssText = `width: 30px;
        position: absolute;
        top: 0%;
        left: ${randomValue}px;
        z-index: -1`;
        document.body.appendChild(egg);

        // Get Random Left
        function randomEggLeft() {
            let randomValue = Math.random() * containerWidth;
            if (randomValue > 20 && randomValue < containerWidth) {
                return randomValue;
            } else {
                randomEggLeft();
            }
        }

        // Let it fall
        let eggTop = parseFloat(egg.style.top);
        let interval = setInterval(() => {
            if (eggTop >= fallingHeight) {
                stopInterval();
            }
            eggTop += 10;
            egg.style.top = `${eggTop}px`;
        }, 90);

        function stopInterval() {
            clearInterval(interval);
            isGoal();
        }

        // is GOAL
        function isGoal() {
            let scoreValue = parseFloat(scoreLabel.innerText);
            let goal = false;
            goal = parseFloat(egg.style.left) >= basketLeft && parseFloat(egg.style.left) <= (basketLeft + basketWidth);
            if (goal) {
                goal = false;
                egg.removeAttribute('src');
                scoreValue += 1;
                scoreLabel.innerText = `${scoreValue}`;
            }
            else {
                egg.setAttribute('src', "assets/images/crackedEgg.png");
                egg.style.top = `90%`;
                egg.style.width = `50px`;
                egg.style.zIndex = `-1`;

                setTimeout(() => {
                    egg.remove();
                }, 1500);
            }
        }

    }

}

// Start Game Timer >> 30
let count = 20;
let gameTime = setInterval(function () {
    if (paused == false) {

        document.querySelector('.timer').innerHTML = count - 1;
        count--;
        if (count == -1) {
            document.querySelector('.timer').innerHTML = 0;
            clearInterval(eggsInterval);
            clearInterval(gameTime);
            isWinner();
        }
    }
}, 1000);


// Falling Eggs

let multiEggs = function () {
    if (paused == false) {
        let fallEgg = new Egg();
    }
}

let eggsInterval = setInterval(multiEggs, 1000);

function isWinner() {
    postPlayerName(playerNameObject);
    let finalScore = parseFloat(scoreLabel.innerHTML);
    let popout = document.querySelector('#gameEnded');
    let winLoseImage = document.querySelector('.winLoseImage');

    if (finalScore >= 10) {
        winLoseImage.setAttribute("src", "assets/images/winner.png");
    }
    else {
        winLoseImage.setAttribute("src", "assets/images/loser.png");
    }

    popout.style.visibility = `visible`;
}
