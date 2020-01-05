const modal = document.querySelector('.modal');
const replay = document.querySelector('.replay-btn');
const score = document.querySelector('.score');
const finalScore = document.querySelector('.final-score');
const gameStatus = document.querySelector('.game-status');
// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x, y, speed) {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        if(this.x > 650){
            this.x = -300;
            this.speed = 80 + Math.floor(Math.random() * 500);
        }
        this.checkCollision();
    }

    checkCollision() {
        if(this.x < player.x+50 && 
            this.x > player.x-50 &&
            this.y < player.y+50 && 
            this.y > player.y-50) {
            player.resetPosition();
            gameStatus.innerHTML = 'You Lost!';
            finalScore.innerHTML = player.collectibles;
            modal.style.display = 'block'; 
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
        this.collectibles = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {

        // the condition for when the player reachees the water
        // winning condition
        if(this.y < -10){
            this.resetPosition();
            gameStatus.innerHTML = "You Win!";
            finalScore.innerHTML = this.collectibles;
            modal.style.display = "block";
        }

        // conditions for the player so he can't go out of the field
        if(this.x > 400) {
            this.x = 400;
        }
        if(this.x < 0){
            this.x = 0;
        }
        if(this.y > 380) {
            this.y = 380;
        }
        
    }

    // resets the player's position
    resetPosition() {
        this.x = 200;
        this.y = 380;
    }
    
    handleInput(direction) {
        if(direction == 'left'){
            this.x -= 100;
        }
        if(direction == 'right'){
            this.x += 100;
        }
        if(direction == 'up'){
            this.y -= 80;
        }
        if(direction == 'down'){
            this.y += 80;
        }

        console.log(this.x +' - '+this.y);

    }
}


class Gem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/Gem Blue.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(){
        this.collect();
    }

    // randomly place the gem in the field after a player collect the gem
    resetPosition() {
        this.x = field.x[Math.floor(Math.random()*5)];
        this.y = field.y[Math.floor(Math.random()*3)]
    }

    // check if the player in the same location as the gem
    collect() {
        if(this.x < player.x+50 && 
            this.x > player.x-50 &&
            this.y < player.y+50 && 
            this.y > player.y-50) {
                player.collectibles += 1;
                score.innerHTML = player.collectibles;
                this.resetPosition();
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyPosition = [60, 140, 220];
let allEnemies = [];
let enemy;

const player = new Player();
enemyPosition.forEach( y => {
    enemy = new Enemy(-200 ,y ,Math.floor(Math.random() * 600));
    allEnemies.push(enemy);
});

// the coordination for the field
const field = {
    x: [0, 100, 200, 300, 400], 
    y: [60, 140, 220]
};

// initialize a new gem with a random location on the field 
let gem = new Gem(field.x[Math.floor(Math.random()*5)], field.y[Math.floor(Math.random()*3)]);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// 
replay.addEventListener('click', function(event) {
    modal.style.display = "none";
    player.collectibles = 0;
    score.innerHTML = 0;
});