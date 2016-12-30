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
            link: self.link
        });
        self.title='';
        self.link='';
    };
    self.incrementUpvotes = function(post) {
        post.upvotes += 1;
    };
}