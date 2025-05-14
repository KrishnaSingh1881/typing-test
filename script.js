const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;

const texts = [
    "If you win, you live. If you lose, you die. If you don’t fight, you can’t win!",
    "The only thing we're allowed to do is believe that we won't regret the choice we made.",
    "This world is cruel, but also very beautiful.",
    "I’m the same as you. I didn’t have any other choice.",
    "A person grows up when he's able to overcome hardships.",
    "I have no time to worry if it’s right or wrong. You can’t hope for a horror story with a happy ending.",
    "A warrior doesn't beg for his life.",
    "If I were the rain, could I connect with someone's heart, as the rain can unite the eternally separated earth and sky?",
    "You should enjoy the little detours. Because that's where you'll find the things more important than what you want.",
    "Fear is necessary for evolution. The fear that one could be destroyed at any moment.",
    "All creatures want to believe in something bigger than themselves. They cannot live without blind obedience."
];

// Load confetti library
const confettiScript = document.createElement("script");
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.0.0";
document.body.appendChild(confettiScript);

// Optional: Success sound (add only if you want audio feedback)
const successAudio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");

// Confetti effect
function popConfetti() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, i * 300);
    }
}

// Add leading zeros to time
function leadingZero(time) {
    return time <= 9 ? "0" + time : time;
}

// Timer logic
function runTimer() {
    const currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`;
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);         // minutes
    timer[1] = Math.floor((timer[3] / 100) % 60);         // seconds
    timer[2] = Math.floor(timer[3] % 100);                // hundredths
}

// WPM Calculation
function calculateWPM() {
    const words = testArea.value.trim().split(/\s+/).length;
    const minutes = (timer[0] * 60 + timer[1] + timer[2] / 100) / 60;
    return Math.round(words / minutes);
}

// Spell Check
function spellCheck() {
    const textEntered = testArea.value;
    const fullText = originText.textContent;
    const partialText = fullText.substring(0, textEntered.length);

    if (textEntered === fullText) {
        clearInterval(interval);
        testWrapper.classList.remove("incorrect");
        testWrapper.classList.add("correct");
        theTimer.classList.add("done");
        timerRunning = false;

        // Fireworks + Sound + WPM
        popConfetti();
        successAudio.play();
        const wpm = calculateWPM();
        alert(`🎉 You nailed it!\nYour WPM: ${wpm}`);

    } else if (textEntered === partialText) {
        testWrapper.classList.remove("incorrect");
        testWrapper.classList.add("correct");
    } else {
        testWrapper.classList.remove("correct");
        testWrapper.classList.add("incorrect");
    }
}

// Start the timer
function start() {
    if (testArea.value.length === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything
function reset() {
    clearInterval(interval);
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    testWrapper.classList.remove("correct", "incorrect");
    theTimer.classList.remove("done");
    theTimer.innerHTML = "00:00:00";

    originText.textContent = texts[Math.floor(Math.random() * texts.length)];
    testArea.focus();
}

// Event listeners
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
