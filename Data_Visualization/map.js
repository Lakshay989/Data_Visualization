// /** Class representing the map view. */
// class MapVis {
//     /**
//      * Creates a Map Visuzation
//     //  * @param connectedState The shared global application state (has the data and the line chart instance in it)
//     //  */
//     constructor(connectedState) {
//        this.connectedState = connectedState;
  
//       // Set up the map projection
//       const projection = d3.geoWinkel3()
//         .scale(150) // This set the size of the map
//         .translate([400, 250]); // This moves the map to the center of the SVG
//         let path = d3.geoPath().projection(projection);
//         console.log(this.connectedState.mapData);
//         let geojson = topojson.feature(this.connectedState.mapData,this.connectedState.mapData.objects.countries)

//         let svgselection = d3.select("#countries");
//         for(let i = 0;i<geojson.features.length;i++){
//           geojson.features[i].maxcases = -99;
//           if(geojson.features[i].id !== '-99'){
//             let country = this.connectedState.covidData.filter(data => data.iso_code === geojson.features[i].id);
//             let max_cases = Math.max.apply(Math,country.map(function(data){return Number(data.total_cases_per_million);}));    
//             geojson.features[i].maxcases = max_cases;
//           }
//         }
        
//         let maxcase = d3.max(geojson.features,function(d){return d.maxcases;});
//         //Color scale for map
//         var color = d3.scaleQuantize()
//                       .range(["rgb(254,240,217)", "rgb(253,204,138)",
//                       "rgb(252,141,89)", "rgb(227,74,51)", "rgb(179,0,0)"])
//                       .domain([0,maxcase]);
//         console.log(color.domain());
    
//         //path for countries
//         svgselection.selectAll("path")
//                     .data(geojson.features)
//                     .enter()
//                     .append("path")
//                     .attr("d",path)
//                     .attr("name",function(d){return d.id;})
//                     .attr("class","country")
//                     .style("fill",function(d){
//                       let cases = d.maxcases;
//                       if(cases !== -99)
//                       {
//                         return color(cases);
//                       }
//                       else{
//                         return "#ccc";
//                       }
//                     });
//         //GRATICULE            
//         let graticule = d3.geoGraticule();       
//         let graticuletag = d3.select("#graticules");
//         graticuletag.append("path")
//                     .attr('d',path(graticule()))
//                     .attr("fill",'none')
//                     .attr('stroke','black')
//                     .style('opacity',0.2);
//         graticuletag.append("path")
//                     .attr('d',path(graticule.outline()))
//                     .attr("fill",'none')
//                     .attr('stroke','black')
//                     .style('opacity',1);

//     }
  
//     }

//
// Configuration
//

// ms to wait after dragging before auto-rotating
// var rotationDelay = 3000
// // scale of the globe (not the canvas element)
// var scaleFactor = 0.9
// // autorotation speed
// var degPerSec = 6
// // start angles
// var angles = { x: -20, y: 40, z: 0}
// // colors
// var colorWater = '#fff'
// var colorLand = '#111'
// var colorGraticule = '#ccc'
// var colorCountry = '#a00'

// ------------------------
//
// Handler
//

// function enter(country) {
//   var country = countryList.find(function(c) {
//     return parseInt(c.id, 10) === parseInt(country.id, 10)
//   })
//   current.text(country && country.name || '')
// }

// function leave(country) {
//   current.text('')
// }

// //
// // Variables
// //

// var current = d3.select('#current')
// var canvas = d3.select('#globe')
// var context = canvas.node().getContext('2d')
// var water = {type: 'Sphere'}
// var projection = d3.geoOrthographic().precision(0.1)
// var graticule = d3.geoGraticule10()
// var path = d3.geoPath(projection).context(context)
// var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
// var r0 // Projection rotation as Euler angles at start.
// var q0 // Projection rotation as versor at start.
// var lastTime = d3.now()
// var degPerMs = degPerSec / 1000
// var width, height
// var land, countries
// var countryList
// var autorotate, now, diff, roation
// var currentCountry

// //
// // Functions
// //

// function setAngles() {
//   var rotation = projection.rotate()
//   rotation[0] = angles.y
//   rotation[1] = angles.x
//   rotation[2] = angles.z
//   projection.rotate(rotation)
// }

// function scale() {
//   width = document.documentElement.clientWidth
//   height = document.documentElement.clientHeight
//   canvas.attr('width', width).attr('height', height)
//   projection
//     .scale((scaleFactor * Math.min(width, height)) / 2)
//     .translate([width / 2, height / 2])
//   render()
// }

// function startRotation(delay) {
//   autorotate.restart(rotate, delay || 0)
// }

// function stopRotation() {
//   autorotate.stop()
// }

// function dragstarted() {
//   v0 = versor.cartesian(projection.invert(d3.mouse(this)))
//   r0 = projection.rotate()
//   q0 = versor(r0)
//   stopRotation()
// }

// function dragged() {
//   var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
//   var q1 = versor.multiply(q0, versor.delta(v0, v1))
//   var r1 = versor.rotation(q1)
//   projection.rotate(r1)
//   render()
// }

// function dragended() {
//   startRotation(rotationDelay)
// }

// function render() {
//   context.clearRect(0, 0, width, height)
//   fill(water, colorWater)
//   stroke(graticule, colorGraticule)
//   fill(land, colorLand)
//   if (currentCountry) {
//     fill(currentCountry, colorCountry)
//   }
// }

// function fill(obj, color) {
//   context.beginPath()
//   path(obj)
//   context.fillStyle = color
//   context.fill()
// }

// function stroke(obj, color) {
//   context.beginPath()
//   path(obj)
//   context.strokeStyle = color
//   context.stroke()
// }

// function rotate(elapsed) {
//   now = d3.now()
//   diff = now - lastTime
//   if (diff < elapsed) {
//     rotation = projection.rotate()
//     rotation[0] += diff * degPerMs
//     projection.rotate(rotation)
//     render()
//   }
//   lastTime = now
// }

// function loadData(cb) {
//   d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function(error, world) {
//     if (error) throw error
//     d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function(error, countries) {
//       if (error) throw error
//       cb(world, countries)
//     })
//   })
// }

// // https://github.com/d3/d3-polygon
// function polygonContains(polygon, point) {
//   var n = polygon.length
//   var p = polygon[n - 1]
//   var x = point[0], y = point[1]
//   var x0 = p[0], y0 = p[1]
//   var x1, y1
//   var inside = false
//   for (var i = 0; i < n; ++i) {
//     p = polygon[i], x1 = p[0], y1 = p[1]
//     if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
//     x0 = x1, y0 = y1
//   }
//   return inside
// }

// function mousemove() {
//   var c = getCountry(this)
//   if (!c) {
//     if (currentCountry) {
//       leave(currentCountry)
//       currentCountry = undefined
//       render()
//     }
//     return
//   }
//   if (c === currentCountry) {
//     return
//   }
//   currentCountry = c
//   render()
//   enter(c)
// }

// function getCountry(event) {
//   var pos = projection.invert(d3.mouse(event))
//   return countries.features.find(function(f) {
//     return f.geometry.coordinates.find(function(c1) {
//       return polygonContains(c1, pos) || c1.find(function(c2) {
//         return polygonContains(c2, pos)
//       })
//     })
//   })
// }


// //
// // Initialization
// //

// setAngles()

// canvas
//   .call(d3.drag()
//     .on('start', dragstarted)
//     .on('drag', dragged)
//     .on('end', dragended)
//    )
//   .on('mousemove', mousemove)

// loadData(function(world, cList) {
//   land = topojson.feature(world, world.objects.land)
//   countries = topojson.feature(world, world.objects.countries)
//   countryList = cList
  
//   window.addEventListener('resize', scale)
//   scale()
//   autorotate = d3.timer(rotate)
// })
  

const width = 900 ;
const height = 600 ;

const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

const projection = d3.geoMercator().scale(140).translate([width/2, height/1.4]) ;

const path = d3.geoPath(projection) ;

const g = svg.append('g') ;

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')
        .then(data => 
        {
            const countries = topojson.feature(data,data.objects.countries);

            g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d' , path) ;

        }) ;