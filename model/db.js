var Schemas = {};

Ads = new Mongo.Collection('ads');
/*Ads.allow({
  insert: function (userId, ad) {
    return userId && ad.author.id === userId;
  },
  update: function (userId, ad, fields, modifier) {
    return userId && ad.author.id === userId;
  },
  remove: function (userId, ad) {
    //return userId && ad.author.id === userId;
      return false;
  }
});*/
Schemas.Ad = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Author"
    },
    price: {
        type: Number,
        label: "Price"
    },
    "category.pattern": {
        type: String,
        label: "Category pattern"
    },
    "category.name": {
        type: String,
        label: "Category name"
    },
    date: {
        type: Date,
        label: "Created at"
    },
    "author.id": {
        type: String,
        label: "Author id"
    },
    "author.name": {
        type: String,
        label: "Author name"
    },
    "author.login": {
        type: String,
        label: "Author login"
    },
    comments: {
        type: [Object],
        label: "Comments"
    },
    "comments.$.author.id": {
        type: String,
        label: "Comment author id"
    },
    "comments.$.author.name": {
        type: String,
        label: "Comment author name"
    },
    "comments.$.author.login": {
        type: String,
        label: "Comment author login"
    },
    "comments.$.date": {
        type: Date,
        label: "Comment date"
    },
    "comments.$.text": {
        type: String,
        label: "Comment text"
    },
    images: {
        type: [String],
        label: "Images for ad"
    }
});

Ads.attachSchema(Schemas.Ad);

Ads.allow({
  update: function (userId, ad, fields, modifier) {
    return userId && ad.author.id === userId;
  }
});

Categories = new Mongo.Collection('categories');

Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("original")
  ],
  filter: {
    allow: {
      contentTypes: ['image/jpeg']
    }
  }
});