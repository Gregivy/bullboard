angular.module('bullboard').controller('LogInCtrl',function ($scope, $meteor, $stateParams, $location, $window, $rootScope) {
    //if ($rootScope.currentUser) $window.history.back();
    $scope.register = false;
    $scope.patterns = {
        password : /^(?=.*\d)[0-9a-zA-Z]{5,20}$/,
        login: /^[0-9a-zA-Z]{5,20}$/,
        usrname:  /^[а-яА-ЯёЁa-zA-Z0-9\s]+$/
    };
    $scope.enter = function () {
        $meteor.loginWithPassword( $scope.login, $scope.password );
    };
    $scope.hasErrors = {
        login:false,email:false,password:false,name:false,
        get: function() {return this.login || this.email || this.password || this.name;}
    };
    $scope.submit = function () {
        if ($scope.register) {
            $meteor.createUser({
                username:$scope.login,
                email:$scope.email,
                password: $scope.password,
                profile: {name: $scope.usrname}
            }).then(function() {$window.history.back();}, function(err) {$scope.accountsError=err.reason;});
        } else {
            $meteor.loginWithPassword($scope.login, $scope.password).then(function() {
                $window.history.back();
            },function(err) {
                $scope.accountsError=err.reason;
            });
        }
    };
});