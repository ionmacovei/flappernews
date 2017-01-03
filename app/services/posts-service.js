/**
 * Created by imacovei on 12/30/2016.
 */
angular.module('flapperNews').factory('PostsService', PostsService);


PostsService.$inject = ['$http'];
function PostsService($http) {
    var service = {
       // post:[]
    };
    service.getAll = getAll;
    service.GetById=GetById;

    return service;

    function getAll() {
        return $http.get('http://localhost:3000/posts').then(handleSuccess, handleError('Error deleting user'))
    };
    function GetById(id) {
        return $http.get('http://localhost:3000/posts/' + id).success(function(data){
          /*  console.log(data.toString());
            angular.copy(data, service.post);*/
        });
    }


    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return {success: false, message: error};
        };
    }
}