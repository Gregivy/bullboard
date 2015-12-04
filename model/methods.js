Meteor.methods({
    getUserName: function (login) {
        var user = Meteor.users.findOne({ username: login});
        if (!user) throw new Meteor.Error(404, "Пользователь не найден!")
        else return user;
    },
    deleteAd: function (id) {
        //var id = new Meteor.Collection.ObjectID(id);
        var ad = Ads.findOne(id);
        if (ad.author.id !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }
        Ads.remove({_id:id});
    },
    newAd: function (name,text,price,category) {
        var user = Meteor.users.findOne(Meteor.userId());
        return Ads.insert({name:name,desc:text,category:{name:category.name,pattern:category.pattern},date:new Date(),author:{id:user._id,name:user.profile.name,login:user.username},price:price,comments:[],images:[]});
    },
    addPic: function (picid,adid) {
        var ad = Ads.findOne(adid);
        if (ad.author.id !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }
        Ads.update(adid, {$push: {images:picid}});
    }
});