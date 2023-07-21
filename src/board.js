import { runCheck } from "./tree";

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
            const string = j.toString() + i.toString();
            td.setAttribute('id',string);
        }
      
        // Append the row
        ChessTable.appendChild(tr);
    }
    center.appendChild(ChessTable);
      
    // Modifying table attribute properties
    ChessTable.setAttribute('cellspacing', '0');
    ChessTable.setAttribute('width', 'auto');
    ChessTable.style.cssText = 'border:2px solid black;border-radius:5px';
    document.body.appendChild(center);
}

export function runBoard() {
    const body = document.querySelector('body');
    let positionOne;
    let positionTwo;
    body.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            if (!positionOne) {
                positionOne = choosePosition(e.target,true);
            } else if (!positionTwo) {
                positionTwo = choosePosition(e.target,false);
                const shortestPath = runCheck(positionOne,positionTwo);
                displayPath(shortestPath);
            } else if (positionOne && positionTwo) {
                // clearboard and reset positions
                resetBoard();
                positionOne = undefined;
                positionTwo = undefined;
            }
        }
    })

    // onload, prompt to choose first spot
    // once pressed, prompt to choose second spot
    // once pressed, path will make cells green
    // pressing again will reset board and prompt again
    // once both are undefined or the second position is chosen, put into parameter for tree and output result
}

function createPosition(stringOfNum) {
    const array = [+stringOfNum[0],+stringOfNum[1]]
    return array;
}

function resetBoard() {
    let center = document.querySelector('center');
    document.body.removeChild(center);
    createBoard();
}

function choosePosition(target,boolean) {
    if (boolean) {
        target.style.cssText = 'background-color:green';
    } else target.style.cssText = 'background-color:red';
    return createPosition(target.getAttribute('id'));
}

function displayPath(array) {
    const cells = document.querySelectorAll('.cell');
    for (const position of array) {
        let string = position[0].toString() + position[1].toString();
        for (const cell of cells) {
            if (cell.getAttribute('id') == string) {
                cell.textContent = array.indexOf(position) + 1;
                cell.style.textAlign = 'center';
                if (!cell.style.backgroundColor) cell.style.backgroundColor = 'yellow';
            }
        }
    }
}