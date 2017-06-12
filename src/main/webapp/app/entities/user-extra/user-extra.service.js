(function() {
    'use strict';
    angular
        .module('userExtraApp')
        .factory('UserExtra', UserExtra);

    UserExtra.$inject = ['$resource'];

    function UserExtra ($resource) {
        var resourceUrl =  'api/user-extras/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
