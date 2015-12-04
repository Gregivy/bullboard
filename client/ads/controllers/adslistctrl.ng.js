angular.module('bullboard').controller('AdsListCtrl', function ($scope, $meteor, $stateParams, $location) {
    //var searchObj = $location.search();
    //console.log(searchObj);
    //$scope.$parent.query = searchObj==null || searchObj.q==null?$scope.$parent.query:searchObj.q;
    $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
    $scope.getMainPhoto = function (id) {
        return Images.findOne(id).url;
    };
    $scope.category = $stateParams.category;
    console.log($scope.category);
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
        $scope.$meteorSubscribe('ads', {
            skip:10*($scope.getReactively('currentPage')-1),
            limit:10,
            sort: $scope.getReactively('sort')
        },$scope.getReactively('query'),$scope.category).then(function(){
            //console.log(Counts["_collection"]);
            $scope.totalPages = $meteor.object(Counts ,'numberOfAds', false);
            $scope.lastPage = Math.ceil($scope.totalPages.count/10);
        });
    });
    $scope.$meteorSubscribe('categories').then(function() {
        $scope.categoryName = $scope.category!="all"?Categories.findOne({pattern:$scope.category})["name"]:$scope.all;
        console.log($scope.categoryName);
    });
    //$scope.categoryName = $scope.category!="all"?Categories.findOne({pattern:$scope.category})["name"]:$scope.all;
    //$scope.categoryName = $scope.category!="all"?$scope.menu[$scope.menu.indexOf(:$scope.all;
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
    $scope.getMainPhoto = function (id) {
        if (id) return Images.findOne(id).url()
        else return "./noimage.png";
    };
    //$scope.lastPage = Math.ceil($scope.ads.length/10)+1;
    //$scope.query = "";
});