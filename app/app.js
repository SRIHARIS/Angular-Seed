'use strict';

var app = angular.module('simility', ['ngRoute','ngStorage','nvd3','indexedDB']).
config(['$locationProvider', '$routeProvider', '$indexedDBProvider',
	function($locationProvider, $routeProvider,$indexedDBProvider) {
	$routeProvider
	    .when("/movies", {
	        templateUrl : "/movie-list/view1.html",
	        controller : "MoviesCtrl"
	    })
	    .when("/budget", {
	        templateUrl : "/movie-budget/view2.html",
	        controller : "BudgetCtrl"
	    })
	    $locationProvider.hashPrefix('');
	    $routeProvider.otherwise('/movies');

	    $indexedDBProvider
	      .connection('moviesDB')
	      .upgradeDatabase(1, function(event, db, tx){
	        var objStore = db.createObjectStore('movie_x1');
	        objStore.createIndex('movie_title_idx','movie_title',{unique:false});
	        objStore.createIndex('director_name_idx', 'director_name', {unique: false});
	        objStore.createIndex('actor_1_name_idx', 'actor_1_name', {unique: false});
	        objStore.createIndex('actor_2_name_idx', 'actor_2_name', {unique: false});
	        objStore.createIndex('genres_idx', 'genres', {unique: false});
	        objStore.createIndex('language_idx', 'language', {unique: false});
	        objStore.createIndex('budget_idx', 'budget', {unique: false});
	        objStore.createIndex('country_idx', 'country', {unique: false});
	        objStore.createIndex('content_rating_idx', 'content_rating', {unique: false});
	        objStore.createIndex('plot_keywords_idx', 'plot_keywords', {unique: false});
	        objStore.createIndex('title_year_idx', 'title_year', {unique: false});
	        objStore.createIndex('movie_imdb_link_idx','movie_imdb_link',{unique:false});
	      });
}]);
