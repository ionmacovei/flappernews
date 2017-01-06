/**
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider,$httpProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'componetnts/posts/posts.html',
                controller: 'PostsController',
                controllerAs: 'vm'
            })
            .state('comment', {
                url: '/comment/:post_id',
                templateUrl: 'componetnts/comment/comment.html',
                controller: 'CommentController',
                params: {
                    post_id: null
                },
                controlerAs: 'vm'
            }).state('login', {
            url: '/login',
            templateUrl: 'componetnts/authentification/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'authService', function($state, authService){
                if(authService.isLoggedIn()){
                    $state.go('home');
                }
            }]
        })
            .state('register', {
                url: '/register',
                templateUrl: 'componetnts/authentification/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'authService', function($state, authService){
                    if(authService.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            });


        $urlRouterProvider.otherwise('home');
        $httpProvider.interceptors.push('unauthorisedInterceptor');
    }]);