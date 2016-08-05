//HEAD 
(function(app) {
try { app = angular.module("appTable.templates"); }
catch(err) { app = angular.module("appTable.templates", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("../table/src/templates/app-table.html","<table class=\"table table-striped table-bordered table-hover table-condensed\"><thead><tr><th ng-repeat=\"column in columns track by $index\" ng-click=\"orderColumn(listaFiltrada, column.value, reverse)\" ng-class=\"{sortorder_asc  : !reverse && predicate === column.value, \n" +
    "                           sortorder_desc :  reverse && predicate === column.value, \n" +
    "                           sortorder      :             predicate !== column.value}\">{{column.label}}</th></tr></thead><tbody><tr ng-repeat=\"item in listaFiltrada = filterList(list, search) | \n" +
    "                       orderBy : predicate : reverse | \n" +
    "                       limitTo : limitTo.value : start track by $index\"><td ng-repeat=\"column in columns track by $index\"><span compile=\"getColumn(item, column)\"></span></td></tr></tbody></table>")
}]);
})();