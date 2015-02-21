var width = 900;
var height = 700;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var mapProjection = d3.geo.albers()
    .center([0, 54])
    .rotate([0, 0])
    .scale(3000)


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
    var subunits = topojson.feature(dataset,dataset.objects.countries).features;
    //var ukSubunits = subunits.filter(function(subunit){
    //    return subunit.properties.part_of == "GBR"
    //});

     var geoPath = d3.geo.path()
        .projection(mapProjection);

    var color = d3.scale.ordinal()
        .domain(["ENG", "SCT", "WLS", "NIR"])
        .range([
            "#dcd", "#ddc", "#cdd", "#cdc"
        ]);


    graphics.selectAll("path")
        .data(subunits)
        .enter()
        .append("path")
        //.attr("class", function(data){
           // console.log(data)
        //        })
        .attr("d", geoPath)
        .style("fill", function(subunit){
            return color(subunit.id);
        })
    d3.json("data/usersGraph.json", loadUserData);
}



function loadUserData(error, dataset) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(dataset);
        drawUserData(dataset);
    }
};

function getLongitude(tweet){
    return tweet.geo.coordinates[1]
}

function getLatitude(tweet){
    return tweet.geo.coordinates[0]
}

function drawUserData(dataset) {
    console.log(dataset);
    console.log(mapProjection([0.1275, 51.5072]));

    graphics.append("circle")
        .attr("r", 2)
        .attr("transform", "translate("+mapProjection([0.1275, 51.5072])+")");

    graphics.append("text")
        .text("LONDON")
        .attr("x", 486)
        .attr("y", 376.2391150548333)

    graphics.selectAll(".tweet")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("class", "tweet")
        .attr("r", 2.5)
        .style("fill", "#800014")
        .attr("transform", function(user) {
            var longitude = user.tweets[0].geo.coordinates[1];
            var latitude = user.tweets[0].geo.coordinates[0];
            var coordinates = [longitude, latitude];
            return "translate("+mapProjection(coordinates)+")";
        })

        .style("opacity", 0.5)

    for (var i = 0; i < dataset.nodes.length; i++) {
        var user = dataset.nodes[i];
        var coordinates = [d3.mean(user.tweets, getLongitude), d3.mean(user.tweets, getLatitude)];
        user.geo = coordinates;
    }

    graphics.selectAll(".link")
        .data(dataset.links)
        .enter()
        .append("line")
        .style("stroke", "#999")
        .style("opacity", 0.1)
        .attr("x1", function(link) {
            return mapProjection(dataset.nodes[link.source].geo)[0];
        })
        .attr("y1", function(link){
            return mapProjection(dataset.nodes[link.source].geo)[1];
            })
        .attr("x2", function(link) {
            return mapProjection(dataset.nodes[link.target].geo)[0];
        })
        .attr("y2", function(link) {
            return mapProjection(dataset.nodes[link.target].geo)[1];
        })
}

