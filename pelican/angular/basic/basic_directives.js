var ng;
dir = [];


//////////////////////////////////////
//
// Streamgraph Directives
//
// <streamgraph-head>
// <streamgraph-chart>
//
//////////////////////////////////////





//////////////////////////////////////
// Streamgraph Header 
//

ng = a.directive('streamgraphHead', function($compile) {

    function link(scope, element, attr) {

        var el = $("div#head");

        $(el).empty();

        var h1 = $("<h1 />")
            .appendTo(el);

        var b = $("<b />")
            .text("Streamgraph Chart")
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
// Streamgraph Chart
//


ng = a.directive('streamgraphChart', function($compile) {

    function link(scope, element, attr) {

        scope.$parent.$watch('data0',doStuff);

        function doStuff() { 
            if(!scope.$parent.data0) { return }
            buildChart(element, scope.$parent.data0, scope.$parent.data1, scope.$parent);
        }

    };

    function buildChart(element,data0,data1,pscope) {

        console.log('in buildChart()');

        var el = element[0];


        ///////////////////////////////////
        // build the streamgraph chart with d3 



        // -------
        // data-independent stuff
        // (nothing needed)
        // (all done in streamgraph function)
        // -------


        // -------
        // 

        //var colors = d3.range(data0.length).map(function() { return d3.interpolateRgb("#aad", "#556")(Math.random()); });
        //        .color(function(d, i) { return colors[i]; }) // use same colors for both data sets

        var streamgraph = streamgraphChart()
                .margin({top: 10, right: 10, bottom: 10, left: 10})
                .transitionDuration(750);
        d3.select(el)
                .datum(data0)
                .call(streamgraph);


        pscope.transition = function() { 
            d3.select(el)
                .datum(function() {
                    var d = data1;
                    data1 = data0;
                    return data0 = d;
                })
                .call(streamgraph);
        }


        // --------------
        // button control

        var div = $("<div />");
        var btn = $("<a />",{
                'class' : 'btn btn-large btn-primary',
                'id' : 'transition'
            })
            .text("Transition()")
            .appendTo(div);


        angular.element(el).prepend($compile(div)(pscope));

        d3.selectAll("a#transition")
            .on('click',function() {
                console.log('here');
                pscope.transition();
            });



    };

    return {
        link: link,
        restrict: "E",
        scope: {}
    };

});
dir.push(ng);






function streamgraphChart() {

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 500,
        height = 400,
        transitionDuration = 1000,
        color = function() { return d3.interpolateRgb("#ada", "#565")(Math.random()); };

    var streamgraph =  d3.layout.stack().offset("wiggle");

    function chart(selection) {
        selection.each(function(data) {

            // Compute the streamgraph.
            data = streamgraph(data);

            var mx = data[0].length - 1, // assumes that all layers have same # of samples & that there is at least one layer
                my = d3.max(data, function(d) {
                    return d3.max(d, function(d) {
                        return d.y0 + d.y;
                    });
                });

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            // Otherwise, create the skeletal chart.
            var gEnter = svg.enter().append("svg").append("g");

            // Update the outer dimensions.
            svg .attr("width", width)
                .attr("height", height);

            // Update the inner dimensions.
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Update the streamgraph
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            var area = d3.svg.area()
                .x(function(d) { return d.x * availableWidth / mx; })
                .y0(function(d) { return availableHeight - d.y0 * availableHeight / my; })
                .y1(function(d) { return availableHeight - (d.y + d.y0) * availableHeight / my; });

            var path = g.selectAll("path").data(data);

            path.enter().append("path");
            path.exit().remove();
            path.style("fill", color).transition().duration(transitionDuration).attr("d", area);
        });
    }

    chart.color = function(_) {
        if (!arguments.length) return color;
        color = _;
        return chart;
    };

    chart.transitionDuration = function(_) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _;
        return chart;
    };

    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    return chart;
}

