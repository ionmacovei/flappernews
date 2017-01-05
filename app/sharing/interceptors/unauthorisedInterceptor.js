/**
 * Created by imacovei on 1/5/2017.
 */
angular.module('flapperNews').factory('unauthorisedInterceptor',unauthorisedInterceptor);
unauthorisedInterceptor.$inject=['$q' ]
function unauthorisedInterceptor($q){
    return {
        'responseError': function (rejection) {
            if (rejection.status === 401) {
                window.location.href = '/#/login';
            }
            return $q.reject(rejection);
        }
    };

}