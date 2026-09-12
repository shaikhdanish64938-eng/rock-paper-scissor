let userScore = 0;
let compScore = 0;

let selectedLevel = "normal";

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


// =========================
// COMPUTER CHOICE
// =========================

const gencompchoice = (userchoice) => {

    const option = ["rock", "paper", "scissor"];

    // EASY
    if (selectedLevel === "easy") {
        const randidx = Math.floor(Math.random() * 3);
        return option[randidx];
    }

    // NORMAL
    if (selectedLevel === "normal") {
        const randidx = Math.floor(Math.random() * 3);
        return option[randidx];
    }

    // HARD
    if (selectedLevel === "hard") {

        // Hard mode: computer usually counters your move,
        // but sometimes makes a random move so it is still beatable.
        const chance = Math.random();

        if (chance < 0.75) {

            if (userchoice === "rock") {
                return "paper";
            }

            if (userchoice === "paper") {
                return "scissor";
            }

            if (userchoice === "scissor") {
                return "rock";
            }

        } else {
            const randidx = Math.floor(Math.random() * 3);
            return option[randidx];
        }
    }
};


// =========================
// DRAW GAME
// =========================

const drawgame = () => {
    msg.innerText = "Game was draw. Play again.";
    msg.style.backgroundColor = "lightslategrey";
};


// =========================
// SHOW WINNER
// =========================

const showwinner = (userwin, userchoice, compchoice) => {

    if (userwin) {

        userScore++;
        userScorePara.innerText = userScore;

        msg.innerText =
            `You win! Your ${userchoice} beats ${compchoice}`;

        msg.style.backgroundColor = "green";

    } else {

        compScore++;
        compScorePara.innerText = compScore;

        msg.innerText =
            `You lost. ${compchoice} beats your ${userchoice}`;

        msg.style.backgroundColor = "red";
    }
};


// =========================
// PLAY GAME
// =========================

const playgame = (userchoice) => {

    const compchoice = gencompchoice(userchoice);

    if (userchoice === compchoice) {

        drawgame();

    } else {

        let userwin = true;

        if (userchoice === "rock") {

            userwin = compchoice === "paper" ? false : true;

        } else if (userchoice === "paper") {

            userwin = compchoice === "scissor" ? false : true;

        } else {

            userwin = compchoice === "rock" ? false : true;
        }

        showwinner(userwin, userchoice, compchoice);
    }
};


// =========================
// GAME BUTTONS
// =========================

choices.forEach((choice) => {

    choice.addEventListener("click", () => {

        const userchoice = choice.getAttribute("id");

        playgame(userchoice);
    });
});


// =========================
// LOADING SCREEN
// =========================

window.addEventListener("load", function () {

    setTimeout(function () {

        document.getElementById("loading-screen").style.display = "none";

    }, 2500);
});


// =========================
// PLAY BUTTON
// =========================

function startGame() {

    document.getElementById("home-screen").style.display = "none";
}


// =========================
// LEVEL SCREEN
// =========================

function showLevels() {

    document.getElementById("home-screen").style.display = "none";

    document.getElementById("level-screen").style.display = "flex";
}


// =========================
// SELECT LEVEL
// =========================

function selectLevel(level) {

    selectedLevel = level;

    document.getElementById("selected-level").innerText =
        "Level: " + level.toUpperCase();

    document.getElementById("level-screen").style.display = "none";

    document.getElementById("home-screen").style.display = "flex";
}


// =========================
// BACK TO HOME
// =========================

function backHome() {

    document.getElementById("level-screen").style.display = "none";

    document.getElementById("home-screen").style.display = "flex";
}

function goHome() {
    document.getElementById("home-screen").style.display = "flex";
    userScore = 0;
    compScore = 0;

    userScorePara.innerText = "0";
    compScorePara.innerText = "0";

    msg.innerText = "Play Your Move";
    msg.style.backgroundColor = "lightslategrey";
}

function acceptConsent() {
    localStorage.setItem("cookieConsent", "accepted");
    document.getElementById("consent-banner").style.display = "none";
}

function rejectConsent() {
    localStorage.setItem("cookieConsent", "rejected");
    document.getElementById("consent-banner").style.display = "none";
}

window.addEventListener("load", function () {
    document.getElementById("consent-banner").style.display = "block";
});
