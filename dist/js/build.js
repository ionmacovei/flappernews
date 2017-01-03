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
/**
 * Created by imacovei on 12/30/2016.
 */
angular.module('flapperNews').factory('PostsService', PostsService);


PostsService.$inject = ['$http'];
function PostsService($http) {
    var service = {
       // post:[]
    };
    service.getAll = getAll;
    service.GetById=GetById;

    return service;

    function getAll() {
        return $http.get('http://localhost:3000/posts').then(handleSuccess, handleError('Error deleting user'))
    };
    function GetById(id) {
        return $http.get('http://localhost:3000/posts/' + id).success(function(data){
          /*  console.log(data.toString());
            angular.copy(data, service.post);*/
        });
    }


    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return {success: false, message: error};
        };
    }
}
/**
 * Created by imacovei on 1/3/2017.
 */
angular.module('flapperNews').controller('PostsController',PostsController);
PostsController.$inject =['PostsService'];
function PostsController(PostsService) {
    var self = this;
    self.title="";
    self.posts=[];
    initController();
    function initController(){
        debugger
        PostsService.getAll().then(function (posts) {
            self.posts = posts;
        });

    }
    self.addPost = function(){
        if(!self.title || self.title === '') { return; }
        self.posts.push({
            title: self.title,
            upvotes: 0,
            link: self.link,
            comments: [
                {author: 'Joe', body: 'Cool pos!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
        });
        self.title='';
        self.link='';
    };
    self.incrementUpvotes = function(post) {
        post.upvotes += 1;
    };

}
/**
 * Created by imacovei on 1/2/2017.
 */
'use strict';
angular.module('flapperNews')
    .controller('CommentController', CommentController);
CommentController.$inject = ['$stateParams', 'PostsService']
function CommentController($stateParams, PostsService) {

    var self = this;
    self.post = {};
    self.post = PostsService.GetById($stateParams.post_id);
    intControler()
    function intControler() {
        PostsService.GetById($stateParams.post_id).then(function (post) {
            self.post = post.data;
        });

    }

    self.addComment = function () {
        if (self.body === '') {
            return;
        }
        self.post.comments.push({
            body: self.body,
            author: 'user',
            upvotes: 0
        });
        self.body = '';
    };

}