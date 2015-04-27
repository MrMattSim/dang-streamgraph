var a = angular.module("multiApp", [], function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }
    );

var myfactory = a.factory('myfactory', function($http, $q) {

    return {
        getData : function() {

            return [
                { 'letter' : 'A', 'firstletterfrequency' : 0.11602, 'frequency' : .08167 }, 
                { 'letter' : 'B', 'firstletterfrequency' : 0.04702, 'frequency' : .01492 },
                { 'letter' : 'C', 'firstletterfrequency' : 0.03511, 'frequency' : .02782 },
                { 'letter' : 'D', 'firstletterfrequency' : 0.02670, 'frequency' : .04253 },
                { 'letter' : 'E', 'firstletterfrequency' : 0.02007, 'frequency' : .12702 },
                { 'letter' : 'F', 'firstletterfrequency' : 0.03779, 'frequency' : .02288 },
                { 'letter' : 'G', 'firstletterfrequency' : 0.01950, 'frequency' : .02015 },
                { 'letter' : 'H', 'firstletterfrequency' : 0.07232, 'frequency' : .06094 },
                { 'letter' : 'I', 'firstletterfrequency' : 0.06286, 'frequency' : .06966 },
                { 'letter' : 'J', 'firstletterfrequency' : 0.00597, 'frequency' : .00153 },
                { 'letter' : 'K', 'firstletterfrequency' : 0.00590, 'frequency' : .00772 },
                { 'letter' : 'L', 'firstletterfrequency' : 0.02705, 'frequency' : .04025 },
                { 'letter' : 'M', 'firstletterfrequency' : 0.04374, 'frequency' : .02406 },
                { 'letter' : 'N', 'firstletterfrequency' : 0.02365, 'frequency' : .06749 },
                { 'letter' : 'O', 'firstletterfrequency' : 0.06264, 'frequency' : .07507 },
                { 'letter' : 'P', 'firstletterfrequency' : 0.02545, 'frequency' : .01929 },
                { 'letter' : 'Q', 'firstletterfrequency' : 0.00173, 'frequency' : .00095 },
                { 'letter' : 'R', 'firstletterfrequency' : 0.01653, 'frequency' : .05987 },
                { 'letter' : 'S', 'firstletterfrequency' : 0.07755, 'frequency' : .06327 },
                { 'letter' : 'T', 'firstletterfrequency' : 0.16671, 'frequency' : .09056 },
                { 'letter' : 'U', 'firstletterfrequency' : 0.01487, 'frequency' : .02758 },
                { 'letter' : 'V', 'firstletterfrequency' : 0.00649, 'frequency' : .00978 },
                { 'letter' : 'W', 'firstletterfrequency' : 0.06753, 'frequency' : .02360 },
                { 'letter' : 'X', 'firstletterfrequency' : 0.00017, 'frequency' : .00150 },
                { 'letter' : 'Y', 'firstletterfrequency' : 0.01620, 'frequency' : .01974 },
                { 'letter' : 'Z', 'firstletterfrequency' : 0.00034, 'frequency' : .00074 }
            ];
        }
    }
});

function MultiBarController($scope,myfactory) {
    $scope.initialize = function() {
        var data = myfactory.getData();
        $scope.myData = data;
    }
}

// the first few arguments of the list should correspond to the Angular-namespace stuff to feed to HelloController
var c = a.controller("MultiBarController", ["$scope", "myfactory", MultiBarController]);


