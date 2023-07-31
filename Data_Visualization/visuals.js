document.addEventListener('DOMContentLoaded', () => {
    // Fetch the CSV file
    fetch('Video_Games.csv')
      .then(response => response.text())
      .then(data => {
        // Process the data
        const rows = data.split('\n');
        const headers = rows[0].split(',');
        console.log(headers);
  
        // Replace 'desired_column_name' with the header of the column you want to extract
        const desiredColumnIndex = headers.indexOf('Name');
        if (desiredColumnIndex === -1) {
          console.error('Column not found in CSV data.');
          return;
        }
  
        const gameListElement = document.getElementById('gameList');
        let extractedData = '';
  
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',');
          if (values.length > desiredColumnIndex) {
            extractedData += values[desiredColumnIndex] + '<br>';
          }
        }
  
        gameListElement.innerHTML = extractedData;
      })
      .catch(error => console.error('Error fetching the CSV file:', error));
  });
  