document.addEventListener('DOMContentLoaded', () => {
    // Fetch the CSV file
    fetch('Video_Games.csv')
        .then(response => response.text())
        .then(data => {
            // Process the data
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            console.log(headers);

            let gameListData = [];
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                gameListData[i - 1] = values[0];
            }

            //gameListElement.innerHTML = extractedData;
            let gameList = d3.select("div1");
            gameList.selectAll('p').data(gameListData).join(
                enter => {
                    enter.append('p').text((d, i) => d).on("click", handleGameClick)
                }
            );
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
}