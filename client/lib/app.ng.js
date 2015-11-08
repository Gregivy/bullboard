Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});   

angular.module('bullboard',['angular-meteor', 'ui.router']);

angular.module('bullboard').filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=1; i<=total; i++) {
      input.push(i);
    }

    return input;
  };
});

