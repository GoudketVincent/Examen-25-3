'use strict';

angular.module('ProductApp.controllers', []).

    controller('ProductsController', ['$scope', 'ProductService',
        function($scope, ProductService) {
        	$scope.products = [];
        	
//        	$scope.searchFilter = function(product) {
//        	    var keyword = new RegExp($scope.nameFilter, 'i');
//        	    return keyword.test(product.shortname);
//        	};
        	
            ProductService.getProductsJSON().success(function (response) {
            	$scope.products = response.products;
            });
        }
    ]).
    
    controller('ProductController', ['$scope', '$routeParams', 'ProductService',
        function($scope, $routeParams, ProductService) {
    		$scope.product = null;
	        var shortname = $routeParams.shortname;

	        ProductService.getProductJSON(shortname).success(function (response) {
	        	$scope.product = response;
	        });
    	}
    ]).
    
    controller('NewProductController', ['$scope', 'ProductService',
        function($scope, ProductService) {
    		$scope.addProduct = function() {
    			var productJSON;
            	productJSON += '<product><brand>' + $scope.newProduct.brand + '</brand>';
            	productJSON += '<description>' + $scope.newProduct.description + '</description>';
            	productJSON += '<id>' + $scope.newProduct.id + '</id>';
            	productJSON += '<price>' + $scope.newProduct.price + '</price>';
            	productJSON += '<shortname>' + $scope.newProduct.shortname + '</shortname>';
            	productJSON += '<sku>' + $scope.newProduct.sku + '</sku></product>';

    			ProductService.addProduct(productJSON);
    		};
    	}
    ]);
