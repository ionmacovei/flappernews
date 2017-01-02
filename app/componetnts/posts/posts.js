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