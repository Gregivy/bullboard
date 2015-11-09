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
        category:(categ=="all"?{$ne:"all"}:categ)
    }), { noReady:true});
    return Ads.find({
        $or: [
                {'name' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
                {'desc' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
             ],
        category:(categ=="all"?{$ne:"all"}:categ)
    },options);
});