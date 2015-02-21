/**
 * Created by Joan on 21/02/2015.
 */

var width = 900;
var height = 700;

var graphics = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Don't forget to change the data file name!
d3.json("data/europe.json", loadData);

function loadData(error, dataset) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(dataset);
        drawData(dataset);
    }
};

function drawData(dataset) {
    // Draw your data
    var countries = topojson.feature(dataset,dataset.objects.countries).features;

    var mapProjection = d3.geo.albers()
        .center([25, 54])
        .rotate([0, 0]);

    var geoPath = d3.geo.path()
        .projection(mapProjection);

    var color = d3.scale.ordinal()
        .range([
            "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"
        ]);


    graphics.selectAll("path")
        .data(countries)
        .enter()
        .append("path")
        //.attr("class", function(data){
        // console.log(data)
        //        })
        .attr("d", geoPath)
        .style("fill", function(country) {
            return color(country.id);
        })
}