angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
.controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
}]).directive('carousel', [function() { 
    return { }
}]);

angular.module('bullboard').controller('AdDetailsCtrl', function ($scope, $meteor, $stateParams, $location, $rootScope, $window, $state, $timeout) {
    //if ($location.search().edit) $scope.editableForm.$show();
    $scope.editvar = $location.search().edit;
    $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
    $scope.adid = $stateParams.id;
    $scope.$meteorSubscribe('ad',$scope.adid).then(function() {
        $scope.ad = $scope.$meteorObject(Ads,$scope.adid);
        $scope.adImages = [];
        angular.forEach($scope.ad.images, function(value,key) {
            $scope.adImages.push(Images.findOne(value).url());
        });
        //if ($scope.ad.images.length==0) $scope.adImages.push("./noimage.png");
        console.log($scope.adImages);
        /*$scope.ad = Ads.findOne({_id:$scope.adid}).then(function() {
            $scope.adImages = [];
            angular.forEach($scope.ad.images, function(value,key) {
                $scope.adImages.push(Images.findOne(value).url());
            });
        });*/
    });
    $scope.addImages = function (files) {
        if (files.length > 0) {
            //$scope.images.save(files[0]);
            for (var i = 0; i < files.length; i++) {
                $scope.images.save(files[i]).then(function(res) {
                    $scope.ad.images.push(res[0]._id._id);
                    $scope.checkLoading(res);                    
                });
            }
        }
    };
    $scope.checkLoading = function(res) {
        var img = Images.findOne(res[0]._id._id);
        if (img.url()!==null) {
            $scope.adImages.push(img.url());
        } else {
            $timeout($scope.checkLoading,2000,true,res);
        }
    };
    $scope.ifhashistory = !!$rootScope.$previousState;
    $scope.goback = function () {
        $state.go($rootScope.$previousState,$rootScope.$previousStateParams);
    };
    $scope.replacePrevs = function(a,b) {
        var before = $scope.ad.images[b];
        $scope.ad.images[b]=$scope.ad.images[a];
        $scope.ad.images[a]=before;
    };
    $scope.removeItem = function(index){
        $scope.ad.images.splice(index, 1);
        $scope.adImages.splice(index, 1);
    };
});