Meteor.publish('ads', function (options,query) {
    var query = query==null?"":query;
    Counts.publish(this,'numberOfAds', Ads.find({
        $or: [
                {'name' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
                {'desc' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
             ]
    }), { noReady:true});
    return Ads.find({
                $or: [
                {'name' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
                {'desc' : { '$regex' : '.*' + query || '' + '.*', '$options' : 'i' }},
             ]
    },options);
});