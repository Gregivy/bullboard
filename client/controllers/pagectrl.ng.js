angular.module('bullboard').controller('PageCtrl',function ($scope, $meteor, $stateParams, $location) {
    //$scope.sortby = "date";
    $scope.$watch(function () { return $location.search(); }, function() {
      $scope.query = $location.search()['q'] || "";
    });
    $scope.all = "Все"; 
    $scope.$watch('query', function(term) {
       if (term!="") $location.search('q', term)
       else $location.search('q', null);
    });
  //  $meteor.subscribe('categories').then(function() {
//        console.log($scope.menu[0].name);
    //});
    $scope.$meteorSubscribe('categories');
    $scope.menu = $meteor.collection(function() {
        return Categories.find({},{
            sort: {name:1}
        });
    });
    $scope.changeUrl = function() {
        $location.path('/ads/'+$scope.category+'/1');
    };
    $scope.go = function ( path ) {
        $location.path( path );
    };
});