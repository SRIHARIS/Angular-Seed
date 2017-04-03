app.service('data-adapter',function($http,$q,$indexedDB,$localStorage){
	var service = {
        movies: [],
        getMovies: getMovies
    };
    function getMovies(){
	    var def = $q.defer();
        if($localStorage.movies == undefined) {
            $http.get("http://starlord.hackerearth.com/simility/movieslisting")
            .then(function(response) {
                service.movies = response.data;
                $localStorage.movies = response.data;
                def.resolve(response.data);
                
            },function() {
                def.reject("Failed to get Movies");
            });    
        }else{
            def.resolve(($localStorage.movies));
        }
        
        return def.promise;
	}
	return service;
});