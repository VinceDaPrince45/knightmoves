export function createBoard() {
    // set up grid

    var center = document.createElement('center');
  
    // Create a table element
    var ChessTable = document.createElement('table');
    for (var i = 7; i >= 0; i--) {
      
        // Create a row
        var tr = document.createElement('tr');
        for (var j = 0; j < 8; j++) {
      
            // Create a cell
            var td = document.createElement('td');
      
            // If the sum of cell coordinates is even
            // then color the cell white
            if ((i + j) % 2 == 0) {
      
                // Create a class attribute for all white cells
                td.setAttribute('class', 'cell whitecell');
                tr.appendChild(td);
            }
      
            // If the sum of cell coordinates is odd then
            // color the cell black
            else {
      
                // Create a class attribute for all black cells
                td.setAttribute('class', 'cell blackcell');
      
                // Append the cell to its row
                tr.appendChild(td);
            }
            const string = i.toString() + j.toString();
            td.setAttribute('id',string);
        }
      
        // Append the row
        ChessTable.appendChild(tr);
    }
    center.appendChild(ChessTable);
      
    // Modifying table attribute properties
    ChessTable.setAttribute('cellspacing', '0');
    ChessTable.setAttribute('width', 'auto');
    document.body.appendChild(center);
}

export function runBoard() {
    const body = document.querySelector('body');
    let positionOne;
    let positionTwo;
    body.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            if (!positionOne) {
                positionOne = e.target.getAttribute("id");
            } else if (!positionTwo) {
                positionTwo = e.target.getAttribute('id');
            } else if (positionOne && positionTwo) {
                positionOne = e.target.getAttribute('id');
                positionTwo = null;
            }
            console.log(positionOne,positionTwo)
        }
    })

    // onload, prompt to choose first spot
    // once pressed, prompt to choose second spot
    // once pressed, path will make cells green
    // pressing again will reset board and prompt again
}