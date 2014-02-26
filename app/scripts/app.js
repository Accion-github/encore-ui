'use strict';
angular.module('billingApp', ['ngRoute', 'ngResource', 'encore.ui.tpls', 'encore.ui.rxForm', 'encore.ui.rxPaginate',
        'encore.ui.rxModalAction', 'encore.ui.rxSortableColumn', 'billing.ui.rxSwitch', 'billingSvcs'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/billing/overview/:accountNumber', {
                templateUrl: '/views/billing/overview.html',
                controller: 'OverviewCtrl'
            })
            .otherwise({
                //this is temporary until we get a more solid solution
                redirectTo: '/billing/overview/12345'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
    });
