var app = angular.module('myApp',[]);
app.controller('AppCtrl', function($scope, $http){
	
	$scope.contact = {};
	$scope.edit = false;
	// refresh page and load data from db
	$scope.loadData = function(){
		$http.get('/contactlist').success(function(res){
			if (res) {
				console.log('data received');
				$scope.contactlist = res;
				$scope.contact = "";
			}else{
				console.log('Issue!!');
			}
		});


	}

	$scope.loadData();

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log(response);
			$scope.loadData();
		})
	}

	$scope.removeData = function(id){
		console.log(id);
		$http.delete('/contactlist/'+ id).success(function(response){
			$scope.loadData();
		})
	}

	$scope.editData = function(id){
		console.log(id);
		$scope.edit = true;
		// get id and show details in input box
		$http.get('/contactlist/'+id).success(function(response){
			$scope.contact = response;
		})
	}

	$scope.updateData = function(){
		var id = $scope.contact._id;
		$http.put('/contactlist/'+ id, $scope.contact).success(function(response){
			$scope.loadData();
		})
		$scope.edit = false;
	}

	$scope.deselect = function(){
		$scope.edit = false;
		$scope.contact = "";
	}

});
