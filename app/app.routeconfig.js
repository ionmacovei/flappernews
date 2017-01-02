/**
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'componetnts/home/home.html',
                controller: 'MainCtrl',
                controllerAs:'vm'
            }).state('posts', {
            url: '/posts/{id}',
            templateUrl: 'componetnts/posts/posts.html',
            controller: 'PostsCtrl',
            controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('home');
    }]);