(function() {
    'use strict';

    angular
        .module('userExtraApp')
        .controller('UserExtraDeleteController',UserExtraDeleteController);

    UserExtraDeleteController.$inject = ['$uibModalInstance', 'entity', 'UserExtra'];

    function UserExtraDeleteController($uibModalInstance, entity, UserExtra) {
        var vm = this;

        vm.userExtra = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            UserExtra.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
