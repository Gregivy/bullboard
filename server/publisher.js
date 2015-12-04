Meteor.publish('categories', function () {
    return Categories.find({});
});
Meteor.publish('ads', function (options,query,categ) {
    var query = query==null?"":query;
    Counts.publish(this,'numberOfAds', Ads.find({
        $or: [
                {'name' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
                {'desc' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
             ],
        'category.pattern':(categ=="all"?{$ne:"all"}:categ)
    }), { noReady:true});
    return Ads.find({
        $or: [
                {'name' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
                {'desc' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
             ],
        'category.pattern':(categ=="all"?{$ne:"all"}:categ)
    },options);
});
Meteor.publish('ad', function(adid) {
    return Ads.find({_id:adid});
});
Meteor.publish('AuthorAds', function(author,category,options){
    //console.log(author,category,options);
    if (category=='all') return Ads.find({'author.login':author},options)
    else return Ads.find({'author.login':author,'category.pattern':category},options);
});
Images.allow({
    insert: function (userId) {
      return (userId ? true : false);
    },
    remove: function (userId) {
      return (userId ? true : false);
    },
    download: function () {
      return true;
    },
    update: function (userId) {
      return (userId ? true : false);
    }
});
Meteor.publish('images', function() {
    return Images.find({});
});