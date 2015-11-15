angular.module('bullboard').controller('AdsListCtrl', function ($scope, $meteor, $stateParams, $location) {
    //var searchObj = $location.search();
    //console.log(searchObj);
    //$scope.$parent.query = searchObj==null || searchObj.q==null?$scope.$parent.query:searchObj.q;
    $scope.category = $stateParams.category;
    console.log($scope.category);
    $scope.categoryName = $scope.category!="all"?Categories.find({pattern:$scope.category}).fetch()[0]["name"]:$scope.all;
    $scope.sort = {date: -1};
    $scope.$parent.category = $scope.category;
    $scope.adsListAddressPattern = "ads/"+$scope.category+"/";
    $scope.adsDetailsAddressPattern = "ad/"
    $scope.accountAddressPattern = "account/"
    $scope.currentPage = $stateParams.pagenumber;
    $scope.ads = $meteor.collection(function() {
        //return Ads.find($scope.$parent.query==""?{category:$scope.category}:{category:$scope.category,$text:{$search:$scope.$parent.getReactively('query')}},{
        return Ads.find({},{
            sort:  $scope.getReactively('sort')
        });
    });
    $scope.sortby = $location.search().sortby?$location.search().sortby:"date";
    $meteor.autorun($scope, function() {
        $meteor.subscribe('ads', {
            skip:10*($scope.getReactively('currentPage')-1),
            limit:10,
            sort: $scope.getReactively('sort')
        },$scope.getReactively('query'),$scope.category).then(function(){
            //console.log(Counts["_collection"]);
            $scope.totalPages = $meteor.object(Counts ,'numberOfAds', false);
            $scope.lastPage = Math.ceil($scope.totalPages.count/10);
        });
    });
    $scope.$watch('sortby', function(term){
        $location.search('sortby', term);
        if ($scope.sortby) {
            $scope.$parent.sortby = $scope.sortby;
            if ($scope.sortby=="date") $scope.sort = {date:-1}
            else if ($scope.sortby=="name") $scope.sort = {name:1}
            else if ($scope.sortby=="priceup") $scope.sort = {price:1}
            else if ($scope.sortby=="pricedown") $scope.sort = {price:-1}
        }
    });
    //$scope.lastPage = Math.ceil($scope.ads.length/10)+1;
    //$scope.query = "";
});