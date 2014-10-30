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