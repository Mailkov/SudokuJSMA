function printSudoku(cells) {
    var text = "<pre>-------------------------</pre>";
    for (var row = 0; row < 9; row++) {
        text += "<pre>| ";
        for (var col = 0; col < 9; col++) {
            text += cells[row][col] + " ";
            if (col == 2 || col == 5 ) {
                text += "| ";
            }  
        }
        text += "|</pre>";
        if (row == 2 || row == 5 ) {
            text += "<pre>|-------+-------+-------|</pre>";
        }
    }
    text += "<pre>-------------------------</pre>"; 
    
    document.write(text);
} 

function printCandidates(cand){
    var text = "";
    for (var row = 0; row < 9; row++) {
        text += "<pre> ";
        for (var col = 0; col < 9; col++) {
            text += "("
            for (var i = 0; i < cand[row][col].length; i++) {
                text += cand[row][col][i] + " ";
            }
            text += ")"
            if (col == 2 || col == 5 ) {
                text += " ";
            }  
        }
        text += "</pre>";
        if (row == 2 || row == 5 ) {
            text += "<pre>---------------------------</pre>";
        }
    }
    
    document.write(text);
}

function printBlock(cells, indexblock) {
    var block = getBlock(indexblock);
    var text = "<pre>---------</pre>";
    for (var row = 0; row < 3; row++) {
        text += "<pre>| ";
        for (var col = 0; col < 3; col++) {
            text += block[row][col] + " ";
        }
        text += "|</pre>";
    }
    text += "<pre>---------</pre>";      
    document.write("<pre>   </pre>");
    document.write("<pre>Block n."+indexblock+"</pre>");
    document.write(text);
} 

