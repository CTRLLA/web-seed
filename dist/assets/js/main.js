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
app.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('404', {
            url: '/404',
            templateUrl: '/modules/404/views/404.tpl.html'
        });
    }
]);
app.controller('AppCtrl', [
    '$scope',
    function($scope) {
        this.pageTitle = 'CTRL LA';

        return this;
    }
]);
app.service('Endpoint', [
    '$http',
    '$q',
    '$log',
    function($http, $q) {
        'use strict';

        /**
         * default settings for every request
         * @type {Object}
         */
        var settings = {
            // TODO ...

            baseUrl: '',
            onSuccess: null,
            onError: null

            /*
             method: 'GET',
             url: false,
             path: false,
             data: null,
             // onSuccess: null,
             // onError: null,
             useToken: false
             */
        };

        /**
         *
         * @param options
         * @returns {Request}
         * @constructor
         */
        var Request = function(options) {
            if (!(this instanceof options)) {
                return new Request(options);
            }

            if (options) {
                this.config(options);
            }

            return this;
        };

        Request.prototype.config = function(options) {
            // TODO: ...

            options = angular.extend(settings, options || {});

            if (options.onSuccess) {
                options._onSuccess = options.onSuccess;
            }

            if (options.onError) {
                options._onError = options.onError;
            }

            options.onSuccess = function(data) {
                // TODO: handle success

                if (this._onSuccess && typeof this._onSuccess === 'function') {
                    this._onSuccess(data);
                }
            };

            options.onError = function(data) {
                // TODO: handle error

                if (this._onError && typeof this._onError === 'function') {
                    this._onError(data);
                }
            };

            this.options = options;

            return this;
        };

        Request.prototype.execute = function() {
            var
                deferred = $q.defer(),
                options = this.options;

            $http({
                method: options.method,
                url: options.url,
                data: options.data,
                params: options.params
            }).then(function(response) {
                return deferred.promise(response);
            }, function(error) {
                return deferred.reject(error);
            });

            return deferred.promise;
        };

        function config(options) {
            // TODO: ...
        }

        return {
            config: config,
            Request: Request
        };
    }
]);
app.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('index', {
            url: '/',
            templateUrl: '/modules/index/views/index.tpl.html'
        });
    }
])