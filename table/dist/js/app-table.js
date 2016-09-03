angular.module('appTable', [
  'ui.bootstrap',
  'appTable.templates'
])

.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.compile);
            },
            function(value) {
                element.html(value);
                $compile(element.contents())(scope);
            }
        );
    };
}])

.directive('appTable', ['$filter', function ($filter) {

    return {

        restrict: 'E',
        templateUrl: 'app-table.html',
        scope: {
            list: '=',
            columns: '=',
            events: '=?'
        },
        // transclude: {
        //     'filterContent': '?filterContent',
        //     'titleContent': '?titleContent',
        //     'rodapeContent': '?rodapeContent'
        // },

        link: function($scope, element, attr, controller, transclude) {               
                        
            $scope.limits = [
                {name: '25',  value: 25 },
                {name: '50',  value: 50 },
                {name: '75',  value: 75 },
                {name: '100', value: 100}]; 
            
            var init = function () {   
                $scope.currentPage = 1; 
                $scope.maxSize = 5; 
                $scope.limitTo = $scope.limits[0];
                $scope.predicate = $scope.columns[0];
                $scope.reverse = false; 
            };
            
            var reset = function() {
                getSizeTotal();
                getStart();
                getFinish();
                $scope.orderBy();
                // eventTable($scope.listFiltered);
            };
            
            var getSizeTotal = function() {
                if(!$scope.listFiltered) { $scope.total = 0; }
                else { $scope.total = $scope.listFiltered.length; }
            };
        
            var getStart = function() {
                $scope.start = (($scope.currentPage - 1) * $scope.limitTo.value);
                $scope.from = 0;
                if($scope.total) { $scope.from = $scope.start + 1; }
            }; 

            var getFinish = function() {
                $scope.to = $scope.from + $scope.limitTo.value - 1;
                if($scope.to > $scope.total) { $scope.to = $scope.total; }
            };
            
            var getColumn = function(item, colunas) {
                var value = item[colunas[0]];
                colunas.splice(0, 1);
                if(!colunas.length) return value;
                return getColumn(value, colunas);
            };

            $scope.getColumn = function(item, column) {
                var columns = column.value.split('.');
                var value = getColumn(item, angular.copy(columns));
                if(column.filter && column.filter.callback){ value = $filter(column.filter.name)(value, column.filter.callback); }
                else if(column.filter){ value = $filter(column.filter.name)(value, column.filter.args); }
                return value;
            };
            
            $scope.filterList = function(list, search) {
                // if(scope.searchAll) { list = $filter('filter')(list, scope.searchAll); }
                // if(scope.filter) { list = scope.filter(list, search); }
                return list;
            };

            $scope.orderColumn = function(lista, predicate, reverse) {
                $scope.reverse = ($scope.predicate === predicate) ? !reverse : false;
                $scope.predicate = predicate;
                reset();
            };

            $scope.orderBy = function() {
                $scope.listFiltered = $filter('orderBy')($scope.listFiltered, $scope.predicate, $scope.reverse);
            };

            init();

        }
    }
}]);