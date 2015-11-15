  angular.module('bullboard').config(function($urlRouterProvider, $stateProvider, $locationProvider){ 
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('ads', {
            url: '/ads/:category/:pagenumber',
            templateUrl: 'client/ads/view/ads-list.ng.html',
            controller: 'AdsListCtrl'
        })
        .state('account', {
            url: '/account/:id',
            templateUrl: 'client/users/view/user-account.ng.html',
            controller: 'UserAccountCtrl'
        })
        .state('ad', {
            url: '/ad/:id',
            templateUrl: 'client/ads/view/ad.ng.html',
            controller: 'AdDetailsCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'client/view/login.ng.html',
            controller: 'LogInCtrl'
        })
      .state('logout', {
      url: '/logout',
      resolve: {
        "logout": function($meteor, $state) {
          return $meteor.logout().then(function(){
            //$state.go('ads');
          }, function(err){
            console.log('logout error - ', err);
          });
        }
      }
    });
    $urlRouterProvider.otherwise("/ads/all/1");
});