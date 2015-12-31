function printMilliseconds() {
    var d = new Date();
    document.write("<pre> Time:"+d.getMinutes()+":"+d.getSeconds()+":"+d.getMilliseconds()+"<pre>");
}

function printEmptyCells(cells) {
    var count = 0;
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (cells[row][col] === "_") {
                count++;
            } 
        }    
    }
    document.write("<pre>Empty cells: " + count + "</pre>");
}
