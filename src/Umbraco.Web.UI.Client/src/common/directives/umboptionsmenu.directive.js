angular.module("umbraco.directives")
.directive('umbOptionsMenu', function ($injector, treeService, navigationService, umbModelMapper, appState) {
    return {
        scope: {
            currentSection: "@",
            currentNode: "="
        },
        restrict: 'E',
        replace: true,
        templateUrl: 'views/directives/umb-optionsmenu.html',
        link: function (scope, element, attrs, ctrl) {

            //adds a handler to the context menu item click, we need to handle this differently
            //depending on what the menu item is supposed to do.
            scope.executeMenuItem = function (action) {
                navigationService.executeMenuAction(action, scope.currentNode, scope.currentSection);
            };

            //callback method to go and get the options async
            scope.getOptions = function () {

                if (!scope.currentNode) {
                    return;
                }
                
                if (!scope.actions) {
                    treeService.getMenu({ treeNode: scope.currentNode })
                        .then(function (data) {
                            scope.actions = data.menuItems;
                        });
                }
            };

        }
    };
});