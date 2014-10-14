app.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('404', {
            url: '/404',
            templateUrl: '/modules/404/views/404.tpl.html'
        });
    }
]);