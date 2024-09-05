

console.log('hello world')
let music = new Audio("music1.mp3")
let audioTurn = new Audio("ting1.mp3")
let gameover = new Audio("gameover1.mp3")
let turn = "X";
let isGameover = false;

// function for change the Turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// function for check to game win
const checkWin = () => {
    let boxtext2 = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ]
    wins.forEach(e => {
        if ((boxtext2[e[0]].innerText === boxtext2[e[1]].innerText) && (boxtext2[e[2]].innerText === boxtext2[e[1]].innerText && (boxtext2[e[0]].innerText !== ''))) {
            document.querySelector('.info').innerText = boxtext2[e[0]].innerText + " 🎮  Won";
            isGameover = true;
            document.querySelector('.image').getElementsByTagName('img')[0].style.width = "250px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

// Add event listener to the music switch
document.getElementById('musicToggle').addEventListener('change', (e) => {
    if (e.target.checked) {
        music.play().then(() => {
            console.log("Music is playing.");
        }).catch(error => {
            console.error("Error playing music:", error);
        });
    } else {
        music.pause();
        music.currentTime = 0;  // Reset music to the start
        console.log("Music is stopped.");
    }
});

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext1 = element.querySelector(".box-text");
    element.addEventListener('click', () => {
        if (boxtext1.innerText === '') {
            boxtext1.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isGameover) {
                document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn;
            }
        }
    })
});

// Add onclick listener to reset button
document.getElementById('reset').addEventListener('click', () => { 
    let boxtext3 = document.querySelectorAll('.box-text');
    Array.from(boxtext3).forEach((element) => { 
        element.innerText = ''; 
    });
    turn = "X"; 
    isGameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.image').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector(".line").style.width = "0vw";
});
