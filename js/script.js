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

mtx[0][0].who = 1;
mtx[0][0].clicked = true;
mtx[0][1].who = 1;
mtx[0][1].clicked = true;
mtx[0][2].who = 1;
mtx[0][2].clicked = true;

// function for checking game rules
function gameRules() {
    let arrx = [];
    let arry = [];
    // loop through matrix
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
            if (mtx[i][id].clicked == false) {
                totaly = 0;
                break;
            }
            totaly += mtx[id][i].who;
        }
        arrx.push(totalx);
        arry.push(totaly);
    }
    console.log({arrx, arry});
}

gameRules();