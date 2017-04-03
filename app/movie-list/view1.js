'use strict';

app.controller('MoviesCtrl',['$scope','$localStorage','data-adapter',function($scope,$localStorage,DataService) {
	$scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.data = [];
    $scope.showPaginate = true;
    $scope.search = {};
   
    DataService.getMovies()
	    .then(function(movies) {
	        $scope.data = movies;
            $scope.showPaginate = false;
	    },
	    function(data) {
	        console.log('movies retrieval failed.')
	    });


    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);                
    }

    $scope.sortByYear = function() {
        return function(object) {
            return (object.title_year);
        }
    }
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
