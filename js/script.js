const p1win = 3;
const p2win = 6;
var app = document.getElementById('app');

class Tile {
    constructor(who, clicked) {
        this.who = who;
        this.clicked = clicked;
    }
}

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
console.log(mtx);

mtx[0][0].who = 2;
mtx[0][0].clicked = true;
mtx[0][1].who = 2;
mtx[0][1].clicked = true;
mtx[0][2].who = 2;
mtx[0][2].clicked = true;

// function for checking game rules
function gameRules() {
    let arr = [];
    // loop through matrix
    let cross1 = 0;
    let cross2 = 0;
    for (let i = 0; i < mtx.length; i++) {
        let totalx = 0;
        let totaly = 0;
        // loop through array in matrix
        for (let id = 0; id < mtx[0].length; id++) {
            // set total to zero + break if tile hasn't been clicked
            if (mtx[i][id].clicked == false) {
                totalx = 0;
                break;
            }
            totalx += mtx[i][id].who;
        }
        for (let id = 0; id < mtx[0].length; id++) {
            if (mtx[id][i].clicked == false) {
                totaly = 0;
                break;
            }
            totaly += mtx[id][i].who;
        }

        arr.push(totalx);
        arr.push(totaly);
        cross1 += mtx[i][i].who;
        cross2 += mtx[i][mtx.length - 1 - i].who;
    }
    // console.log(cross1);
    arr.push(cross1);
    arr.push(cross2);

    console.log({ arr });

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == p1win) {
            gameEnd(1);
        } else if (arr[i] == p2win) {
            gameEnd(2);
        }
    }

}
function mkGrid(clss, id) {
    let row = document.createElement('div');
    row.setAttribute('class', clss);
    row.setAttribute('id', id);
    return row;
}


function init() {
    // outside row
    let row = mkGrid('row justify-content-md-center', 'outsideRow');

    // outside col
    let colLg = mkGrid('col', 'colLg');
    colLg.setAttribute('class', 'col-lg-4');

    //  3x3 grid of rows/columns
    for (let i = 0; i < mtx.length; i++) {
        let row = mkGrid('row', 'r' + i);
        for (let id = 0; id < mtx[0].length; id++) {
            let col = mkGrid('col border', 'c' + id);
            col.innerHTML = '<h1>_</h1>';
            row.appendChild(col);
        }
        colLg.appendChild(row);
    }

    row.appendChild(colLg);

    app.appendChild(row);
}

init();