'use strict';

app.controller('BudgetCtrl', ['$scope','data-adapter',function($scope,DataService) {

	$scope.options = {
			title: {
			        enable: true,
			        text: 'Movie Budgets'
			},
            chart: {
                type: 'multiBarHorizontalChart',
                height: 1150,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Budget',
                    axisLabelDistance: 30,
                    tickFormat: function(d){
                        return d3.format(',.1f$')(d);
                    }
                },
                color : function (d, i) {
		            var key = i === undefined ? d : i;
		            return d.color || color_scale(key);
		        }
            }
        };

        DataService.getMovies()
	    .then(function(movies) {
	        $scope.data = [processData(movies.splice(0,40))];
	    },
	    function(data) {
	        console.log('movies retrieval failed.')
	    });

	    function processData(movies){
	    	var chart_data = {
	    		"key": "Budget",
                "color": "#d62728",
                values : []
	    	}
	    	$.each(movies,function(idx,el){
	    		 chart_data.values.push({
	    		 	label : el['movie_title'],
	    		 	value : el['budget'],
	    		 });
	    	})
	    	return chart_data;
	    }
}]);