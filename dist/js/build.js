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
angular.module('flapperNews').factory('posts', [function(){
    var o = {
        posts: []
    };
    return o;
}])
/**
 * Created by imacovei on 1/2/2017.
 */
'use strict';
angular.module('flapperNews')
    .controller('CommentController',CommentController);
CommentController.$inject=['$stateParams','posts']
function CommentController($stateParams, posts) {

    var self= this;
    self.post = posts.posts[$stateParams.post_id];
    self.addComment = function(){
        if(self.body === '') { return; }
        self.post.comments.push({
            body: self.body,
            author: 'user',
            upvotes: 0
        });
        self.body = '';
    };

}
/**
 * Created by imacovei on 1/3/2017.
 */
angular.module('flapperNews').controller('PostsController',PostsController);
PostsController.$inject =['posts'];
function PostsController(posts) {
    var self = this;
    self.title="";
    self.posts =posts.posts;
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