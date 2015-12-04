angular.module('bullboard').controller('AdNewCtrl', function ($scope, $meteor, $location, $stateParams, $rootScope) {
    $rootScope.$watch('currentUser', function() {
        if (!$rootScope.currentUser) $scope.go("/login");
    });
    $scope.images = $meteor.collectionFS(Images, false, Images);
    $scope.imgSrc = [];
    $scope.loading = false;
    $scope.loadedImage = 0;
    $scope.newImages = [];
    $scope.submit = function () {
        $meteor.call('newAd', $scope.name, $scope.desc, $scope.price, $scope.category).then(function(data){
            if ($scope.newImages.length==0) {$scope.go("/ad/"+data)} else {
                $scope.loading = true;
                for (var i = 0; i<$scope.newImages.length; i++) {
                    console.log(i);
                    $scope.images.save($scope.newImages[i]).then(function(res){
                        console.log(res[0]._id._id, data);
                        $scope.loadedImage++;
                        $meteor.call('addPic', res[0]._id._id, data);
                        if ($scope.loadedImage==$scope.newImages.length) $scope.go("/ad/"+data);
                    });
                };
            };
        },function(err){
            $scope.error = err.reason;
        });
    };
    $scope.addImages = function (files) {
        if (files.length > 0) {
            //$scope.images.save(files[0]);
            for (var i = 0; i < files.length; i++) {
                $scope.newImages.push(files[i]);
            }
        }
    };
    $scope.removeItem = function(index){
        $scope.newImages.splice(index, 1);
        $scope.imgSrc.splice(index, 1);
    };
    $scope.getPrev = function(img) {
        if (img) {
            for (var i = 0; i<img.length; i++) {
                if ($scope.newImages.indexOf(img[i])==-1) {
                    $scope.newImages.push(img[i]);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function () {
                            $scope.imgSrc.push(e.target.result);
                            //console.log($scope.imgSrc);
                            //$scope.newImages[i].preview=e.target.result;
                        });
                    };
                    reader.readAsDataURL(img[i]);
                }
            };
        };
    };
    $scope.replacePrevs = function(a,b) {
        var before = $scope.imgSrc[b];
        $scope.imgSrc[b]=$scope.imgSrc[a];
        $scope.imgSrc[a]=before;
    };
});