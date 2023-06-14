function formSubmit() {return false;} //Prevents page refresh.

button = document.getElementById("createTable");

button.addEventListener("click", () => {
    /*
        Gather data from the form and convert it from string to float.
        Then round it to the nearest whole number with toFixed, which makes it a string. 
        This allows me to check the length and handle massive numbers.
    */
    var minRow = parseFloat(document.getElementById("minRow").value).toFixed();
    var maxRow = parseFloat(document.getElementById("maxRow").value).toFixed();
    var minCol = parseFloat(document.getElementById("minCol").value).toFixed();
    var maxCol = parseFloat(document.getElementById("maxCol").value).toFixed();
    var table = document.getElementById("table");

    //Resetting the page for the next prompt.
    table.innerHTML = "";
    document.getElementById("minRow").value = "";
    document.getElementById("maxRow").value = "";
    document.getElementById("minCol").value = "";
    document.getElementById("maxCol").value = "";

    var minNum = -50;
    var maxNum = 50;

    //Checking for any huge numbers since it will only read the first number if a huge number is input.
    if (minCol.length > 8) {
        minCol = maxNum;
    }

    if (minRow.length > 8) {
        minRow = maxNum;
    }

    if (maxCol.length > 8) {
        maxCol = maxNum;
    }

    if (maxRow.length > 8) {
        maxRow = maxNum;
    }

    //Turn the inputs into ints so that it can be worked with easier.
    minRow = parseInt(minRow);
    maxRow = parseInt(maxRow);
    minCol = parseInt(minCol);
    maxCol = parseInt(maxCol);

    //Check if minimums are below -50 between all 4 values. The minimum can be adjusted by changing the maxNum variable above.
    if (minCol < minNum) {
        minCol = minNum;
    }

    if (minRow < minNum) {
        minRow = minNum;
    }

    if (maxCol < minNum) {
        maxCol = minNum;
    }

    if (maxRow < minNum) {
        maxRow = minNum;
    }

    //Check if above 50 between all 4 values. The maximum can be adjusted.
    if (minCol > maxNum || minCol.length < 8) {
        minCol = maxNum;
    }

    if (minRow > maxNum) {
        minRow = maxNum;
    }

    if (maxRow > maxNum) {
        maxRow = maxNum;
    }

    if (maxCol > maxNum) {
        maxCol = maxNum;
    }

    //Checks if minimums are lower than maximums.
    if (minRow <= maxRow && minCol <= maxCol) {
        table.appendChild(populateTable(null, minRow, maxRow, minCol, maxCol));
    }
    else {
        if (minRow > maxRow) {
            table.innerHTML = "The <em>minimum row</em> value cannot be <em>smaller than</em> the <em>maximum row</em> value."
        }
        else {
            table.innerHTML = "The <em>minimum column</em> value cannot be <em>smaller than</em> the <em>maximum column</em> value."
        }
    }

    minRow.innerText = "";
})

function populateTable(table, minRow, maxRow, minCol, maxCol) {
    var negCount = 0;
    var offsetCol = 0;
    var offsetRow = 0;

    //Create a new table element to populate.
    if (!table) table = document.createElement('table');

    /*
    Create the table using tr and td. Create text nodes to insert the calculated value.
    I have made the tables start 1 lower than the minimum row/col so that I can insert the header.
    This is shown as the first 3 pieces of the if statements. The top one is if its the top left corner (which should be empty)
    The 2nd down is if its the first row and the 3rd is if it isn't the first row but is the first column. The 4th is basic calculation.
    */
    for (var i = minRow - 1; i <= maxRow; i++) {
        var row = document.createElement('tr');
        for (var j = minCol - 1; j <= maxCol; j++) {
            //Check if the data cell being added is a header (outside row and column) or a regular cell.
            if (i < minRow) {
                var th = document.createElement('th');
                th.setAttribute('class', 'top');
                row.appendChild(th);
            }
            else if (i >= minRow && j < minCol) {
                var th = document.createElement('th');
                th.setAttribute('class', 'side');
                row.appendChild(th);
            }
            else {
                row.appendChild(document.createElement('td'));
            }

            //check if negative j
            if (j < 0) {
                if(i < minRow && j < minCol) {
                    row.cells[negCount].appendChild(document.createTextNode(""));
                }
                else if(i < minRow) {
                    row.cells[negCount].appendChild(document.createTextNode(minCol + offsetCol));
                    offsetCol++;
                }
                else if(j < minCol && i >= minRow) {
                    row.cells[negCount].appendChild(document.createTextNode(minRow + offsetRow));
                    offsetRow++;
                }
                else {
                    row.cells[negCount].appendChild(document.createTextNode(i * j));
                }
                negCount++;
            }
            else {
                if(i < minRow && j < minCol) {
                    row.cells[j - minCol + 1].appendChild(document.createTextNode(""));
                }
                else if(i < minRow) {
                    row.cells[j - minCol + 1].appendChild(document.createTextNode(minCol + offsetCol));
                    offsetCol++;
                }
                else if(j < minCol && i >= minRow) {
                    row.cells[j - minCol + 1].appendChild(document.createTextNode(minRow + offsetRow));
                    offsetRow++;
                }
                else {
                    row.cells[j - minCol + 1].appendChild(document.createTextNode(i * j));
                }
            }
        }
        negCount = 0;
        offsetCol = 0;
        table.appendChild(row);
    }
    return table;
}