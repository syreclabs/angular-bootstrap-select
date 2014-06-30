// supply open and close without load bootstrap.js
angular.module('angular-bootstrap-select.extra', [])
  .directive('toggle', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        //prevent directive from attaching itself to everything that defines a toggle attribute
        if (!element.hasClass('selectpicker')) {
          return;
        }

        var target = element.parent();

        element.bind('click', function() {
          target.toggleClass('open')
        });

        element.next().find('li').bind('click', function() {
          target.toggleClass('open')
        })
      }
    };
  });

angular.module('angular-bootstrap-select', [])
  .directive('selectpicker', ['$timeout', '$parse', function($timeout, $parse) {
    return {
      restrict: 'A',
      require: '?ngModel',
      priority: 1001,
      link: function(scope, element, attrs) {
        element.selectpicker($parse(attrs.selectpicker)());

        scope.$watch(attrs.ngModel, function(value) {
          $timeout(function() {
            element.val(value);
            element.selectpicker('refresh');
          });
        });

        $timeout(function() {
          element.val(scope.$eval(attrs.ngModel));
          element.selectpicker('refresh');
        });
      }

    };
  }]);
