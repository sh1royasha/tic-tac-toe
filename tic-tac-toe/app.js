// Variables que no cambiaran
const box = document.querySelector('.box-content');
const restar = document.querySelector('.game_restar');
const gameState = ["","","","","","","","",""];
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Variables que van a cambiar
let gameActive = true,
    currentPlayer = 'X';

// Funciones
function iniciar(){
    box.addEventListener('click',handleCellClick);
    restar.addEventListener('click',handleRestarGame);
}

function handleCellClick(clickedEvent){
    const clickedCell = clickedEvent.target;
    if(clickedCell.classList.contains('item')){
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        if(gameState[clickedCellIndex] !=='' || !gameActive){
            return
        }

        handleCellPlayer(clickedCell,clickedCellIndex)
        handleResultValidation()
    }
    
}

function handleRestarGame(){
    gameActive = true;
    currentPlayer = 'X';
    restartGameState()
    document.querySelectorAll('.item').forEach(cell => cell.innerText = '')
}

function restartGameState(){
    let i = gameState.length;
    while(i--){
        gameState[i] = ''
    }
}

function handleCellPlayer(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer
    console.log(gameState)
}

function handleResultValidation(){
    let roundWon = false;
    for(let i=0; i<win.length; i++){
        const windCondition = win[i];
        let position1 = gameState[windCondition[0]],
            position2 = gameState[windCondition[1]],
            position3 = gameState[windCondition[2]];
            if(position1 === '' || position2 === '' | position3 === ''){
                continue;
            }
            if(position1 === position2 && position2 === position3){
                roundWon = true;
                break;
            }
    }

    if(roundWon){
        gameActive = false
        return
    }

    let roundDraw = !gameState.includes('')

    if(roundDraw){
        gameActive = false
        return
    }

    handlePlayerChange();
}

function handlePlayerChange(){
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
}

iniciar();