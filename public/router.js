myApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('signin', {
        url: '/signin',
        templateUrl: './template/signin.html',
        controller: 'signinController'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: './template/signup.html',
        controller: 'signupController'
    })
    .state('home', {
        url: '/home',
        templateUrl: './template/home.html',
        controller: 'homeController'
    })
    $urlRouterProvider.otherwise('/signin');
});
