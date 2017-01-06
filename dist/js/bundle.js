(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider,$httpProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'componetnts/posts/posts.html',
                controller: 'PostsController',
                controllerAs: 'vm'
            })
            .state('comment', {
                url: '/comment/:post_id',
                templateUrl: 'componetnts/comment/comment.html',
                controller: 'CommentController',
                params: {
                    post_id: null
                },
                controlerAs: 'vm'
            }).state('login', {
            url: '/login',
            templateUrl: 'componetnts/authentification/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'authService', function($state, authService){
                if(authService.isLoggedIn()){
                    $state.go('home');
                }
            }]
        })
            .state('register', {
                url: '/register',
                templateUrl: 'componetnts/authentification/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'authService', function($state, authService){
                    if(authService.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            });


        $urlRouterProvider.otherwise('home');
        $httpProvider.interceptors.push('unauthorisedInterceptor');
    }]);
},{}],2:[function(require,module,exports){
/**
 * Created by imacovei on 12/29/2016.
 */
'use strict';
angular.module('flapperNews', ['ui.router']);
},{}],3:[function(require,module,exports){
/**
 * Created by imacovei on 1/4/2017.
 */
'use strict';
angular.module('flapperNews').controller('AuthCtrl',AuthCtrl);

AuthCtrl.$inject=['$scope', '$state', 'authService'];

    function AuthCtrl($scope, $state, authService){
        $scope.user = {};

        $scope.register = function(){
            authService.register($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };

        $scope.logIn = function(){
            authService.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };
    }
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
/**
 * Created by imacovei on 1/4/2017.
 */

angular.module('flapperNews').controller('NavCtrl',NavCtrl);


    NavCtrl.$inject=['$scope', 'authService']


    function NavCtrl($scope, authService){
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.currentUser = authService.currentUser;
        $scope.logOut = authService.logOut;
    }
},{}],6:[function(require,module,exports){
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
       // loadAllUsers();
    };
    self.incrementDownvotes= function(post){
        PostsService.downvote(post);
    }

    function loadAllUsers() {
        PostsService.getAll().then(function (posts) {
               self.allPosts = posts;
            });
    }
}
},{}],7:[function(require,module,exports){
/**
 * Created by imacovei on 1/5/2017.
 */

(function () {
    angular.module('flapperNews').directive('posts', posts);

    function posts() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {post : "=post"},
            controller: controllerPostsDirective,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'directives/posts/posts-body.html',
            link: function (scope, element, attrs) {

            }
        }
    }
    controllerPostsDirective.$inject=['$scope','PostsService'];
    function controllerPostsDirective($scope,PostsService) {
         // post=$scope.post;

        this.incrementUpvotes = function (post) {
            PostsService.upvote(post);
            // loadAllUsers();
        };
        this.incrementDownvotes= function(post){
            PostsService.downvote(post);
        }

    }

}());

/*
angular.module('flapperNews').directive('posts',function(){
    return {
        restrict: "E",
        template:"posts-body.html",
        scope : {user : "=user"},
        controller: controllerPostsDirective,
        controllerAs:'vm'.
    }

})

*/

},{}],8:[function(require,module,exports){
require('./app.js');
require('./app.config.js');
require('./services/auth-service.js');
require('./services/comment-service.js');
require('./services/posts-service.js');
require('./componetnts/authentification/auth-controler.js');
require('./componetnts/comment/comment-controller.js');
require('./componetnts/navbar/navbar-controller.js');
require('./componetnts/posts/posts-controller.js');
require('./directives/posts/post-directive.js');
require('./sharing/constants/flapperNewsConstants.js');
require('./sharing/interceptors/unauthorisedInterceptor.js');
},{"./app.config.js":1,"./app.js":2,"./componetnts/authentification/auth-controler.js":3,"./componetnts/comment/comment-controller.js":4,"./componetnts/navbar/navbar-controller.js":5,"./componetnts/posts/posts-controller.js":6,"./directives/posts/post-directive.js":7,"./services/auth-service.js":9,"./services/comment-service.js":10,"./services/posts-service.js":11,"./sharing/constants/flapperNewsConstants.js":12,"./sharing/interceptors/unauthorisedInterceptor.js":13}],9:[function(require,module,exports){
/**
 * Created by imacovei on 1/4/2017.
 */
angular.module('flapperNews').service('authService', authService);
authService.$inject = ['$http', '$window','api'];

function authService($http, $window,api) {

    this.saveToken = saveToken;
    this.getToken = getToken;
    this.isLoggedIn = isLoggedIn;
    this.currentUser = currentUser;
    this.register = register;
    this.logIn = logIn;
    this.logOut = logOut;
    function saveToken(token) {
        $window.localStorage['token'] = token;
        console.log(getToken());
    }

    function getToken() {
        return $window.localStorage['token'];
    };
    ;

    function isLoggedIn() {
        var token = getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    function currentUser() {
        if (isLoggedIn()) {
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };
    function register(user) {
        return $http.post(api+'user/register', user).success(function (data) {
            saveToken(data.token);
        });
    };
    function logIn(user) {
        return $http.post(api+'user/login', user).success(function (data) {
            saveToken(data.token);
        });
    };
    function logOut() {
        $window.localStorage.removeItem('token');
    };

}
},{}],10:[function(require,module,exports){
/**
 * Created by imacovei on 1/3/2017.
 */
angular.module('flapperNews').service('CommentService', CommentService);
CommentService.$inject = ['$http', 'authService','api']
function CommentService($http, authService,api) {

    this.addComment = addComment;
    this.upvoteComment = upvoteComment;

    function addComment(id, comment) {
        return $http.post(api+'posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer ' + authService.getToken()}
        });
    };


    function upvoteComment(post, comment) {

        return new Promise(function (resolve, reject) {
            $http.put(api+'posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + authService.getToken()}
            })
                .then(function (response) {
                    resolve(response.data)
                    comment.upvotes += 1;
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    };

}
},{}],11:[function(require,module,exports){
/**
 * Created by imacovei on 12/30/2016.
 */

angular.module('flapperNews').factory('PostsService', PostService)

PostService.$inject = ['$http','authService','api'];
function PostService($http, authService,api) {
    var o = {
        posts: []
    };
    o.getAll = function () {
        return $http.get(api+'posts').success(function (data) {
            angular.copy(data, o.posts);
           // console.log("token="+ authService.getToken());
        });
    };
    o.create = function (post) {
        return $http.post(api+'posts', post,{

            headers: {Authorization: 'Bearer '+ authService.getToken()}})
            .success(function (data) {
            o.posts.push(data);
        });
    };
    o.upvote = function (post) {
        return $http.put(api+'posts/' + post._id + '/upvote',null,{
            headers: {Authorization: 'Bearer '+ authService.getToken()}
        })
            .success(function (data) {
                post.upvotes += 1;
            });
    };
    o.downvote = function (post) {
        return $http.put(api+'posts/' + post._id + '/downvote',null,{
            headers: {Authorization: 'Bearer '+ authService.getToken()}
        })
            .success(function (data) {
                post.downvotes += 1;
            });
    };
    o.getById = function (id) {
        return new Promise(function (resolve, reject) {
            $http.get(api+'posts/' + id)
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

    return o;
}
},{}],12:[function(require,module,exports){
/**
 * Created by imacovei on 1/5/2017.
 */
angular.module('flapperNews')
    .constant('api','http://localhost:3000/');
},{}],13:[function(require,module,exports){
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
},{}]},{},[8]);
