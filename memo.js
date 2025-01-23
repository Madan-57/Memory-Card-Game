// document.addEventListener("DOMContentLoaded", () => {
//     const startgamecontainer = document.querySelector(".startgame"),
//         startgamecards = document.querySelectorAll(".startgame .card"),
//         startgame = document.querySelector(".startgame button"),
//         playground = document.querySelector(".playground"),
//         scoreDisplay = document.getElementById("score"),
//         timerDisplay = document.getElementById("timer");

//     let levels = 2,
//         columns = 2,
//         rows = 2,
//         matched = 0,
//         score = 0,
//         timer = 60,
//         cardone = null,
//         cardtwo = null,
//         IsPreventClick = false,
//         countdown;


//     startgamecards.forEach((element) => {
//         element.addEventListener("click", (e) => {
//             startgamecards.forEach((el) => el.classList.remove("active"));
//             e.target.parentElement.classList.add("active");

//             levels = parseInt(e.target.parentElement.getAttribute("level"));
//             columns = parseInt(e.target.parentElement.getAttribute("column"));
//             rows = parseInt(e.target.parentElement.getAttribute("row"));
//         });
//     });

    
//     startgame.addEventListener("click", () => {
//         startgamecontainer.style.display = "none";
//         playground.style.display = "grid";
//         playground.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
//         playground.style.gridTemplateRows = `repeat(${rows}, 100px)`;

//         score = 0;
//         scoreDisplay.textContent = score;
//         matched = 0;
//         timer = 60;
//         timerDisplay.textContent = timer;

//         startTimer();
//         createCards();
//     });

    
//     function startTimer() {
//         clearInterval(countdown);
//         countdown = setInterval(() => {
//             timer--;
//             timerDisplay.textContent = timer;
//             if (timer <= 0) {
//                 clearInterval(countdown);
//                 alert("Time's up! Game over.");
//                 resetGame();
//             }
//         }, 1000);
//     }

    
//     function resetGame() {
//         clearInterval(countdown);
//         playground.innerHTML = "";
//         playground.style.display = "none";
//         startgamecontainer.style.display = "flex";
//         scoreDisplay.textContent = 0;
//         timerDisplay.textContent = 60;
//     }
   

    
//     function createCards() {
//         const cardArr = ["house", "bomb", "poo", "gift", "egg", "dragon", "car", "rocket"];
//         const shuffledCards = shuffleArray([...cardArr.slice(0, levels), ...cardArr.slice(0, levels)]);

//         playground.innerHTML = "";
//         shuffledCards.forEach((card) => {
//             const cardElement = document.createElement("div");
//             cardElement.classList.add("cards");
//             cardElement.innerHTML = `
//                 <div class="front"><i class="fa-solid fa-question"></i></div>
//                 <div class="back"><i class="fa-solid fa-${card}"></i></div>
//             `;
//             cardElement.addEventListener("click", () => cardClicked(cardElement));
//             playground.appendChild(cardElement);
//         });
//     }

    
//     function shuffleArray(array) {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
//     }

    
//     function cardClicked(card) {
//         if (IsPreventClick || card === cardone || card.classList.contains("flipped")) return;

//         card.classList.add("flipped");
//         if (!cardone) {
//             cardone = card;
//             return;
//         }

//         cardtwo = card;
//         IsPreventClick = true;

//         if (cardone.innerHTML === cardtwo.innerHTML) {
//             matched += 2;
//             score += 10;
//             scoreDisplay.textContent = score;
//             cardone = cardtwo = null;
//             IsPreventClick = false;
//             if (matched === levels * 2) {
//                 clearInterval(countdown);
//                 setTimeout(() => alert('Congrats You Won!🏆🏅'), 500);
//             }
//         } else {
//             setTimeout(() => {
//                 cardone.classList.remove('flipped');
//                 cardtwo.classList.remove('flipped');
//                 cardone = cardtwo = null;
//                 IsPreventClick = false;
//             }, 1000);
//         }
//     }
// });









document.addEventListener("DOMContentLoaded", () => {
    const startgamecontainer = document.querySelector(".startgame"),
        startgamecards = document.querySelectorAll(".startgame .card"),
        startgame = document.querySelector(".startgame button"),
        playground = document.querySelector(".playground"),
        scoreDisplay = document.getElementById("score"),
        timerDisplay = document.getElementById("timer");

    let levels = 2,
        columns = 2,
        rows = 2,
        matched = 0,
        score = 0,
        timer = 60,
        cardone = null,
        cardtwo = null,
        IsPreventClick = false,
        countdown;

    const sounds = {
        match: new Audio("https://www.soundjay.com/button/beep-07.wav"),
        mismatch: new Audio("https://www.soundjay.com/button/beep-10.wav"),
        win: new Audio("https://www.soundjay.com/button/beep-09.wav")
    };

    
    startgamecards.forEach((card) => {
        card.addEventListener("click", () => {
            startgamecards.forEach((el) => el.classList.remove("active"));
            card.classList.add("active");
            levels = parseInt(card.getAttribute("level"));
            columns = parseInt(card.getAttribute("column"));
            rows = parseInt(card.getAttribute("row"));
        });
    });


    startgame.addEventListener("click", () => {
        startgamecontainer.style.display = "none";
        playground.style.display = "grid";
        playground.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        playground.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        resetVariables();
        startTimer();
        createCards();
    });

    
    function resetVariables() {
        clearInterval(countdown);
        score = 0;
        matched = 0;
        timer = 60;
        cardone = cardtwo = null;
        IsPreventClick = false;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timer;
        playground.innerHTML = "";
    }

    
    function startTimer() {
        clearInterval(countdown);
        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = timer;
            if (timer <= 0) {
                clearInterval(countdown);
                alert("Time's up! Game over.");
                resetGame();
            }
        }, 1000);
    }

    
    function resetGame() {
        resetVariables();
        playground.style.display = "none";
        startgamecontainer.style.display = "grid";
    }

    
    function createCards() {
        const cardArr = ["house", "bomb", "poo", "gift", "egg", "dragon", "car", "rocket"];
        const shuffledCards = shuffleArray([...cardArr.slice(0, levels), ...cardArr.slice(0, levels)]);

        shuffledCards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("cards");
            cardElement.style.transition = "transform 0.6s, box-shadow 0.3s";
            cardElement.innerHTML = `
                <div class="front" style="background-color: #f1f1f1; color: #000;"><i class="fa-solid fa-question"></i></div>
                <div class="back" style="background-color: #4d977b; color: white;"><i class="fa-solid fa-${card}"></i></div>
            `;
            cardElement.addEventListener("click", () => cardClicked(cardElement));
            playground.appendChild(cardElement);
        });
    }

    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
    function cardClicked(card) {
        if (IsPreventClick || card === cardone || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        if (!cardone) {
            cardone = card;
            return;
        }

        cardtwo = card;
        IsPreventClick = true;

        if (cardone.innerHTML === cardtwo.innerHTML) {
            matched += 2;
            score += 10;
            sounds.match.play();
            scoreDisplay.textContent = score;
            cardone.style.boxShadow = "0 0 10px 3px #4caf50";
            cardtwo.style.boxShadow = "0 0 10px 3px #4caf50";

            cardone = cardtwo = null;
            IsPreventClick = false;

            if (matched === levels * 2) {
                clearInterval(countdown);
                sounds.win.play();
                setTimeout(() => alert('Congrats! You Won! 🏆'), 500);
                resetGame();
            }
        } else {
            sounds.mismatch.play();
            setTimeout(() => {
                cardone.classList.remove("flipped");
                cardtwo.classList.remove("flipped");
                cardone.style.boxShadow = "none";
                cardtwo.style.boxShadow = "none";
                cardone = cardtwo = null;
                IsPreventClick = false;
            }, 1000);
        }
    }
});
