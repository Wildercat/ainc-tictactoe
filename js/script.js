const p1win = 3;
const p2win = 6;
var app = document.getElementById('app');
var state = 0;
var mtx = [];
class Tile {
    constructor(who, clicked) {
        this.who = who;
        this.clicked = clicked;
    }
    // get who() {
    //     return this._who;
    // }
    // set who(newWho) {
    //     this._who = newWho;
    // }

    // get clicked() {
    //     return this._clicked;
    // }

    // set clicked(newClick) {
    //     this._clicked = newClick;
    // }

    // if im passing the whole object, this could just be one separate function
    clickFoo(content) {
        console.log(this);
        if (this.clicked == false) {
            this.clicked = true;
            if (state == 1) {
                // console.log(this);
                content.textContent = 'X';
                this.who = 1;
                state = 2;
            } else if (state == 2) {
                content.textContent = 'O';
                this.who = 2;
                state = 1;
            }
        }
        gameRules();
    }
}
//game over alert
function gameEnd(player) {
    if (player == 1) {
        alert('X Wins!');
    } else if (player == 2) {
        alert('O Wins!');
    } else if (player == 0) {
        alert('Cat\'s Game! (Tie)');
    }
    init();
}


// debugging
// mtx[0][0].who = 2;
// mtx[0][0].clicked = true;
// mtx[0][1].who = 2;
// mtx[0][1].clicked = true;
// mtx[0][2].who = 2;
// mtx[0][2].clicked = true;

// checks 3 numbers to determine if game is won
function winChecker(a, b, c) {
    if (a != 0 && b != 0 && c != 00) {
        let tot = a + b + c;
        if (tot == 3) {
            gameEnd(1);
        } else if (tot == 6) {
            gameEnd(2);
        }
    }
}

function catsGameCheck() {
    for (let i = 0; i < mtx.length; i++) {
        for (let id = 0; id < mtx[0].length; id++) {
            if (mtx[i][id].clicked == false) {
                return false;
            }
        }
    }
    return true;
}

// function for checking game rules
function gameRules() {
    let arr = [];
    // loop through matrix
    let cross1 = [];
    let cross2 = [];
    for (let i = 0; i < mtx.length; i++) {
        let totalx = [];
        let totaly = [];
        // loop through array in matrix
        for (let id = 0; id < mtx[0].length; id++) {
            // set total to zero + break if tile hasn't been clicked
            // if (mtx[i][id].clicked == false) {
            //     totalx = [];
            //     break;
            // }
            totalx.push(mtx[i][id].who);
            totaly.push(mtx[id][i].who);
        }
        // for (let id = 0; id < mtx[0].length; id++) {
        //     // if (mtx[id][i].clicked == false) {
        //     //     totaly = [];
        //     //     break;
        //     // }
        //     totaly.push(mtx[id][i].who);
        // }

        winChecker(...totalx);
        winChecker(...totaly);
        // arr.push(totalx);
        // arr.push(totaly);

        cross1.push(mtx[i][i].who);
        cross2.push(mtx[i][mtx.length - 1 - i].who);
        // if (mtx[i][i].clicked == false) {
        //     cross1 += mtx[i][i].who;
        // } else {
        //     cross1 = 0;
        // }

        // if (mtx[i][mtx.length - 1 - i].clicked == false) {
        //     cross2 += mtx[i][mtx.length - 1 - i].who;
        // } else {
        //     cross2 = 0;
        // }
    }
    // console.log(cross1);
    winChecker(...cross1);
    winChecker(...cross2);
    // -- Definitely could compress this all to one array and then send that to winChecker
    // -- Would definitely be more scaleable that way

    // console.log({ arr });

    // for (let i = 0; i < arr.length; i++) {
    //     // console.log({i});
    //     if (arr[i] == p1win) {
    //         gameEnd(1);
    //     } else if (arr[i] == p2win) {
    //         gameEnd(2);
    //     }
    // }
    if (catsGameCheck()) {
        gameEnd(0);
    }
    if (state == 1) {
        document.getElementById('h3').textContent = 'It is X\'s turn.';
    } else if (state == 2) {
        document.getElementById('h3').textContent = 'It is O\'s turn.';
    }
    console.log({ state });
    console.log(mtx);

}

function mkGrid(clss, id) {
    let row = document.createElement('div');
    row.setAttribute('class', clss);
    row.setAttribute('id', id);
    return row;
}


function init() {
    //create 3x3 matrix of Tile objects
    mtx = [];
    for (let i = 0; i < 3; i++) {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            let myTile = new Tile(0, false);
            arr.push(myTile);
        }
        mtx.push(arr);
    }
    //reset html
    app.innerHTML = '';
    // outside row
    let row = mkGrid('row justify-content-md-center', 'outsideRow');

    // outside col
    let colLg = mkGrid('col-lg-4', 'colLg');

    //  3x3 grid of rows/columns
    for (let i = 0; i < mtx.length; i++) {
        let row = mkGrid('row', 'r' + i);
        row.setAttribute('style', 'height: 100px');
        for (let id = 0; id < mtx[0].length; id++) {
            let col = mkGrid('col border p-0 text-center', 'c' + id);
            col.setAttribute('style', 'height: 100px');
            let h1 = document.createElement('h1');
            h1.setAttribute('class', 'display-2');
            col.appendChild(h1);
            // h1.textContent = '_';
            // col.addEventListener('click', mtx[i][id].clickFoo);
            col.addEventListener('click', function (event) {

                mtx[i][id].clickFoo(h1);
            });

            row.appendChild(col);
        }
        colLg.appendChild(row);
    }

    row.appendChild(colLg);
    app.appendChild(row);

    state = 1;

    // DEFINITELY not using bootstrap stuff efficiently here...
    let infoRow = mkGrid('row justify-content-md-center', 'infoRow');
    let infoColLg = mkGrid('col-lg-4', 'infoColLg');
    let littleRow = mkGrid('row', 'littleRow');
    let turnCol = mkGrid('col', 'turnCol')
    let h3 = document.createElement('h3');
    h3.setAttribute('id', 'h3');
    h3.textContent = 'It is X\'s turn.';
    turnCol.appendChild(h3);

    let resetBtn = document.createElement('button');
    resetBtn.setAttribute('class', 'btn btn-primary float-right');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', init);
    turnCol.appendChild(resetBtn);

    littleRow.appendChild(turnCol);
    infoColLg.appendChild(littleRow);
    infoRow.appendChild(infoColLg);
    
    app.appendChild(infoRow);
}

init();