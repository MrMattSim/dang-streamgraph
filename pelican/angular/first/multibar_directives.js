var ng;
dir = [];


//////////////////////////////////////
//
// Multi Bar Directives
//
// <multi-bar-head>
// <multi-bar-chart>
//
//////////////////////////////////////





//////////////////////////////////////
// Multi Bar Header 
//

ng = a.directive('multiBarHead', function($compile) {

    function link(scope, element, attr) {

        var el = $("div#head");

        $(el).empty();

        var h1 = $("<h1 />")
            .appendTo(el);

        var b = $("<b />")
            .text("Multi Bar Chart")
            .appendTo(h1);

    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});
dir.push(ng);




//////////////////////////////////////
// Multi Bar Chart
//


ng = a.directive('multiBarChart', function($compile) {

    function link(scope, element, attr) {

        scope.$parent.$watch('myData',doStuff);

        function doStuff() { 
            if(!scope.$parent.myData) { return }
            updateChart(element, scope.$parent.myData);
        }

    };

    function updateChart(element,data) { 

        console.log('in updateChart()');

        var el = element[0];


        ///////////////////////////////////
        // now draw the bar chart with d3 
        // 

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 800 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        
        var x = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeRoundBands([0, width], .1);
        
        var y = d3.scale.linear()
            .range([height, 0]);
        
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");


        // create the canvas
        //
        var svg = d3.select(el).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
        


        // all bars

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class","bar")
            .attr("transform",function(d,i) { 
                return "translate(" + x(d.letter) + ",0)";
            })

        //var color = d3.scale.category20b();
        //var color = d3.scale.category20c();
        range10 = Array.apply(null, Array(10)).map(function (_, i) {return i;});
        var color = d3.scale.category10()
                    .domain(range10);

        // width of each x quantity = x.rangeBand()
        // width of bands = x.rangeBand()/2
        // x location of bands = 0 (default) for firstletterfrequency)
        // x location of bands = x.rangeBand/2 for frequency (starts halfway thru)



        var color_ix = {};
        color_ix['firstletterfrequency'] = 6;
        color_ix['frequency']            = 0;

        var clss;



        // first letter frequency bar chart

        clss = 'firstletterfrequency';
        bar.append("rect")
            .attr("class", clss)
            //.attr("x", x.rangeBand() / 2)
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) { return y(d[clss]); })
            .attr("height", function(d) { return height - y(d[clss]); })
            .attr("fill", function(d){ return color( color_ix[clss] ) })
            .attr("opacity",0.90);


        // total occurence frequency bar chart

        clss = 'frequency';
        bar.append("rect")
            .attr("class", clss)
            .attr("x", x.rangeBand() / 2)
            //.attr("x", function(d) { return x(d.letter); })
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) { return y(d[clss]); })
            .attr("height", function(d) { return height - y(d[clss]); })
            .attr("fill",function(d){ return color( color_ix[clss] ) })
            .attr("opacity",0.90);


        // x axis

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        
        // y axis

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("y", -8)
            .attr("dy", "0.0em")
            .style("text-anchor", "middle")
            .text("Frequency");
        




        var legend_txt = {};
        legend_txt['firstletterfrequency'] = "First Letter Frequency";
        legend_txt['frequency']            = "Total Frequency";


        // add legend   
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 100);
//            .attr('transform', 'translate(-20,50)')    
          

        legend_entries = Object.keys(data[0]);

        // remove x-axis key "letter"
        legend_entries.splice( legend_entries.indexOf('letter') , 1);

        legend.selectAll('text')
            .data(legend_entries)
            .enter()
            .append("rect")
            .attr("x", width - 165)
            .attr("y", function(d,i){ return y(0.104+0.015*i) })
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d) { 
                return color( color_ix[d] );
            })
          
        legend.selectAll('text')
            .data(legend_entries)
            .enter()
            .append("text")
            .attr("id","legendtext")
            .attr("x", width - 150)
            .attr("y", function(d,i){ return y(0.10 + 0.015*i) })
            .text(function(d) {
                var txt = legend_txt[d];
                return txt;
            });
        




        function type(d) {
            d.frequency = +d.frequency;
            return d;
        }


    };

    return {
        link: link,
        restrict: "E",
        scope: {}
    };

});
dir.push(ng);



