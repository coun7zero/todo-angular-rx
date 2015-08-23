export const escapeDirective = ['keyCodes', (keyCodes) => {
  return {
    restrict: 'A',

    link: (scope, $element, attrs) => {
      $element.on('keyup', (event) => {
        if (event.keyCode === keyCodes.ESCAPE) {
          scope.$apply(attrs.escape);
        }
      });

      scope.$on('$destroy', () => {
        $element.unbind('keyup');
      });
    }
  };
}];
