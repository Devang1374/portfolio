let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let maxAttempts = 10;
let bestScore = localStorage.getItem("bestScore")||null;

const winSound = document.getElementById("winSound");
const wrongSound = document.getElementById("wrongSound");
const clickSound = document.getElementById("clickSound");
const loseSound = document.getElementById("loseSound");

winSound.volume = 0.6;
wrongSound.volume = 0.6;
clickSound.volume = 0.4;
loseSound.volume = 0.6;

if(bestScore){
    document.getElementById("bestScore").innerText = `🏆 Best Score: ${bestScore} attempts`;
}

window.onload = function() {
    document.getElementById('guessInput').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkGuess();
            
        }
    });
};

function checkGuess() {
    let input = document.getElementById('guessInput');
    let checkBtn = document.getElementById('check');
    let messge = document.getElementById('message');
    clickSound.currentTime = 0;
    clickSound.play();
    
    let guess = Number(input.value);

  
    if(input.value === "" || isNaN(input.value)){
        messge.innerText = "⚠️ Please enter a number between 1 and 10.";
    }else{
    attempts++;
    document.getElementById('attempts').innerText = `Attempts: ${attempts} / ${maxAttempts}`;

    if(guess === randomNumber){
        messge.innerHTML = `<span id="win">🎉Correct! You won!</span>`;
        input.disabled = true;
        checkBtn.disabled = true;
        let card = document.querySelector(".input-card");
        playSuccess(card);
        launchConfetti();
        winSound.currentTime = 0;
        winSound.play();

        if(!bestScore||attempts < bestScore){
            bestScore = attempts;
            localStorage.setItem("bestScore",bestScore);
            document.getElementById("bestScore").innerText = `🏆 Best Score: ${bestScore} attempts`;
        }
    }else if(attempts >= maxAttempts){
        messge.innerHTML = `<span class="loss">❌ Game Over! The correct number was ${randomNumber}.</span>`;
        input.disabled = true;
        checkBtn.disabled = true;
        loseSound.currentTime = 0;
        loseSound.play();
    }else if(guess > randomNumber){
        messge.innerText = "⬆️ Too high! Try again.";
        input.classList.add("shake");
        wrongSound.currentTime = 0;
        wrongSound.play();
    }else{
        messge.innerText = "⬇️ Too low! Try again.";
        input.classList.add("shake");
        wrongSound.currentTime = 0;
        wrongSound.play();
    }

    setTimeout(() => {
        input.classList.remove("shake");
    }, 300);

    document.getElementById("guessInput").value = "";
}
}

function resetGame(){
    clickSound.currentTime = 0;
    clickSound.play();
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    let massage = document.getElementById('message');
    let attemptsDisplay = document.getElementById('attempts');
    let guessInput = document.getElementById('guessInput');
    massage.innerText = "";
    attemptsDisplay.innerText = "";
    document.getElementById('check').disabled = false;
    guessInput.disabled = false;
    guessInput.value = "";
    document.querySelector(".input-card").classList.remove("success");
}

function playSuccess(elemetn){
    elemetn.classList.remove("success");
    void elemetn.offsetWidth;
    elemetn.classList.add("success");
}

function launchConfetti(){
    for(let i=0;i<100;i++){
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        
        confetti.style.left = Math.random()*window.innerWidth+"px";
        confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
        confetti.style.animationDuration = (Math.random()*2+1)+"s";

        document.body.appendChild(confetti);

        setTimeout(()=>{
            confetti.remove();
        },3000);
    }
}