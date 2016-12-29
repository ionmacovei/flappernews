/**
 * Created by imacovei on 12/29/2016.
 */
'use strict';
var app= angular.module('flapperNews', [])
    .controller('MainCtrl',MainCtrl);
function MainCtrl() {
         var self = this;
        self.test = 'Hello world!';
    self.posts = [
        'post 1',
        'post 2',
        'post 3',
        'post 4',
        'post 5'
    ];
}