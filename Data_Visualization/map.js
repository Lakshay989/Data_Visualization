// import { handleNAClick, handleEUClick, handleJAClick } from './visuals.js';

// const { text } = require("d3");
let textgrp = null;
document.addEventListener('DOMContentLoaded', () => {
const width = 1100 ;
const height = 650 ;

const svg = d3.select('#mapContainer').append('svg').attr('width', width).attr('height', height);

const projection = d3.geoMercator().scale(140).translate([width/2, height/1.6]) ;

const path = d3.geoPath(projection) ;

const g = svg.append('g').attr('id','map-paths') ;
const circle_grp = svg.append('g');

var circleNA = circle_grp.append("circle")
                .attr("cx", 280)
                .attr("cy", 255)
                .attr("r", 100)
                .attr("fill", "red")
                .attr("stroke" , "black")
                .attr("stroke-width","3")
                .attr("fill-opacity" , .35)
                .attr('id',"NA");

                circleNA.on("click", handleNAClick); //not calling the function

var circleEU = circle_grp.append("circle")
                .attr("cx", 610)
                .attr("cy", 230)
                .attr("r", 80).attr("fill", "blue").attr("stroke" , "black").attr("stroke-width","3").attr("fill-opacity" , .35);
circleEU.on("click", handleEUClick).attr('id','EU'); //not calling the function

var circleJP = circle_grp.append("circle")
                .attr("cx", 890)
                .attr("cy", 310)
                .attr("r", 30).attr("fill", "green").attr("stroke" , "black").attr("stroke-width","3").attr("fill-opacity" , .35)
                .attr('id','JP');


//circleJP.on("click", handleJAClick); //not calling the function
textgrp = d3.select('svg').append('g');
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')
        .then(data =>
        {
            const countries = topojson.feature(data,data.objects.countries);

            g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d' , path) ;
        })
    .catch(error => console.error('Error fetching the map data:', error));
    });
    
function selectedGameDisplay(selectedGames)
{
    
    const text_grp = d3.select('svg').append('g');
    let values = [selectedGames[1],selectedGames[2],selectedGames[3]]
    // console.log(values)
    // var textNA = text_grp.join("text").attr("x" , 20).attr("y" , 40).attr("class", "small").data(selectedGames).text("TESTING");
    textgrp.selectAll('text').data(values).join('text').attr("font-size", "32").attr('x',(d,i)=>{
                    if(i==0){
                        return 200;
                    }
                    if(i==1)
                        return 550;
                    return 865;
            }).attr('y',(d,i)=>{
                if (i==0)
                    return 280;
                if (i==1)
                    return 250;
                return 320;
            }).attr("font-size", (d,i)=>{
                if (i==0)
                return 78;
            if (i==1)
                return 64;
            return 28;
            }).text(d=>d)
    console.log(selectedGames)
}