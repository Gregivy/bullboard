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
          templateUrl: 'client/templates/ads-view.ng.html',
          controller: 'AdsListCtrl'
        });
 
      $urlRouterProvider.otherwise("/ads");
    });
 
