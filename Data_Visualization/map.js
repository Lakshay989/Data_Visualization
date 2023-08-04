// import { handleNAClick, handleEUClick, handleJAClick } from './visuals.js';

document.addEventListener('DOMContentLoaded', () => {
const width = 1100 ;
const height = 650 ;

const svg = d3.select('#mapContainer').append('svg').attr('width', width).attr('height', height);

const projection = d3.geoMercator().scale(140).translate([width/2, height/1.6]) ;

const path = d3.geoPath(projection) ;

const g = svg.append('g') ;
const circle_grp = svg.append('g');
var circleNA = circle_grp.append("circle")
                .attr("cx", 280)
                .attr("cy", 255)
                .attr("r", 100).attr("fill", "red").attr("stroke" , "black").attr("stroke-width","3").attr("fill-opacity" , .35);
circleNA.on("click", handleNAClick); //not calling the function

var circleEU = circle_grp.append("circle")
                .attr("cx", 610)
                .attr("cy", 230)
                .attr("r", 80).attr("fill", "blue").attr("stroke" , "black").attr("stroke-width","3").attr("fill-opacity" , .35);
circleEU.on("click", handleEUClick); //not calling the function

var circleJP = circle_grp.append("circle")
                .attr("cx", 890)
                .attr("cy", 310)
                .attr("r", 25).attr("fill", "green").attr("stroke" , "black").attr("stroke-width","3").attr("fill-opacity" , .35);
circleJP.on("click", handleJAClick); //not calling the function

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')
        .then(data =>
        {
            const countries = topojson.feature(data,data.objects.countries);

            g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d' , path) ;
        })
    .catch(error => console.error('Error fetching the map data:', error));
    });
    