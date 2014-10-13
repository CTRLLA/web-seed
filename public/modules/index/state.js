app.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('index', {
            url: '/',
            templateUrl: '/modules/index/views/index.tpl.html'
        });
    }
])