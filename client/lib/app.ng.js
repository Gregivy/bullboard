Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});   

Comments.ui.config({
   template: 'bootstrap' // or ionic, semantic-ui
});

Comments.ui.setContent({
  title: 'Комментарии',
  save: 'сохранить',
  reply: 'ответить',
  edit: 'редактировать',
  remove: 'удалить',
  'placeholder-textarea': 'Введите ваш комментарий',
  'add-button-reply': 'Добавить',
  'add-button': 'Добавить',
  'load-more': 'Еще комментарии'
});

angular.module('bullboard',['angular-meteor', 'ui.router','ui.bootstrap','ngFileUpload','angular-sortable-view','ngAnimate', 'comments.ui', 'xeditable'])
.run(function(editableOptions){
    editableOptions.theme = 'bs3';
});

angular.module('bullboard').filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=1; i<=total; i++) {
      input.push(i);
    }

    return input;
  };
});
