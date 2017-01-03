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