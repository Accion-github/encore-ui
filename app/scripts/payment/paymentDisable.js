/**
 * @ngdoc directive
 * @name billingApp:rxPaymentSetDefault
 * @restrict E
 *
 * @description
 * Sets the trigger for the make payment modal to be popped up.
 */
angular.module('billingApp')
    .directive('rxPaymentDisable', function () {
        return {
            restrict: 'E',
            templateUrl: '/views/payment/paymentDisable.html',
            transclude: true,
            scope: {
                user: '@',
                classes: '@',
                methodId: '@',
                method: '=',
                postHook: '='
            },
            controller: function ($scope, $q, PaymentFormUtil) {
                $scope.payment = {};
                $scope.setDefaultValues = function (methodId) {
                    $scope.payment.methodId = methodId;
                };
                $scope.changeMethodType = PaymentFormUtil.formFilter($scope);
            }
        };
    });