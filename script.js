let cellElements = document.querySelectorAll(".cell");
let displayWinner = document.querySelector(".display-curr-user-playing");
let displayCurrPlayerTurn = document.querySelector("#currPlayerTurn");
let player_1_score = document.querySelector("#player1-score");
let player_2_score = document.querySelector("#player2-score");
let displayWinnerInPopup = document.querySelector("#winner-player");
let restart_game = document.querySelector("#restart-game");
let reload = document.querySelector("#reload");
let value_submit = document.querySelector("#valueSubmit");
let skip = document.querySelector("#skip");
const PLAYER_X_CLASS = "X";
const PLAYER_0_CLASS = "0";
let toggleTurn = true;
let points = 0;


const WINNER_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


// all functions
// function for Winner checking.
function checkWinner(currentPlayer) {
    return WINNER_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].innerHTML == currentPlayer;
        })
    })
}

// function for Swaping the player turn.
function swapPlayer() {
    if (toggleTurn) {
        displayCurrPlayerTurn.innerHTML = "PLAYER 1 (X)";
    } else {
        displayCurrPlayerTurn.innerHTML = "PLAYER 2 (0)";
    }
}

// function for Draw Match.
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.innerHTML == "X" || cell.innerHTML == "0";
    })
}

// fuction for counting points.
function pointsCounter(winner) {
    if (winner == PLAYER_X_CLASS) {
        points = points + 1;
        player_1_score.innerHTML = points;
    } else {
        points = points + 1;
        player_2_score.innerHTML = points;
    }
}

// function for popup opening when player win the match.
function open_popup(playerWinner) {
    let blur = document.getElementById("centerContent");
    blur.classList.add("active");
    
    if (playerWinner == PLAYER_X_CLASS) {
        displayWinnerInPopup.innerHTML = "PLAYER 1 (X) WINNER";
    } else {
        displayWinnerInPopup.innerHTML = "PLAYER 2 (0) WINNER";
    }
    
    let popup = document.querySelector(".displayWinnerPopup");
    popup.classList.add("active");
    
    let winnerAnimation = document.querySelector("#my-canvas");
    winnerAnimation.classList.add("active");
}

// function for closing the popup.
function close_popup() {
    let blur_close = document.getElementById("centerContent");
    blur_close.classList.remove("active");
    
    let popup_close = document.querySelector("#editPopup");
    popup_close.classList.remove("active");
}

// function for opening popup for editing the information of player.
function edit_popup() {
    let blur_backg = document.getElementById("centerContent");
    blur_backg.classList.add("active");

    let editPopup = document.getElementById("editPopup");
    editPopup.classList.add("active");
}

// fuction for opening popup when match draw.
function drawPopup() {
    let emoji = document.createElement("img");
    emoji.src = "/images/emoji.png";
    emoji.id = "emoji_img"
    emoji.setAttribute("height", "150");
    emoji.setAttribute("width", "150");
    let star_img = document.getElementById("popupImage");
    star_img.replaceWith(emoji);
    displayWinnerInPopup.innerHTML = "MATCH DRAW";
    let winnerAnimation = document.querySelector("#my-canvas");
    winnerAnimation.classList.remove("active");
}

// confetti animation when player win the match.
var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

// main logic start from here.
cellElements.forEach(element => {
    element.onclick = () => {
        let currentPlayer = toggleTurn ? PLAYER_X_CLASS : PLAYER_0_CLASS;
        element.innerHTML = currentPlayer;
        element.classList.add("disable");

        if (checkWinner(currentPlayer)) {
            // displayWinner.innerHTML = currentPlayer + " Winner";
            pointsCounter(currentPlayer);
            open_popup(currentPlayer);
        }
        else if (isDraw()) {
            displayWinner.innerHTML = "Match Draw";
            open_popup();
            drawPopup();
        }

        toggleTurn = !toggleTurn;

        swapPlayer();
    }
})

// for restart the game.
restart_game.onclick = () => {
    location.reload();
}

// for reload the game.
reload.onclick = () => {
    location.reload();
}

// to submit the information when player open the edit popup.
value_submit.onclick = () => {
    close_popup();
    let player_1_value = document.querySelector("#text-input1").value;
    let player_2_value = document.querySelector("#text-input2").value;
    let player_1_name_display = document.querySelector("#player-1-name");
    let player_2_name_display = document.querySelector("#player-2-name");
    player_1_name_display.innerHTML = player_1_value;
    player_2_name_display.innerHTML = player_2_value;
}

// to skip the popup when edit popup is open.
skip.onclick = () => {
    close_popup();
}