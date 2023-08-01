// async function loadData () {
//     const covidData = await d3.csv('data/owid-covid.csv');
//     const mapData = await d3.json('world.json');
//     return { covidData, mapData };
//   }

//   const connectedState = {
//     selectedGame: null,
//     covidData: null,
//     mapData: null,
//     worldMap: null,
//     gamesList: null,
//   };

//   loadData().then((loadedData) => {
//     console.log('Here is the imported data:', loadedData.covidData);

//     connectedState.mapData = loadedData.mapData;

//   // Creates the view objects with the global state passed in 
//     const worldMap = new MapVis(connectedState);

//     connectedState.worldMap = worldMap;

// });