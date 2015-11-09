Ads = new Mongo.Collection('ads');
Ads.allow({
  insert: function (userId, ad) {
    return userId && ad.author === userId;
  },
  update: function (userId, ad, fields, modifier) {
    return userId && ad.author === userId;
  },
  remove: function (userId, ad) {
    return userId && ad.author === userId;
  }
});

Categories = new Mongo.Collection('categories');