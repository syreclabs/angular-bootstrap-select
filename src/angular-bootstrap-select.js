angular.module('angular-bootstrap-select', [])
  // supply open and close without load bootstrap.js
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
  })

  .directive('selectpicker', ['$timeout', '$parse', function($timeout, $parse) {
    return {
      restrict: 'A',
      require: '?ngModel',
      priority: 1001,

      link: function(scope, element, attrs) {
        rebuild();

        scope.$watch(attrs.ngModel, function(value) {
          $timeout(function() {
            element.val(value);
            element.selectpicker('refresh');
          });
        });

        if (attrs.spOptions) {
          scope.$watch(attrs.spOptions, function(options) {
            if (options && options.$promise) {
              options.$promise.then(function(options) {
                rebuild();
              })
            }
            else {
              rebuild();
            }
          });
        }
        
        function rebuild() {
          var sp = element.data('selectpicker');
          if (sp) {
            // sp.$menu.parent().remove();
            sp.$newElement.remove();
            element.removeData('selectpicker');
          }
          $timeout(function() {
            element.selectpicker($parse(attrs.selectpicker)());
            element.val(scope.$eval(attrs.ngModel));
            element.selectpicker('refresh');
          });
        }

        // $timeout(function() {
        //   element.val(scope.$eval(attrs.ngModel));
        //   element.selectpicker('refresh');
        // });
      }
    };
  }]);
