var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap'
]).run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]).config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/404');
        $locationProvider.html5Mode(true);
    }
]);

angular
    .element(document)
    .ready(function() {
        angular.bootstrap(document, ['app']);
    });