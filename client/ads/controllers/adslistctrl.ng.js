angular.module('bullboard').controller('AdsListCtrl', function ($scope, $meteor, $stateParams, $location) {
    //var searchObj = $location.search();
    //console.log(searchObj);
    //$scope.$parent.query = searchObj==null || searchObj.q==null?$scope.$parent.query:searchObj.q;
    $scope.category = $stateParams.category;
    $scope.addressPattern = "ads/"+$scope.category+"/";
    $scope.currentPage = $stateParams.pagenumber;
    $scope.ads = $meteor.collection(function() {
        //return Ads.find($scope.$parent.query==""?{category:$scope.category}:{category:$scope.category,$text:{$search:$scope.$parent.getReactively('query')}},{
        return Ads.find({},{
            sort: {date:-1}
        });
    });
    $meteor.autorun($scope, function() {
        $meteor.subscribe('ads', {
            skip:10*($scope.getReactively('currentPage')-1),
            limit:10,
            sort: {date:-1}
        },$scope.getReactively('query')).then(function(){
            //console.log(Counts["_collection"]);
            $scope.totalPages = $meteor.object(Counts ,'numberOfAds', false);
            $scope.lastPage = Math.ceil($scope.totalPages.count/10);
        });
    });
    //$scope.lastPage = Math.ceil($scope.ads.length/10)+1;
    //$scope.query = "";
});