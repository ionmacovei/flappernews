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