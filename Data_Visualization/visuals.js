let selectedGame = null
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the CSV file
    fetch('Video_Games_file.csv')
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
                values[5] = parseFloat(values[5])
                values[6] = parseFloat(values[6])
                values[7] = parseFloat(values[7])
                values[9] = parseFloat(values[9])
                if (isNaN(values[5])) {
                    values[5] = "0";
                }
                if (isNaN(values[6])) {
                    values[6] = "0";
                }
                if (isNaN(values[7])) {
                    values[7] = "0";
                }
                if (isNaN(values[9])) {
                    values[9] = "0";
                }
                gameListData[i - 1] = [values[0], values[5], values[6], values[7], values[9]];
      
            }
            //console.log(gameListData);

            //gameListElement.innerHTML = extractedData;
            let gameList = d3.select("div1");
            gameList.selectAll('p').data(gameListData).join(
                enter => {
                    enter.append('p').text((d, i) => d[0]).on("click", handleGameClick)
                }
            );
            //gameList.on("click", handleEUClick);
            
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
        let northamerica_circle = d3.select("#NA");
        northamerica_circle.on("click",function(){
                const list = d3.select('#gameList');
                list.selectAll('p')
                .sort((a, b) => d3.descending(a[1], b[1])).order();
        });

        let europe_circle = d3.select("#EU");
        europe_circle.on("click",function(){
                const list = d3.select('#gameList');
                list.selectAll('p')
                .sort((a, b) => d3.descending(a[2], b[2])).order();
        });

        let japan_circle = d3.select("#JP");
        japan_circle.on("click",function(){
                const list = d3.select('#gameList');
                list.selectAll('p')
                .sort((a, b) => d3.descending(a[3], b[3])).order();
        });
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
        // console.log(a[1])
        // .sort((a, b) => d3.descending(parseFloat(a[1]), parseFloat(b[1])))
        .order();
    // console.log(typeof(elements._groups[0][0].__data__[1]));
}

function handleEUClick(event, data) {
    const list = d3.select(this);
    let elements = list.selectAll('p')
        .sort((a, b) => d3.descending(a[2], b[2]))
        .order();
    console.log(elements);
}

function handleJPClick(event, data) {
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

