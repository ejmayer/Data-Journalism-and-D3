var svgWidth = 1050;
var svgHeight = 750;
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("../assets/data/data.csv").then(function(stateData) {

    // Parse Data
    // ==============================
    // verify load
     console.log(stateData);
  
    // log a list of states
    var states = stateData.map(data => data.abbr);
    console.log("states", states);
  
    // log a list of ages
    var stateAbbrs = stateData.map(data => data.abbr);
    console.log("ST's", stateAbbrs);
   
    // log a list of obesity rates
    var obesityRates = stateData.map(data => data.obesity);
    console.log("obesity rates", obesityRates);

    // Cast each value in data as a number using the unary + operator
    stateData.forEach(function(data) {

      data.age= +data.age;
      data.obesity = +data.obesity;
      data.abbr = data.abbr;
      data.state = data.state;

      console.log("State:", data.abbr);
      console.log("ST ", data.state);
      console.log("Age:", data.age);
      console.log("Obesity:", data.obesity);
      
    // Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(stateData, d => d.obesity)])
      .range([0, width]);
    var yLinearScale = d3.scaleLinear()
      .domain([28, d3.max(stateData, d => d.age)])
      .range([height, 0]);

      console.log("Scale age ", data.age);
      console.log("Scale obesity ", data.obesity);

    // Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.age))
    .attr("r", "20")
    .attr("fill", "red")
    .attr("opacity", ".5")
    .text( function (d) { return  d.abbr; });
    
    //Add the SVG Text Element to the svgContainer
    var text = svg.selectAll("text")
    .data(stateData)
    .enter()
    .append("text");
    
    //Add SVG Text Element Attributes
    var textLabels = text
    .attr("abbr", function(d) { return d.abbr; })
    .text( function (d) { return d.abbr; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black");

    // Create text for circles
    var circleText = chartGroup.selectAll("null")
        .data(stateData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.obesity))
        .attr("y", d => yLinearScale(d.age))
        .attr("dy", "6")
        .attr("dx", "-10")
        .text(d => d.abbr);

    // Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Age: ${d.age}<br>Obesity Rates: ${d.obesity}`);
      });

    // Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })

      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Avg Age");
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Avg Obesity Rates (%)");
      

  }).catch(function(error) {
    console.log(error);
  });

}); 