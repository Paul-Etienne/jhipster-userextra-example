(function() {
    'use strict';

    angular
        .module('userExtraApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-extra', {
            parent: 'entity',
            url: '/user-extra',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'userExtraApp.userExtra.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-extra/user-extras.html',
                    controller: 'UserExtraController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userExtra');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-extra-detail', {
            parent: 'user-extra',
            url: '/user-extra/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'userExtraApp.userExtra.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-extra/user-extra-detail.html',
                    controller: 'UserExtraDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userExtra');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserExtra', function($stateParams, UserExtra) {
                    return UserExtra.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'user-extra',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('user-extra-detail.edit', {
            parent: 'user-extra-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extra/user-extra-dialog.html',
                    controller: 'UserExtraDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserExtra', function(UserExtra) {
                            return UserExtra.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-extra.new', {
            parent: 'user-extra',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extra/user-extra-dialog.html',
                    controller: 'UserExtraDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                phone: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('user-extra', null, { reload: 'user-extra' });
                }, function() {
                    $state.go('user-extra');
                });
            }]
        })
        .state('user-extra.edit', {
            parent: 'user-extra',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extra/user-extra-dialog.html',
                    controller: 'UserExtraDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserExtra', function(UserExtra) {
                            return UserExtra.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-extra', null, { reload: 'user-extra' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-extra.delete', {
            parent: 'user-extra',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extra/user-extra-delete-dialog.html',
                    controller: 'UserExtraDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['UserExtra', function(UserExtra) {
                            return UserExtra.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-extra', null, { reload: 'user-extra' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
