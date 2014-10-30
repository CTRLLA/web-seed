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