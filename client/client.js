Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});   

// This code only runs on the client
angular.module('bullboard',['angular-meteor', 'ui.router']);

  angular.module('bullboard').config(function($urlRouterProvider, $stateProvider, $locationProvider){
 
      $locationProvider.html5Mode(true);
 
      $stateProvider
        .state('ads', {
          url: '/ads',
          templateUrl: 'client/templates/ads-list.ng.html',
          controller: 'AdListCtrl'
        });
 
      $urlRouterProvider.otherwise("/ads");
    });
 
angular.module('bullboard').controller('HeaderCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    
}]);
angular.module('bullboard').controller('PageCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    
}]);
angular.module('bullboard').controller('AdListCtrl', ['$scope', '$meteor', function ($scope, $stateParams) {
    $scope.name = "gg";
}]);