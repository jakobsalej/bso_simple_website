var app = angular.module('IoTApp', [])
app.factory('WatsonIoT',function(){
  return IBMIoTF.IotfApplication;
})

app.controller('main',['$scope','WatsonIoT',function($scope,WIoT){
  $scope.main ={};
  $scope.main.lastMeasurement = "No data available!";
  $scope.main.lastDate = "Not available";
  $scope.main.sensorId = "";
  $scope.main.EventLog = "";

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
  });
  appClient.on("reconnect", function () {
      appClient.subscribeToDeviceEvents();
  });
  window.onbeforeunload = function () {
    appClient.disconnect();
     // handle the exit event
  };
  
  // we get new data
  appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
    $scope.main.lastMeasurement = Math.round(parseFloat(payload) * 100) / 100 + "°C";
    $scope.main.lastDate = new Date().toString();
    $scope.main.sensorId = "Sensor: " + deviceId;
    $scope.$digest();
    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
  });


}]);
