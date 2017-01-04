/**
 * Created by imacovei on 12/29/2016.
 */
'use strict';
angular.module('flapperNews', ['ui.router'])
    .controller('MainCtrl',MainCtrl);
MainCtrl.$inject=['posts'];
function MainCtrl(posts) {
         var self = this;
         self.title="";
        self.test = 'Hello world!';
    self.posts =posts.posts;
    self.addPost = function(){
        if(!self.title || self.title === '') { return; }
        self.posts.push({
            title: self.title,
            upvotes: 0,
            link: self.link,
            comments: [
                {author: 'Joe', body: 'Cool posrrdfddfdrun4rr!', upvotes: 0},
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
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/posts',
                templateUrl: 'componetnts/posts/posts.html',
                controller: 'PostsController',
                controllerAs:'vm'
            })
            .state('posts', {
            url: '/Comment/{id}',
            templateUrl: 'componetnts/Comment/Comment.html',
            controller: 'PostsCtrl',
            controllerAs: 'vm'
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
    .controller('PostsCtrl',PostsCtrl);
PostsCtrl.$inject=['$stateParams','posts']
function PostsCtrl($stateParams,posts) {

    var self= this;
    self.post = posts.posts[$stateParams.id];
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