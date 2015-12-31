Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
}

var cells = new Array(9);
var cand = new Array(9);
for (var i = 0; i < 9; i++) {
    cells[i] = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    cand[i] = new Array(9);
}
resetCandidate();

function getSudoku(level) {
    makeValidSudoku();
    makeSudoku(level);
    return cells;    
}

function makeSudoku(level) {
    //delete some random cells and verify if sudoku has one only solution
    var memo;
    var row;
    var col;
    var pos = new Array(81);
    var t = 0;
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            pos[t++] = new Array(row, col);
        }
    } 
    for (var t = 0; t < 81; t++) {
        var index = Math.floor((Math.random() * pos.length));
        row = pos[index][0];
        col = pos[index][1];
        pos.remove([row,col]);
        memo = cells[row][col];
        cells[row][col] = "_";
        if (isSolvable(row, col) === 0) {
            cells[row][col] = memo;        
        }
    }
}

function isSolvable(memorow, memocol) {
    resetCandidate();
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            //delete value contained in cells[row][col] from cand[row][0-9]
            deleteRowCandidate(row, cells[row][col]);
            //delete value contained in cells[row][col] from cand[0-9][col]
            deleteColCandidate(col, cells[row][col]);

            deleteBlockCandidate(row, col, cells[row][col])
        }
    }

    if (cand[memorow][memocol].length > 1) {
        return 0;
    }

    return 1;
}

function makeValidSudoku() {

    do {
        resetCells();
        resetCandidate();
        //Create Random Blocks 0 4 8
        createRandomBlock(0);
        createRandomBlock(4);
        createRandomBlock(8);

        deleteCandidatebyBlock(0);
        deleteCandidatebyBlock(4);
        deleteCandidatebyBlock(8);
    
        for (var t=0; t<54; t++) { 
            var minor = searchCellWithMinorCandidates();
            var row = minor[0];
            var col = minor[1];  
            if (row > -1 && col > -1 ) {createRandomCell(row,col)};
        }
    }
    while (isSudokuOk() === 0);      

}

function isSudokuOk() {
   for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (cells[row][col] === 0) {
               return 0;
            } 
        }
    }
    return 1; 
}

function createRandomCell(row, col) {
    var rand = Math.floor((Math.random() * cand[row][col].length));
    cells[row][col] = cand[row][col][rand];
    cand[row][col] = [];
    deleteRowCandidate(row,cells[row][col]);
    deleteColCandidate(col, cells[row][col]);
    deleteBlockCandidate(row,col,cells[row][col]);
}

function searchCellWithMinorCandidates() {
    var minorvalue = 10;
    var indexrow = -1;
    var indexcol = -1;
    var length;
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            length = cand[row][col].length;
            if (length > 0 && length < minorvalue) {
                indexrow = row;
                indexcol = col;
                minorvalue = length;
            } 
        }
    } 
    return [indexrow, indexcol];
}

function createRandomBlock(index) {
    if (index > -1 && index < 9) {
        var startrow = parseInt(index / 3) * 3;
        var startcol = (index - startrow) * 3;
        var rand; 
        var value = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var length = 9;
        for (var row = startrow; row < startrow + 3; row++) {
            for (var col = startcol; col < startcol + 3; col++) {
                rand = Math.floor((Math.random() * length));
                cells[row][col] = value[rand];
                cand[row][col] = [];
                value.remove(value[rand]);
                length--;
            }
        }
    }  
}

function deleteCandidatebyBlock(index) {
    if (index > -1 && index < 9) {
        var startrow = parseInt(index / 3) * 3;
        var startcol = (index - startrow) * 3;
        for (var row = startrow; row < startrow + 3; row++) {
            for (var col = startcol; col < startcol + 3; col++) {
                //delete value contained in cells[row][col] from cand[row][0-9]
                deleteRowCandidate(row, cells[row][col]);
                //delete value contained in cells[row][col] from cand[0-9][col]
                deleteColCandidate(col, cells[row][col]); 
            }
        }
    }
}

function deleteRowCandidate(row, value) {
    for (var col = 0; col < 9; col++) {
        cand[row][col].remove(value);
    }
}

function deleteColCandidate(col, value) {
    for (var row = 0; row < 9; row++) {
        cand[row][col].remove(value);
    }
} 

function deleteBlockCandidate(row, col, value) {
    var startrow = parseInt(row/3)*3;
    var startcol = parseInt(col/3)*3;;
    for (var t = startrow; t < 3 + startrow; t++) {
        for (var i = startcol; i < 3 + startcol; i++) {
            if (cand[t][i] !== undefined) {
                cand[t][i].remove(value);
            }
        }    
    }
}

function resetCandidate() { 
    for (var i = 0; i < 9; i++) {
        for (var t = 0; t < 9; t++) {
            cand[i][t] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }    
    }
}

function resetCells() {
    for (var i = 0; i < 9; i++) {
        cells[i] = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
