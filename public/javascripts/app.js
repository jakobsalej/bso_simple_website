var app = angular.module('IoTApp', ['ngMaterial', 'angularjs-gauge'])
app.factory('WatsonIoT',function(){
  return IBMIoTF.IotfApplication;
})

app.controller('main',['$scope','WatsonIoT',function($scope,WIoT){
  $scope.main ={};
  $scope.main.lastMeasurement = null;
  //$scope.main.lastMeasurement = 23.5;
  $scope.main.lastDate = "Not available";
  $scope.main.sensorId = "Not available";
  $scope.main.connectionStatus = false;

  // application IoT stuff
  var appClientConfig = {
    org: '15kw3c',
    id: 'tempapp',
    "domain": "internetofthings.ibmcloud.com",
    "auth-key": 'a-15kw3c-h3c5qm5b01',
    "auth-token": '*D_A7*-ABa6RJgdd1p'
  };

  var appClient = new WIoT(appClientConfig);
  appClient.connect();
  appClient.on("connect", function () {
      appClient.subscribeToDeviceEvents();
      $scope.main.connectionStatus = true;
  });
  appClient.on("reconnect", function () {
      appClient.subscribeToDeviceEvents();
      $scope.main.connectionStatus = true;
  });
  window.onbeforeunload = function () {
    appClient.disconnect();
     // handle the exit event
  };
  
  // we get new data
  appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
    $scope.main.connectionStatus = true;
    $scope.main.lastMeasurement = (Math.round(parseFloat(payload) * 100) / 100) - 4;
    $scope.main.lastDate = new Date().toString();
    $scope.main.sensorId = deviceId;
    $scope.$digest();
    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
  });


}]);
