document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
})

button = document.getElementById("createTable");

button.addEventListener("click", () => {
    //Gather data from the form, convert it from string to float, then round it to the nearest whole number.
    var minRow = parseFloat(document.getElementById("minRow").value).toFixed();
    var maxRow = parseFloat(document.getElementById("maxRow").value).toFixed();
    var minCol = parseFloat(document.getElementById("minCol").value).toFixed();
    var maxCol = parseFloat(document.getElementById("maxCol").value).toFixed();
    var table = document.getElementById("table");

    //Check if minimums are less than -50 and if maximums are greater than 50. These can change if desired.
    if (minRow < -50) {
        minRow = -50;
    }

    if (maxRow > 50) {
        maxRow = 50;
    }

    if (minCol < -50) {
        minCol = -50;
    }

    if (maxCol > 50) {
        maxCol = 50;
    }

    //Checks if minimums are lower than maximums.
    if (minRow <= maxRow && minCol <= maxCol) {
        table.appendChild(populateTable(null, minRow, maxRow, minCol, maxCol));
    }
    else {
        //TODO: Give some feedback that it isn't right
        console.log("minRow or minCol is smaller than max counterpart");
    }
})

function populateTable(table, minRow, maxRow, minCol, maxCol) {
    var negCount = 0;

    //Create a new table element to populate.
    if (!table) table = document.createElement('table');

    //TODO: Add heading to table.

    //Create the table using tr and td. Create text nodes to insert the calculated value.
    for (var i = minRow; i <= maxRow; i++) {
        var row = document.createElement('tr');
        for (var j = minCol; j <= maxCol; j++) {
            row.appendChild(document.createElement('td'));
            //check if negative j
            if (j < 0) {
                row.cells[negCount].appendChild(document.createTextNode(i * j));
                negCount++;
            }
            else {
                row.cells[j - minCol].appendChild(document.createTextNode(i * j));
            }
        }
        negCount = 0;
        table.appendChild(row);
    }
    return table;
}