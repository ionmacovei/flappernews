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