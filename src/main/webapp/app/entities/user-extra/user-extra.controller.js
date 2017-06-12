(function() {
    'use strict';

    angular
        .module('userExtraApp')
        .controller('UserExtraController', UserExtraController);

    UserExtraController.$inject = ['UserExtra'];

    function UserExtraController(UserExtra) {

        var vm = this;

        vm.userExtras = [];

        loadAll();

        function loadAll() {
            UserExtra.query(function(result) {
                vm.userExtras = result;
                vm.searchQuery = null;
            });
        }
    }
})();
