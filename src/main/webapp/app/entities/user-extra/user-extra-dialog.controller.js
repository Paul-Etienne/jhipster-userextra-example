(function() {
    'use strict';

    angular
        .module('userExtraApp')
        .controller('UserExtraDialogController', UserExtraDialogController);

    UserExtraDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'UserExtra', 'User'];

    function UserExtraDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, UserExtra, User) {
        var vm = this;

        vm.userExtra = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.userExtra.id !== null) {
                UserExtra.update(vm.userExtra, onSaveSuccess, onSaveError);
            } else {
                UserExtra.save(vm.userExtra, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('userExtraApp:userExtraUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
