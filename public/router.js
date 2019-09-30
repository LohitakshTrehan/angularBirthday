myApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/signin');

    $stateProvider
    .state('signin', {
        url: '/signin',
        templateUrl: './template/signin.html'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: './template/signup.html',
        controller: 'signupController'
    })
});
