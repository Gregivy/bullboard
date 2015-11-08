angular.module('bullboard').controller('PageCtrl', function ($scope, $meteor, $location) {
    $scope.$watch(function () { return $location.search(); }, function() {
      $scope.query = $location.search()['q'] || "";
    });
     
    $scope.$watch('query', function(term) {
       if (term!="") $location.search('q', term)
       else $location.search('q', null);
    });
});