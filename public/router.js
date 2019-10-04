myApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('signin', {
        url: '/signin',
        templateUrl: './components/signinComponent/signin.html',
        controller: 'signinController'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: './components/signupComponent/signup.html',
        controller: 'signupController'
    })
    .state('home', {
        url: '/home',
        templateUrl: './components/homeComponent/home.html',
        controller: 'homeController'
    })
    $urlRouterProvider.otherwise('/signin');
});
