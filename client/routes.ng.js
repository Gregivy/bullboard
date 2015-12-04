angular.module("bullboard").run(function ($rootScope, $state, $window) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
      console.log(toState);
      if (fromState.name=="ads" || fromState.name=="account" ) {
        $rootScope.$previousState = fromState;
        $rootScope.$previousStateParams = fromParams;
      }
      if (toState.data && toState.data.noauth && $rootScope.currentUser) $state.go('ads',{category:"all",pagenumber:"1"});
  });
});

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
      .state('ad-new', {
            url: '/ad-new',
            templateUrl: 'client/ads/view/ad-new.ng.html',
            controller: 'AdNewCtrl',
            resolve: {
                "currentUser": function ($meteor) {
                    return $meteor.requireUser();
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'client/view/login.ng.html',
            controller: 'LogInCtrl',
            data: {
                noauth: true
            }
        })
      .state('logout', {
      url: '/logout',
      resolve: {
        "logout": function($meteor, $state) {
          return $meteor.logout().then(function(){
            $state.go('');
          }, function(err){
            console.log('logout error - ', err);
          });
        }
      }
    });
    $urlRouterProvider.otherwise("/ads/all/1?sortby=date");
});