document.addEventListener('DOMContentLoaded', () => {
const width = 1000 ;
const height = 650 ;

const svg = d3.select('#mapContainer').append('svg').attr('width', width).attr('height', height);

const projection = d3.geoMercator().scale(140).translate([width/2, height/2]) ;

const path = d3.geoPath(projection) ;

const g = svg.append('g') ;

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')
        .then(data => 
        {
            const countries = topojson.feature(data,data.objects.countries);

            g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d' , path) ;
        })
    .catch(error => console.error('Error fetching the map data:', error));
    });
    