/**
 * Created by imacovei on 12/29/2016.
 */
'use strict';
angular.module('flapperNews', ['ui.router']);
/**
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'componetnts/posts/posts.html',
                controller: 'PostsController',
                controllerAs: 'vm'
            })
            .state('comment', {
                url: '/comment/:post_id',
                templateUrl: 'componetnts/Comment/comment.html',
                controller: 'CommentController',
                params: {
                    post_id: null
                },
                controlerAs: 'vm'
            })
        ;

        $urlRouterProvider.otherwise('home');
    }]);
/**
 * Created by imacovei on 1/3/2017.
 */
angular.module('flapperNews').factory('CommentService',CommentService);
CommentService.$inject=['$http']
function CommentService($http) {
    var service={};
    service.addComment= function (id, comment) {
        return $http.post('http://localhost:3000/posts/' + id + '/comments', comment);
    };


    service.upvoteComment = function(post, comment) {

        return new Promise(function (resolve, reject) {
            $http.put('http://localhost:3000/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
                .then(function (response) {
                    resolve(response.data)
                    comment.upvotes += 1;
                })
                .catch(function (err) {
                    reject(err)
                })
    })};
        return service;
}
/**
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').factory('PostsService', PostService)

PostService.$inject = ['$http', '$q'];
function PostService($http, $q) {
    var o = {
        posts: []
    };
    o.getAll = function () {
        return $http.get('http://localhost:3000/posts').success(function (data) {
            angular.copy(data, o.posts);
        });
    };
    o.create = function (post) {
        return $http.post('http://localhost:3000/posts', post).success(function (data) {
            o.posts.push(data);
        });
    };
    o.upvote = function (post) {
        return $http.put('http://localhost:3000/posts/' + post._id + '/upvote')
            .success(function (data) {
                post.upvotes += 1;
            });
    };
    o.getById = function (id) {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:3000/posts/' + id)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
        /*return $http.get(').then(function(res){
         return res.data;
         });*/
    };
    o.addComment = function (id, comment) {
        return $http.post('/posts/' + id + '/comments', comment);
    };
    return o;
}
/**
 * Created by imacovei on 1/2/2017.
 */
'use strict';
angular.module('flapperNews').controller('CommentController', CommentController);
CommentController.$inject = ['$scope', '$stateParams', 'PostsService', 'CommentService']
function CommentController($scope, $stateParams, PostsService, CommentService) {

    var vm = this;
    $scope.post = {
    }

    initController();
    function initController() {
        PostsService.getById($stateParams.post_id).then(function (post) {
            console.log('a meu', post);
            $scope.$apply(function() {
                $scope.post = post;
            });
        }).catch(function (response) {
            console.log(response);
        });

        console.log("init");
    }

    $scope.addComment = function () {
        console.log($stateParams.post_id);
       // $scope.post = PostsService.getById($stateParams.post_id);
        if ($scope.body === '') {
            return;
        }
        CommentService.addComment($stateParams.post_id, {
            body: $scope.body,
            author: 'user',
        }).success(function (comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };
    $scope.incrementUpvotes= function(comment){
        CommentService.upvoteComment( $scope.post,comment);

    }

}
/**
 * Created by imacovei on 1/3/2017.
 */
'use strict';
angular.module('flapperNews').controller('PostsController',PostsController);
PostsController.$inject=['PostsService'];
function PostsController(PostsService) {
    var self = this;
    self.title = "";
    self.allPosts=[];
    initController();

    function initController() {
        loadAllUsers();
    }
    self.posts = PostsService.posts;
    self.addPost = function () {
        if (!self.title || self.title === '') {
            return;
        }
        PostsService.create({
            title: self.title,
            link:  self.link,
        });
        self.title = '';
        self.link = '';
    };
    self.incrementUpvotes = function (post) {
        PostsService.upvote(post);
        loadAllUsers();
    };
    function loadAllUsers() {
        PostsService.getAll().then(function (posts) {
               self.allPosts = posts;
            });
    }
}