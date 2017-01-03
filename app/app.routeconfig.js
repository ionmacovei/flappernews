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
                templateUrl: 'componetnts/posts/posts.html',
                controller: 'PostsController',
                controllerAs:'vm'
            }).state('posts', {
            url: '/posts/:post_id',
            templateUrl: 'componetnts/Comment/comment.html',
            controller: 'CommentController',
            controllerAs: 'vm',
            params: {
                post_id: null
            }
        });

        $urlRouterProvider.otherwise('home');
    }]);