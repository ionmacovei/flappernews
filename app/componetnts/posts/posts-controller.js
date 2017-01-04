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