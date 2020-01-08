// // SVG wrapper dimensions are determined by the current width
// // and height of the browser window.
// var svgWidth = 1200;
// var svgHeight = 660;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3.select(".chart")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);


  // Import Data
  d3.csv("../assets/data/data.csv").then(function(stateData) {

    console.log(stateData);
  
    // log a list of states
    var states = stateData.map(data => data.state);
    console.log("states", states);
  
    // log a list of ages
    var ages = stateData.map(data => data.age);
    console.log("ages", ages);
   
    // log a list of obesity rates
    var obesityRates = stateData.map(data => data.obesity);
    console.log("obesity rates", obesityRates);

    // Cast each hours value in tvData as a number using the unary + operator
    stateData.forEach(function(data) {
      data.age = +data.age;
      console.log("State:", data.state);
      console.log("Age:", data.age);
      console.log("Obesity:", data.obesity);

    });
  }).catch(function(error) {
    console.log(error);
  });
  