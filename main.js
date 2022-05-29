var board;
var cpy_board;
var score = 0;
var rows = 4;
var colums = 4;
var count_add_hundred = 0;
var no_of_moves = 0;
var board_element;

window.onload = function() {

    setGame();
    board_element = document.getElementById("board");

    board_element.addEventListener("touchstart", startTouch, false);
    board_element.addEventListener("touchmove", moveTouch, false);


    document.addEventListener("touchstart", ev => {
        ev.preventDefault();

        console.log(ev.touches.length);
        switch (ev.targetTouches.length) {
            case 2:
                if (count_add_hundred >= 10) {
                    score += 100;
                    document.getElementById("score").innerText = score;
                    count_add_hundred = 0;
                    document.getElementById("dsbar").style.width = 100 + "px";
                    progressBar(count_add_hundred);
                }
                break;
            case 3:
                resetBoard();
                break;
        }

    }, false);
}

function resetBoard() {
    document.location.reload();
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
    count_add_hundred++;
    progressBar(count_add_hundred);
    document.getElementById("noOfMoves").innerText = no_of_moves;
    document.getElementById("score").innerText = score;
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
            //console.log("swiped left");
        } else {
            // swiped right
            slideRight();
            //console.log("swiped right");
        }
    } else {
        // sliding vertically
        if (diffY > 0) {

            // swiped up
            slideUp();
            //console.log("swiped up");
        } else {
            // swiped down
            slideDown();
            //console.log("swiped down");
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