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