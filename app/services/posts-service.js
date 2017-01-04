/**
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').factory('PostsService', PostService)

PostService.$inject = ['$http', '$q'];
function PostService($http, $q) {
    var o = {
        posts: []
    };
    o.getAll = function () {
        return $http.get('http://localhost:3000/posts').success(function (data) {
            angular.copy(data, o.posts);
        });
    };
    o.create = function (post) {
        return $http.post('http://localhost:3000/posts', post).success(function (data) {
            o.posts.push(data);
        });
    };
    o.upvote = function (post) {
        return $http.put('http://localhost:3000/posts/' + post._id + '/upvote')
            .success(function (data) {
                post.upvotes += 1;
            });
    };
    o.getById = function (id) {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:3000/posts/' + id)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
        /*return $http.get(').then(function(res){
         return res.data;
         });*/
    };
    o.addComment = function (id, comment) {
        return $http.post('/posts/' + id + '/comments', comment);
    };
    return o;
}