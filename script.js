let coffees = 0;

let cooldown = 3;
let minimumCooldown = 0.4;

let gameOver = false;
let waiting = false;

const coffeeButton = document.getElementById("coffeeButton");
const coffeeCount = document.getElementById("coffeeCount");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

coffeeButton.addEventListener("click", drinkCoffee);
restartButton.addEventListener("click", restart);

function drinkCoffee() {
    if (gameOver || waiting) {
        return;
    }

    coffees++;

    coffeeCount.textContent = coffees;

    // The more coffee you drink, the faster you can click.
    cooldown = Math.max(minimumCooldown, 3 - coffees * 0.13);

    if (coffees >= 20) {
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

function lose() {
    gameOver = true;

    coffeeButton.classList.add("disabled");
    coffeeButton.disabled = true;

    status.textContent = "💀 You are too coffied.";
}

function restart() {
    coffees = 0;
    cooldown = 3;
    gameOver = false;
    waiting = false;

    coffeeButton.disabled = false;
    coffeeButton.classList.remove("disabled");

    coffeeCount.textContent = "0";
    status.textContent = "Click the coffee to wake up!";
}
