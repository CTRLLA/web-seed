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