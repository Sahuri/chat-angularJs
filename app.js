angular.module('webChatApp', [])
    .controller('ChatController', function ($scope, $window) {
        $scope.isChatActive = false;
        $scope.userName = '';
        $scope.message = '';
        $scope.chatHistory = [];

        $scope.joinChat = function () {
            if ($scope.userName) {
                $scope.isChatActive = true;
                $scope.loadChatHistory();
            }
        };

        $scope.sendMessage = function () {
            if ($scope.userName && $scope.message) {  
                $scope.loadChatHistory();
                $scope.chatHistory.push({ sender: $scope.userName, text: $scope.message });
                $window.localStorage.setItem('chatHistory', JSON.stringify($scope.chatHistory));
            }
        };

        // Mendengarkan pesan yang dikirim dari tab lainnya
        $window.addEventListener('storage', function(event) {
            if (event.key === 'chatHistory') {
                $scope.$apply(function() {
                    var newData=JSON.parse(event.newValue);
                    $scope.chatHistory.push(newData[newData.length - 1]);
                    console.log($scope.chatHistory);
                });
            }
        });

        $scope.loadChatHistory = function () {
            var history = $window.localStorage.getItem('chatHistory');
            if (history) {
                $scope.chatHistory = JSON.parse(history);
                console.log($scope.chatHistory);
            }
        };

        $scope.loadChatHistory();

    });