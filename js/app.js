// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    //    this.y = 230;//Math.floor(Math.random() * 165 + 60); has to be 60, 145, or 230
    this.y = randomY();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //this will determine the speed at which the enemy moves
    this.speed = randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        this.x += this.speed;
    } else {
        this.x = -101;
        this.speed = randomSpeed();
        this.y = randomY();
    }

    detectCollision(this, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 202;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (x, y) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

Player.prototype.handleInput = function (keyString) {
    switch (keyString) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 85;
                if (this.y < 0) {
                    gameWon(this);
                }
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 85;
            }
            break;
        default:
            return;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
setTimeout(() => {
    allEnemies.push(new Enemy());
}, 50);
setTimeout(() => {
    allEnemies.push(new Enemy());
}, 1500);
setTimeout(() => {
    allEnemies.push(new Enemy());
}, 3000);
setTimeout(() => {
    allEnemies.push(new Enemy());
}, 5000);
setTimeout(() => {
    allEnemies.push(new Enemy());
}, 7000);
setTimeout(() => {
    allEnemies.push(new Enemy());
}, 10000);

var player = new Player();

var winCount = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function detectCol() {
    if (player.x - this.x <= 75 && player.x - this.x > -60 && this.y === player.y) {
        console.log('Collision!!!');
        console.log(player.x);
        console.log(this.x);
        player.x = 202;
        player.y = 400;
    }
}

//This returns a random Y coordinate for the enemy so it's
//placed randomly in one of the three rows
function randomY() {
    switch (Math.ceil(Math.random() * 3)) {
        case 1:
            return 60;
        case 2:
            return 145;
        case 3:
            return 230;
        default:
            return 60;
    }
}

//Helper function that returns a random whole number
//between 1 and 7 to be used as a "speed" coefficient
function randomSpeed() {
    return Math.floor(Math.random() * 7 + 1);
}

/**
 * Detects collision between an enemy object and a player object
 */
function detectCollision(enemy, player) {
    if (player.x - enemy.x < 75 && player.x - enemy.x > -60 && enemy.y === player.y) {
        player.x = 202;
        player.y = 400;
        winCount = 0;
        updateCounter(winCount);
    }
}

function gameWon(player) {
    setTimeout(() => {
        player.x = 202;
        player.y = 400;
        winCount++;
        console.log(winCount);
        updateCounter(winCount);
    }, 500);
}

function updateCounter(num) {
    document.querySelector('#counter').innerHTML = num;
}