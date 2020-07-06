const X_class='x'
const circle_class='circle'
const win_combination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElemnts=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const restartbutton=document.getElementById('restartButton')
const winningmessageElement=document.getElementById('winingMessage')
const winningmessageTextElement=document.querySelector('[winning-text]')

let circleTurn;
startgame()

restartbutton.addEventListener('click',startgame)
function startgame(){
    circleTurn=false
    cellElemnts.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener('click',handleclick)
        cell.addEventListener('click',handleclick,{once:true});
    })
    setboardhover()
    winningmessageElement.classList.remove('show')
}

function isdraw(){
    return [...cellElemnts].every(cell => {
        return cell.classList.contains(X_class)||cell.classList.contains(circle_class)
    })
}
function handleclick(e){
    const cell=e.target;
    const currentClass=circleTurn?circle_class:X_class;

    placeMark(cell,currentClass)
    if(checkwin(currentClass)){
        endgame(false)
    }
    else if (isdraw()){

        endgame(true)
    }
    else{
    swapTurn()
    setboardhover()
}
}

function endgame(draw){

 if(draw) {
      
    winningmessageTextElement.innerText="DRAW"
 }  else{
     winningmessageTextElement.innerText = `${circleTurn? "0 ":"X "}WINS!`
 }
 winningmessageElement.classList.add('show')
}


function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){
    circleTurn=!circleTurn;
}

function setboardhover(){
    board.classList.remove(X_class)
    board.classList.remove(circle_class)
    if(circleTurn){
        board.classList.add(circle_class)
    }
    else{
        board.classList.add(X_class)
    }
}

function checkwin(currentClass){
    return win_combination.some(combinatio => {
        return combinatio.every(index =>{
            return cellElemnts[index].classList.contains(currentClass)
        })
    })
}