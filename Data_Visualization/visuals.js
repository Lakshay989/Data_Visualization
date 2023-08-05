let selectedGame = null
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the CSV file
    fetch('Video_Games.csv')
        .then(response => response.text())
        .then(data => {
            // Process the data
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            // console.log(headers);
            // console.log(rows)
            // console.log(rows[1].split(','))

            //NA sales = 5
            //EU sales = 6
            //JA sales = 7
            //global sales = 9
            let gameListData = [];
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                if (isNaN(parseFloat(values[5]))) {
                    values[5] = "0";
                }
                if (isNaN(parseFloat(values[6]))) {
                    values[6] = "0";
                }
                if (isNaN(parseFloat(values[7]))) {
                    values[7] = "0";
                }
                if (isNaN(parseFloat(values[9]))) {
                    values[9] = "0";
                }
                gameListData[i - 1] = [values[0], values[5], values[6], values[7], values[9]];
            }
            // console.log(gameListData);

            //gameListElement.innerHTML = extractedData;
            let gameList = d3.select("div1");
            gameList.selectAll('p').data(gameListData).join(
                enter => {
                    enter.append('p').text((d, i) => d[0]).on("click", handleGameClick)
                }
            );
            // gameList.on("click", handleNAClick);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
});

//changes the color of the game name when the game is selected
let lastSelection;
function handleGameClick(event, data) {

    //get the element to select
    let element = d3.select(this);
    let isElementSelected = element.classed("selected");

    //if the element is already selected, deselect
    if (isElementSelected) {
        element.classed("selected", false);
    }

    //if the element is not selected, select it. Deselect previous selection
    else {
        if (lastSelection) {
            lastSelection.classed("selected", false);
        }
        element.classed("selected", true);
    }
    lastSelection = element;

    // console.log(lastSelection._groups[0][0].__data__)
    selectedGame = lastSelection._groups[0][0].__data__
    selectedGameDisplay(selectedGame)
    
    // data.sort(function(a, b) {
    //     return d3.ascending(a[0], b[0])
    // });
}

function handleNAClick(event, data) {
    const list = d3.select(this);
    let elements = list.selectAll('p')
        .sort((a, b) => d3.descending(a[1], b[1]))
        .order();
    console.log(elements);
}

function handleEUClick(event, data) {
    const list = d3.select(this);
    let elements = list.selectAll('p')
        .sort((a, b) => d3.descending(a[2], b[2]))
        .order();
    console.log(elements);
}

function handleJAClick(event, data) {
    const list = d3.select(this);
    let elements = list.selectAll('p')
        .sort((a, b) => d3.descending(a[3], b[3]))
        .order();
    console.log(elements);
}

function handleGlobalClick(event, data) {
    const list = d3.select(this);
    let elements = list.selectAll('p')
        .sort((a, b) => d3.descending(a[4], b[4]))
        .order();
    console.log(elements);
}

