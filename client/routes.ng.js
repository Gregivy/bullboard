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
        });
    $urlRouterProvider.otherwise("/ads/all/1");
});