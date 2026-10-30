let coffees = 0;

let cooldown = 5;
let minimumCooldown = 0.8;

let caffeine = 0;
let gameOver = false;
let waiting = false;

const coffeeButton = document.getElementById("coffeeButton");
const coffeeCount = document.getElementById("coffeeCount");
const status = document.getElementById("status");
const dangerBar = document.getElementById("dangerBar");
const dangerText = document.getElementById("dangerText");
const restartButton = document.getElementById("restartButton");

coffeeButton.addEventListener("click", drinkCoffee);
restartButton.addEventListener("click", restart);

function drinkCoffee() {

    if (gameOver || waiting) {
        return;
    }

    coffees++;

    coffeeCount.textContent = coffees;

    // Getting more awake makes the cooldown shorter.
    cooldown = Math.max(minimumCooldown, 5 - coffees * 0.14);

    // Drinking coffee quickly increases caffeine.
    caffeine++;

    updateDanger();

    if (coffees >= 30) {
        lose();
        return;
    }

    startCooldown();
}


function startCooldown() {

    waiting = true;
    coffeeButton.classList.add("disabled");

    let timeLeft = cooldown;

    status.textContent = `Wait ${timeLeft.toFixed(1)} seconds...`;

    const timer = setInterval(() => {

        timeLeft -= 0.1;

        status.textContent =
            `Wait ${Math.max(0, timeLeft).toFixed(1)} seconds...`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            waiting = false;

            coffeeButton.classList.remove("disabled");

            status.textContent = "☕ More coffee!";
        }

    }, 100);
}


function updateDanger() {

    let percentage = (caffeine / 10) * 100;

    dangerBar.style.width = `${Math.min(percentage, 100)}%`;

    dangerText.textContent =
        `Caffeine: ${caffeine} / 10`;
}


function lose() {

    gameOver = true;

    coffeeButton.classList.add("disabled");

    status.textContent = "💀 You are too coffied.";

    coffeeButton.disabled = true;
}


function restart() {

    coffees = 0;
    cooldown = 5;
    caffeine = 0;
    gameOver = false;
    waiting = false;

    coffeeButton.disabled = false;
    coffeeButton.classList.remove("disabled");

    coffeeCount.textContent = "0";

    status.textContent = "Click the coffee to wake up!";

    updateDanger();
}
