var board;
var cpy_board;
var score = 0;
var rows = 4;
var colums = 4;
var double_score = false;
var count_for_double = 0;
var three_times_double_score = 0;
var no_of_moves = 0;
var board_element;

window.onload = function() {
    board_element = document.getElementById("board");
    setGame();
    board_element.addEventListener("touchstart", startTouch, false);
    board_element.addEventListener("touchmove", moveTouch, false);
}

function setGame() {
    board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        // test board
        // board = [
        //         [2, 2, 2, 2],
        //         [2, 2, 2, 2],
        //         [2, 2, 2, 2],
        //         [2, 2, 2, 2]
        //     ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < colums; c++) {
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

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < colums; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }

    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;

    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * colums);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = ""
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;

        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x" + num.toString());
        }
    }
}

function setScore() {
    no_of_moves++;
    count_for_double++;
    progressBar(count_for_double);
    document.getElementById("noOfMoves").innerText = no_of_moves;

    //if (compareArr(board, cpy_board)) {
    if (double_score) {
        three_times_double_score++;

        document.getElementById("score").innerText = score * 2;

        if (three_times_double_score == 3) {
            count_for_double = 0;
            double_score = false;
            three_times_double_score = 0;
            document.getElementById("dsbar").style.width = 100 + "px";
        }

    } else {
        document.getElementById("score").innerText = score;
    }

    //} else {
    document.getElementById("score").innerText = "Game over";
    //}

}





// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            slideLeft();
            console.log("swiped left");
        } else {
            // swiped right
            slideRight();
            console.log("swiped right");
        }
    } else {
        // sliding vertically
        if (diffY > 0) {

            // swiped up
            slideUp();
            console.log("swiped up");
        } else {
            // swiped down
            slideDown();
            console.log("swiped down");
        }
    }


    setTwo();
    setScore();

    initialX = null;
    initialY = null;

    e.preventDefault();
};


function compareArr(arr1, arr2) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < rows; c++) {
            if (arr1[r][c] != arr2[r][c]) {
                return true;
            }
        }
    }
    return false;
}

function cpyArr(arr) {
    var carr = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < rows; c++) {
            carr[r][c] = arr[r][c];
        }
    }

    return carr;
}

document.addEventListener("keyup", (e) => {
    //cpy_board = cpyArr(board);


    if (e.code == "ArrowLeft") {
        slideLeft();
    } else if (e.code == "ArrowRight") {
        slideRight();
    } else if (e.code == "ArrowUp") {
        slideUp();
    } else if (e.code == "ArrowDown") {
        slideDown();
    }

    setTwo();
    setScore();
})

function progressBar(num) {
    var n = num * 10;
    if (n <= 100)
        document.getElementById("dsbar").style.width = n + "px";
}

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row)

    while (row.length < colums) {
        row.push(0);
    }

    return row
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < colums; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < colums; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < colums; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < colums; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

document.addEventListener("touchend", ev => {

    if (ev.targetTouches.length >= 0) {
        if (count_for_double >= 10) {
            double_score = true;
        }
    }
    ev.preventDefault();
}, false);