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