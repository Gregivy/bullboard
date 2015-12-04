angular.module('bullboard').controller('UserAccountCtrl', function ($scope, $meteor, $location, $stateParams, $rootScope) {
    $scope.personalPage = false;
    $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
    $scope.getMainPhoto = function (id) {
        if (id) return Images.findOne(id).url()
        else return "./noimage.png";
    };
    var checkPerson = function() {
       if ($stateParams.id) {
            $scope.userlogin = $stateParams.id;
            if ($rootScope.currentUser && $rootScope.currentUser.username == $stateParams.id) {$scope.personalPage = true;}
            else {$scope.personalPage = false;};
        };
    };
    checkPerson();
    $rootScope.$watch('currentUser', checkPerson);
    //$scope.$apply();
    //$scope.userlogin = $stateParams.id || ($rootScope.currentUser?$rootScope.currentUser.username:false);
    //$scope.personalPage = $rootScope.currentUser && ((!$stateParams.id && $rootScope.currentUser?true:false) || ($stateParams.id==$rootScope.currentUser.username));
	/*$scope.ads = [
		{img:"1.jpg",name:"носки",date:"15",category:"wefg"},{img:"1.jpg",name:"но",date:"15.02.15",category:"rdfhwefg"}
		
	];*/
    
    $meteor.call('getUserName', $scope.userlogin).then(function(data){
        $scope.user = data['profile']['name'];
    },function(err){
        $scope.error = err.reason;
    });
    $scope.order = -1;
    $scope.sort = {date:-1};
    $scope.sortby = function(by) {
        $scope.order*=-1;
        if (by=="date") $scope.sort = {date:$scope.order}
        else if (by=="name") $scope.sort = {name:$scope.order};
        
    };
    $scope.catPattern = 'all';
    $meteor.autorun($scope, function() {
        $scope.$meteorSubscribe('AuthorAds',$scope.userlogin,$scope.getReactively('catPattern'),{sort:$scope.getReactively('sort')}).then(function(sH) {
            $scope.ads = $scope.$meteorCollection(function () {
                return Ads.find({},{
                    sort:  $scope.getReactively('sort')
                });
            });
        });
    });
    $scope.catName = "Все категории";
    $scope.showCat = function (p,n) {
        $scope.catName = n;
        $scope.catPattern = p;
    };
    $scope.forDeleting = "";
    $scope.trydelete = function (a) {
        $scope.forDeleting = a;
    }
    $scope.deleteAd = function() {
        //console.log($scope.forDeleting);
        $meteor.call('deleteAd', $scope.forDeleting);
    }
    /*$scope.ads = $meteor.collection(function() {
        return Ads.find({},{
            sort: {name:1}
        });
    });*/
    //console.log($scope.ads);
});