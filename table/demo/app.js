angular.module('app', [
  'appTable'
])

.controller('appController', ['$scope', '$http', function ($scope, $http) {

  $scope.users = [];

  var init = function () {

      $scope.columns = [
          { label: '#',         value: 'id',      },
          { label: 'Username',  value: 'username' },
          { label: 'Nome',      value: 'name'     },
          { label: 'Sobrenome', value: 'lastName' },
          { label: 'Email',     value: 'email'    },
          { label: 'Telefone',  value: 'phone'    }
      ];
        
      $http.get('./users.json').success(function (data) {
          $scope.users = data;
      });

  };

  init();

}]);