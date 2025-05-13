const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var texts = [
    "If you win, you live. If you lose, you die. If you don’t fight, you can’t win.",
    "No matter how messed up things get, you can always figure out the best solution.",
    "The only way to truly escape the hell of war is to keep fighting until the end.",
    "I’ll wipe out every last one of them… from this world.",
    "It's not about whether I can do it. I'm doing it because I want to.",
    "I am free, no matter what happens to me.",
    "I don’t have time to worry if it’s right or wrong, you can’t hope for a horror story with a happy ending!"
];

// Load confetti library
const confettiScript = document.createElement("script");
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.0.0";
document.body.appendChild(confettiScript);

// Function to trigger confetti effect
function popConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Format time values with leading zeros
function leadingZero(time) {
    return time <= 9 ? "0" + time : time;
}

// Timer function
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Check if typed text matches original text
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.innerHTML.substring(0, textEntered.length);

    if (textEntered === originText.innerHTML) {
        clearInterval(interval); // Stop the timer
        testWrapper.style.borderColor = "#66ff33"; // Success
        timerRunning = false;
        
        // 🎉 Trigger Confetti Effect
        popConfetti();
    } else {
        if (textEntered === originTextMatch) {
            testWrapper.style.borderColor = "#00BFFF"; // Typing correctly
        } else {
            testWrapper.style.borderColor = "#DC0809"; // Error
        }
    }
}

// Start the timer for both mobile and desktop users
function start() {
    if (testArea.value.length === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset function
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "#9d0208"; // Reset border color
    originText.innerHTML = texts[Math.floor(Math.random() * texts.length)]; // Generate new sentence
}

// Event listeners
testArea.addEventListener("input", start, false); // Works for both mobile and desktop users
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
