angular.module('bullboard').controller('LogInCtrl',function ($scope, $meteor, $stateParams, $location) {
    $scope.register = false;
    $scope.enter = function () {
        $meteor.loginWithPassword( $scope.login, $scope.password );
    };
    $scope.hasErrors = {
        login:false,email:false,password:false,name:false,
        get: function() {return this.login || this.email || this.password || this.name;}
    };
    $scope.reg = function () {
        if (!$scope.hasErrors.get()) {
            $meteor.createUser({
                username:$scope.login,
                email:$scope.email,
                password: $scope.password,
                profile: {name: $scope.name}
            });
        } else {alert();}
    };
});