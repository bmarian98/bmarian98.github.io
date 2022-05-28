// document.addEventListener('DOMContentLoaded', () =>{
//     const gridDisplay = document.querySelector('.grid')
//     const score = document.getElementById('score')
//     const result = document.getElementsByName('result')
//
//     //Board variables
//     const width = 4
//     let squares = []
//
//     //Create board
//     function createBoard() {
//         for (let i = 0; i < width * width; i++){
//             square = document.createElement('div')
//             square.innerHTML = 0
//             gridDisplay.appendChild(square)
//             squares.push(square)
//         }
//         genrate()
//         genrate()
//     }
//
//     createBoard()
//
//     //generate a digit randomly
//     function genrate(){
//         let randNo = Math.floor(Math.random() * squares.length)
//         if(squares[randNo].innerHTML == 0) {
//
//             squares[randNo].innerHTML = 2
//
//         }
//         else
//             genrate()
//
//         paintCell()
//     }
//
//     function paintCell(){
//         for(let i = 0; i < width*width; i++){
//             if(squares[i].innerHTML == 0){
//                 squares[i].style.background = "antiquewhite"
//             }
//             else if(squares[i].innerHTML == 2 || squares[i].innerHTML == 4) {
//                 squares[i].style.background = "white"
//             }
//             else if(squares[i].innerHTML == 16 || squares[i].innerHTML == 32){
//                 squares[i].style.background = "brown"
//             }
//
//         }
//     }
//
//     //swipe right
//     function moveRight(){
//         for(let i = 0; i < width*width; i++){
//             if(i % width === 0){
//                 let totalOne = squares[i].innerHTML
//                 let totalTwo = squares[i+1].innerHTML
//                 let totalThree = squares[i+2].innerHTML
//                 let totalFour = squares[i+3].innerHTML
//
//                 let row =[
//                     parseInt(totalOne),
//                     parseInt(totalTwo),
//                     parseInt(totalThree),
//                     parseInt(totalFour)
//                 ]
//
//                 let filteredRow = row.filter(num => num)
//
//                 let missValues = width - filteredRow.length
//                 let zeros = Array(missValues).fill(0)
//                 let newRow = zeros.concat(filteredRow)
//
//                 squares[i].innerHTML = newRow[0]
//                 squares[i+1].innerHTML = newRow[1]
//                 squares[i+2].innerHTML = newRow[2]
//                 squares[i+3].innerHTML = newRow[3]
//             }
//
//         }
//     }
//
//     //swipe left
//     function moveLeft(){
//         for(let i = 0; i < width*width; i++){
//             if(i % width === 0){
//                 let totalOne = squares[i].innerHTML
//                 let totalTwo = squares[i+1].innerHTML
//                 let totalThree = squares[i+2].innerHTML
//                 let totalFour = squares[i+3].innerHTML
//
//                 let row =[
//                     parseInt(totalOne),
//                     parseInt(totalTwo),
//                     parseInt(totalThree),
//                     parseInt(totalFour)
//                 ]
//
//                 let filteredRow = row.filter(num => num)
//
//                 let missValues = width - filteredRow.length
//                 let zeros = Array(missValues).fill(0)
//                 let newRow = filteredRow.concat(zeros)
//
//                 squares[i].innerHTML = newRow[0]
//                 squares[i+1].innerHTML = newRow[1]
//                 squares[i+2].innerHTML = newRow[2]
//                 squares[i+3].innerHTML = newRow[3]
//             }
//
//         }
//     }
//
//     //
//     function combineRow() {
//         for(let i = 0; i < width * width - 1; i++){
//             if(squares[i].innerHTML === squares[i+1].innerHTML){
//                 let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
//                 squares[i].innerHTML = combinedTotal
//                 squares[i+1].innerHTML = 0
//             }
//         }
//     }
//     document.addEventListener('keyup', control)
//
//    // assigne keys
//     function control(e){
//         if(e.keyCode === 39){
//             keyRight()
//         } else if(e.keyCode === 37)
//         {
//             keyLeft()
//         }
//
//     }
//
//     function keyRight(){
//         moveRight()
//         combineRow()
//         moveRight()
//         genrate()
//     }
//
//     function keyLeft(){
//         moveLeft()
//         combineRow()
//         moveLeft()
//         genrate()
//     }
// })







var board;
var score = 0;
var rows = 4;
var colums = 4;

window.onload = function (){
    setGame();
}

function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // board = [
    //         [2, 2, 2, 2],
    //         [2, 2, 2, 2],
    //         [2, 2, 2, 2],
    //         [2, 2, 2, 2]
    //     ]

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < colums; c++){
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < colums; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }

    return false;
}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }
    let found = false;

    while (!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * colums);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num){
    tile.innerText = ""
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num;

        if(num <= 4096){
            tile.classList.add("x" + num.toString());
        }
        else{
            tile.classList.add("x" + num.toString());
        }
    }
}


document.addEventListener("keyup", (e) =>{
    if(e.code == "ArrowLeft"){
        slideLeft();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
    }
    setTwo();
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0);
}

function slide(row){
    row = filterZero(row);

    for(let i = 0; i < row.length - 1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row)

    while (row.length < colums){
        row.push(0);
    }

    return row
}

function slideLeft(){
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < colums; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < colums; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp(){
    for(let c = 0; c < colums; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown(){
    for(let c = 0; c < colums; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

































