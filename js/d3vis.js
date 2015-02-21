// Let's draw something

var body = d3.select("body");

var graphics = body.append("svg");
graphics. attr("width", 900);
graphics. attr("height", 600);

graphics.append("circle")
    .attr("r", 15)
    .attr("cx", 20)
    .attr("cy", 20);

graphics.append("rect")
    .attr("x", 40)
    .attr("y", 20)
    .attr("height", 30)
    .attr("width", 50);

graphics.append("line")
    .attr("x1", 100)
    .attr("y1", 50)
    .attr("x2", 180)
    .attr("y2", 10)
    .attr("stroke", "#000000")
    .attr("stroke-width", 2);
0
graphics.append("text")
    .text("I am drawing!")
    .attr("x", 190)
    .attr("y", 30)

graphics. append("circle")
    .attr("r", 40)
    .attr("cx", 400)
    .attr("cy", 400)
    .style("fill", "#4682B4")
    .style("stroke", "#CCCCCC")
    .style("stroke-width", "3px")
    .style("opacity", "0.5")

graphics.append("text")
    .text("I am drawing!")
    .attr("x", 200)
    .attr("y", 200)
    .attr("text-anchor", "end")
    .attr("transform", "rotate(45, 300, 300)");


//smile

var arc = d3.svg.arc()
    .innerRadius(80)
    .outerRadius(100)
    .startAngle(2)
    .endAngle(3);

graphics.append("path")
    .attr("d", arc)
    .attr("transform", "translate(200,200");