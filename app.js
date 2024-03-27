angular.module('webChatApp', [])
    .controller('ChatController', function ($scope) {
        $scope.isChatActive = false;
        $scope.chatHistory = [];

        $scope.joinChat = function () {
            if ($scope.userName) {
                $scope.isChatActive = true;
            }
        };

        $scope.sendMessage = function () {
            if ($scope.message) {
                var newMessage = {
                    sender: $scope.userName,
                    text: $scope.message
                };
                $scope.chatHistory.push(newMessage);
                localStorage.setItem('chatHistory', JSON.stringify($scope.chatHistory));
                $scope.message = '';
            }
        };

        $scope.loadChatHistory = function () {
            var history = localStorage.getItem('chatHistory');
            if (history) {
                $scope.chatHistory = JSON.parse(history);
            }
        };

        $scope.loadChatHistory();

        // Watch for changes in chatHistory to update local storage
        $scope.$watch('chatHistory', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                localStorage.setItem('chatHistory', JSON.stringify($scope.chatHistory));
            }
        }, true);
    });