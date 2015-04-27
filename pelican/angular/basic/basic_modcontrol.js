var a = angular.module("streamgraphApp", [], function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }
    );

var myfactory = a.factory('myfactory', function($http, $q) {

    return {
        getData : function() {

            function stream_layers(n, m, o) {
              if (arguments.length < 3) o = 0;
              function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                  var w = (i / m - y) * z;
                  a[i] += x * Math.exp(-w * w);
                }
              }
              return d3.range(n).map(function() {
                  var a = [], i;
                  for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                  for (i = 0; i < 5; i++) bump(a);
                  return a.map(stream_index);
                });
            }
            
            function stream_index(d, i) {
              return {x: i, y: Math.max(0, d)};
            }

            var n = 20, // number of layers
                m = 200; // number of samples per layer

            data = stream_layers(n, m);

            return data;

        }
    }
});

function StreamgraphController($scope,myfactory) {

    $scope.initialize = function() {
        console.log('init');
        var data0 = myfactory.getData();
        var data1 = myfactory.getData();

        $scope.data0 = data0;
        $scope.data1 = data1;
    }
}

// the first few arguments of the list should correspond to the Angular-namespace stuff to feed to HelloController
var c = a.controller("StreamgraphController", ["$scope", "myfactory", StreamgraphController]);

