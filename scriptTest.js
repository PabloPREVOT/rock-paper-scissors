// Pure JS

let score = 0;

let scoreGame = document.querySelector('.score-number');
scoreGame.textContent = score;

// Tout les signe en dispose en triangle (pierre pappier ciseaux)
let allCircle = document.querySelectorAll('.containerCircle');

// Le container par defaut lorsque aucun choix n'a ete fait
let containerDefault = document.querySelector('.gameContainer.default');
// Le container lorsqu'un choix est selectionne
let containerActive = document.querySelector('.gameContainer.active');

// Le block qui contient le signe selectionne par le joueur
let gamerChoiceBlock = document.querySelector('.gamerChoiceCircle');

let shadowCircle = document.querySelector('.invisibleCircle');

// Le block qui contient le texte qui dit "perdu ou "gagner" avec le bouton "rejoue"
let winOrLoseBlock = document.querySelector('.containerWinOrLose');
let winOrLoseTxt = document.querySelector('.winOrLoseTxt');

// La modal qui indique comment jouer
let modal = document.querySelector('.modal-dialog');

// Signe choisit par le joueur
let gamerSign;
// Signe choisit par le bot
let botSign;

let result;

// bouton pour rejouer
let btnPlayAgain = document.querySelector(".btnPlayAgain");

// Changement de modal selon taille ecran
if(window.innerWidth > 375) {
    modal.classList.remove("modal-fullscreen");
    modal.classList.add("modal-dialog-centered");
}
// Changement de modal si on change la taille en etant sur l'ecran
window.addEventListener('resize', () => {
    if(window.innerWidth > 375) {
        modal.classList.remove("modal-fullscreen");
        modal.classList.add("modal-dialog-centered");
    }
    else{
        modal.classList.remove("modal-dialog-centered");
        modal.classList.add("modal-fullscreen");
    }
})

allCircle.forEach(circle => {

    circle.addEventListener('click', () => {

        // Changement de block de jeu (Angular serai parfait pour ça)

        containerDefault.classList.replace("d-flex", "d-none");

        containerActive.classList.replace("d-none", "d-flex");

        if (circle.classList.contains('paperCircle')) {

            gamerSign = "paper";
            console.log(`choice : ${gamerSign}`);
            
        }

        else if (circle.classList.contains('scissorsCircle')){

            gamerSign = "scissors";
            console.log(`choice : ${gamerSign}`);

        }

        else { // rockborder

            gamerSign = "rock";
            console.log(`choice : ${gamerSign}`);

        }

        gamerChoiceBlock.classList.replace("gamerChoiceCircle", `${gamerSign}Circle`)
        gamerChoiceBlock.innerHTML =
        `<div class="circleIcon circleIconActive d-flex justify-content-center align-items-center rounded-circle">
            <img src="images/icon-${gamerSign}.svg" alt="icon${gamerSign}" class="iconSign">
        </div>`;

        let randomNumber = Math.floor(Math.random()*3);

        if (randomNumber == 0){

            botSign = "paper";

        } else if (randomNumber == 1){

            botSign = "scissors";

        } else {

            botSign = "rock"

        }

        if(gamerSign === botSign) {

            result = "TIE";

        } else if(gamerSign === "paper" && botSign === "rock" || gamerSign === "scissors" && botSign === "paper" || gamerSign === "rock" && botSign === "scissors") {

            result = "YOU WIN";

        } else {

            result = "YOU LOSE";

        }

        setTimeout(()=> {
            // Apparition choix du bot
            shadowCircle.classList.replace("invisibleCircle", `${botSign}Circle`);
            shadowCircle.innerHTML = 
            `<div class="circleIcon circleIconActive d-flex justify-content-center align-items-center rounded-circle">
                <img src="images/icon-${botSign}.svg" alt="icon${botSign}" class="iconSign">
            </div>`;
            // Effet d'ombre sur le choix du joueur
            if(result == "YOU WIN"){
                document.querySelector(".gamerChoice .divAddShadowEffect").classList.add("shadowEffect");
            }else if(result == "YOU LOSE"){
                document.querySelector(".botChoice .divAddShadowEffect").classList.add("shadowEffect");
            }
            // Apparition win or lose block et play again
            winOrLoseTxt.textContent = result ;
            if(window.innerWidth < 1024) {
                winOrLoseBlock.style.visibility = "visible";
            } else {
                winOrLoseBlock.style.display = "flex";
                containerActive.style.justifyContent = "normal";
            }
            // Changement de score
            console.log(result);
            if(result == "YOU WIN"){
                score++;
                scoreGame.textContent = score;
            } else if(result == "YOU LOSE" && score >= 1){
                score--;
                scoreGame.textContent = score;
            } else {
                // Aucun changement de score
            }
        } ,1500);

    });

});

btnPlayAgain.addEventListener("click", () => {

    containerDefault.classList.replace("d-none", "d-flex");
    containerActive.classList.replace("d-flex", "d-none");

    if(result == "YOU WIN"){
        document.querySelector(".gamerChoice .divAddShadowEffect").classList.remove("shadowEffect");
    }else if(result == "YOU LOSE"){
        document.querySelector(".botChoice .divAddShadowEffect").classList.remove("shadowEffect");
    }

    gamerChoiceBlock.classList.replace(`${gamerSign}Circle`, "gamerChoiceCircle");
    gamerChoiceBlock.innerHTML = "";

    shadowCircle.classList.replace(`${botSign}Circle`, `invisibleCircle`);
    shadowCircle.innerHTML = `<div class="botShadowChoice rounded-circle"></div>`;

    winOrLoseTxt.textContent = "WINORLOOSE";

    if(window.innerWidth < 1024) {
        winOrLoseBlock.style.visibility = "hidden";
    } else {
        winOrLoseBlock.style.display = "none";
        containerActive.style.justifyContent = "center";
    }

})