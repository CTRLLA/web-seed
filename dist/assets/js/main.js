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
app.config([
    '$httpProvider',
    function($httpProvider) {
        //Reset headers to avoid OPTIONS request (aka preflight)
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        // POST requests won't send data without this
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    }
]);
app.run([
    '$rootScope',
    function($rootScope) {
        $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
            console.log('Finished route change.');
            $('body').animate({ scrollTop: 0 });
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
app.directive('matchBrowserHeight', [
    '$window',
    function($window) {
        return {
            link: function($scope, $element, $attrs) {
                function setHeight() {
                    var
                        offset = parseInt($attrs.offset || 0),
                        calculatedHeight = $window.innerHeight + offset,
                        minHeight = parseInt($attrs.minHeight || 0),
                        newHeight = calculatedHeight > minHeight ? calculatedHeight : minHeight;

                    $element.css('height', newHeight + 'px');
                }

                // set height
                setHeight();

                // set height on window resize
                angular.element($window).on('resize', setHeight);

                // remove listener when element is removed
                $element.on('$destroy', function() {
                    angular.element($window).off('resize', setHeight);
                });
            }
        };
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
            method: 'GET',
            baseUrl: '',
            params: null,
            data: null,
            onSuccess: null,
            onError: null
        };

        /**
         *
         * @param options
         * @returns {Request}
         * @constructor
         */
        var Request = function(options) {
            if (!(this instanceof Request)) {
                return new Request(options);
            }

            if (options) {
                this.config(options);
            }

            return this;
        };

        Request.prototype.config = function(options) {
            // TODO: ...

            options = angular.extend(angular.copy(settings), options || {});

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
                url: (options.baseUrl || '') + (options.url || options.path || ''),
                data: options.data,
                params: options.params
            }).then(function(response) {
                return deferred.resolve(response);
            }, function(error) {
                return deferred.reject(error);
            });

            return deferred.promise;
        };

        function config(options) {
            settings = angular.extend(settings, options || {});
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