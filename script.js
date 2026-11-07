
// The player's current coffee count. It starts at zero whenever the page loads.
let coffees = 0;

// The initial waiting time between clicks, measured in seconds.
let cooldown = 3;

// The shortest the waiting time is allowed to become.
let minimumCooldown = 0.4;

// localStorage is a feature built into browsers that lets websites save small amounts
// of information even after the page is closed.
// getItem retrieves the saved value. If no score exists, we start at zero.
// Number converts the saved value from a string (text) into a number.
let highScore = Number(localStorage.getItem("highScore")) || 0;

// These variables keep track of the game's current state.
// gameOver tells us whether the player has lost.
// waiting tells us whether the player is currently in the cooldown period.
let gameOver = false;
let waiting = false;

// These variables connect JavaScript to HTML elements.
// document.getElementById finds an HTML element using its unique ID.
const coffeeButton = document.getElementById("coffeeButton");
const coffeeCount = document.getElementById("coffeeCount");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const highScoreDisplay = document.getElementById("highScore");

// addEventListener tells the browser to run a function when something happens.
// Here, clicking the coffee button runs drinkCoffee().
coffeeButton.addEventListener("click", drinkCoffee);

// Clicking Restart runs the restart() function.
restartButton.addEventListener("click", restart);

// Displays the saved personal best when the page first loads.
// textContent changes the text inside an HTML element.
highScoreDisplay.textContent = highScore;


// This function runs whenever the player clicks the coffee.
function drinkCoffee() {

    // If the game is over or the player is waiting, don't allow another click.
    // return immediately stops the function from continuing.
    if (gameOver || waiting) {
        return;
    }

    // Add one to the player's current coffee count.
    coffees++;

    // Check whether the current score beats the personal best.
    if (coffees > highScore) {

        // Update the personal best in JavaScript.
        highScore = coffees;

        // setItem saves information in localStorage.
        // "highScore" is the name used to identify the saved value.
        // highScore is the actual value being saved.
        localStorage.setItem("highScore", highScore);

        // Update the number displayed on the website.
        highScoreDisplay.textContent = highScore;
    }

    // Update the current coffee count displayed on the website.
    coffeeCount.textContent = coffees;

    // The more coffee you drink, the faster you can click.
    // Math.max makes sure the cooldown never becomes shorter than minimumCooldown.
    cooldown = Math.max(minimumCooldown, 3 - coffees * 0.13);

    // If the player reaches 20 coffees, they lose.
    if (coffees >= 20) {
        lose();
        return;
    }

    // Start the waiting period before the next click.
    startCooldown();
}


// This function handles the waiting period between clicks.
function startCooldown() {

    // Prevent the player from clicking again while waiting.
    waiting = true;

    // Add a CSS class that makes the button look disabled.
    // A CSS class is a label that lets CSS apply certain styles to an element.
    coffeeButton.classList.add("disabled");

    // Make a temporary variable to keep track of the remaining time.
    let timeLeft = cooldown;

    // Display the initial waiting time.
    // toFixed(1) rounds the number to one decimal place.
    status.textContent = `Wait ${timeLeft.toFixed(1)} seconds...`;

    // setInterval repeatedly runs some code after a set amount of time.
    // 100 means it runs every 100 milliseconds (one tenth of a second).
    const timer = setInterval(() => {

        // Subtract one tenth of a second from the remaining time.
        timeLeft -= 0.1;

        // Update the displayed timer.
        // Math.max prevents the displayed time from going below zero.
        status.textContent =
            `Wait ${Math.max(0, timeLeft).toFixed(1)} seconds...`;

        // Once the waiting time is over, stop the repeating timer.
        if (timeLeft <= 0) {
            clearInterval(timer);

            // Allow the player to click again.
            waiting = false;

            // Remove the disabled appearance from the coffee button.
            coffeeButton.classList.remove("disabled");

            // Display a message telling the player they can drink more coffee.
            status.textContent = "☕ More coffee!";
        }
    }, 100);
}


// This function runs when the player drinks too much coffee.
function lose() {

    // Mark the game as over so drinkCoffee() won't accept more clicks.
    gameOver = true;

    // Make the coffee button look disabled and actually prevent it from being clicked.
    coffeeButton.classList.add("disabled");
    coffeeButton.disabled = true;

    // Show the losing message.
    status.textContent = "💀 You are too coffied.";
}


// This function starts a new game without deleting the saved personal best.
function restart() {

    // Reset the current coffee count and cooldown.
    cooldown = 3;
    coffees = 0;

    // Reset the game state so the player can play again.
    gameOver = false;
    waiting = false;

    // Re-enable the coffee button and restore its normal appearance.
    coffeeButton.disabled = false;
    coffeeButton.classList.remove("disabled");

    // Reset the displayed coffee count and status message.
    coffeeCount.textContent = "0";
    status.textContent = "Click the coffee to wake up!";
}

