app.run([
    '$rootScope',
    function($rootScope) {
        $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
            console.log('Finished route change.');
            $('body').animate({ scrollTop: 0 });
        });
    }
]);