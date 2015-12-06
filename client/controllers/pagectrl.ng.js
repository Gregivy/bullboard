angular.module('bullboard').controller('PageCtrl',function ($scope, $meteor, $stateParams, $location, $rootScope) {
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
    $scope.$meteorSubscribe('categories').then(function() {
        $scope.menu = $scope.$meteorCollection(function() {
            return Categories.find({},{
                sort: {name:1}
            });
        });
    });
    $scope.changeUrl = function() {
        if (!$scope.category) $scope.category = "all";
        $location.path('/ads/'+$scope.category+'/1');
        $location.search('sortby','date');
    };
    $scope.go = function ( path ) {
        $location.search ("");
        $scope.category = null;
        $location.path( path );
    };
    $scope.logout = function () {
        $meteor.logout();
    };
    //$scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
    //$scope.showSpinner = $rootScope;

});