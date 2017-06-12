(function() {
    'use strict';

    angular
        .module('userExtraApp')
        .controller('UserExtraDetailController', UserExtraDetailController);

    UserExtraDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'UserExtra', 'User'];

    function UserExtraDetailController($scope, $rootScope, $stateParams, previousState, entity, UserExtra, User) {
        var vm = this;

        vm.userExtra = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('userExtraApp:userExtraUpdate', function(event, result) {
            vm.userExtra = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
