angular.module('bullboard').controller('HeaderCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    
}]);
angular.module('bullboard').controller('PageCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    
}]);
angular.module('bullboard').controller('AdsListCtrl', ['$scope', '$meteor', function ($scope, $stateParams) {
    $scope.ads = [{author:"Author",desc:"Lorum ipsum dolor sit amit, lorum ipsum dolor sit amit, lorum ipsum dolor sit amit",price:1500,date:"13.10.2016",img:"",cheched:false}];
    $scope.query = "";
    $scope.addressPattern = "";
    $scope.currentPage = 1;
    $scope.lastPage = 1;
    $scope.pages = [1];
}]);