/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {


    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        /*
        document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage); 
        document.getElementById("removeProjectFromLocalStorage").addEventListener 
   ("click", removeProjectFromLocalStorage);

   alert("hello")*/

   //Buttons
    document.getElementById("createContact").addEventListener("click", createContact);
    document.getElementById("findContact").addEventListener("click", findContact);
    document.getElementById("deleteContact").addEventListener("click", deleteContact);
    
    //List
    //document.getElementById("listContact").addEventListener("click", listContact);

    //class-4 - battery status
    window.addEventListener("batterystatus", onBatteryStatus, false); 

    //Device
    document.getElementById("displayDevice").addEventListener("click", displayDevice);

    //Accelerometer
    document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
    document.getElementById("watchAcceleration").addEventListener(
   "click", watchAcceleration);

    //Geolocation
    document.getElementById("getPosition").addEventListener("click", getPosition);
    document.getElementById("watchPosition").addEventListener("click", watchPosition);
    
    //Current Geolocation
    document.getElementById("currentGeolocation").addEventListener("click", currentGeolocation);

    //Count Distance
    document.getElementById("countDistance").addEventListener("click", countDistance);

    //Dialogs
    document.getElementById("dialogAlert").addEventListener("click", dialogAlert);
    document.getElementById("dialogConfirm").addEventListener("click", dialogConfirm);
    document.getElementById("dialogPrompt").addEventListener("click", dialogPrompt);
    document.getElementById("dialogBeep").addEventListener("click", dialogBeep); 

    //Vibration
    document.getElementById("vibration").addEventListener("click", vibration);
    document.getElementById("vibrationPattern").addEventListener("click", vibrationPattern); 

    //Media
    document.getElementById("playAudio").addEventListener("click", playAudio);
    document.getElementById("pauseAudio").addEventListener("click", pauseAudio);
    document.getElementById("stopAudio").addEventListener("click", stopAudio);
    document.getElementById("volumeUp").addEventListener("click", volumeUp);
    document.getElementById("volumeDown").addEventListener("click", volumeDown);

    //File System
    document.getElementById("createFile").addEventListener("click", createFile);
    document.getElementById("writeFile").addEventListener("click", writeFile);
    document.getElementById("readFile").addEventListener("click", readFile);
    document.getElementById("removeFile").addEventListener("click", removeFile);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};
/*
function setLocalStorage() { 
   localStorage.setItem("Name", "John"); 
   localStorage.setItem("Job", "Developer"); 
   localStorage.setItem("Project", "Cordova Project"); 
}
function removeProjectFromLocalStorage() {
   localStorage.removeItem("Project");
}
*/

/* Create Contact */
function createContact() {
   var myContact = navigator.contacts.create({"displayName": "Test User"});
   myContact.save(contactSuccess, contactError);
    
   function contactSuccess() {
      alert("Contact is saved!");
   }
    
   function contactError(message) {
      alert('Failed because: ' + message);
   }
}

/* Find Contact */
function findContacts() {
    $("#loading").show();

   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
    
   function contactfindSuccess(contacts) {

    //to display contacts in a list view
    var listContact='';
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].displayName=="Test User") {
            listContact='<li>'+contacts[i].displayName+'</li>';
            $("#contactsList").append(listContact);
        }
         //alert("Display Name = " + contacts[i].displayName);
      }
      $("#contactsList").listview("refresh");
      $("#loading").hide();
   }
    
   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
    
}

/* Delete Contact */
function deleteContact() {
   var options = new ContactFindOptions();
   options.filter = "Test User";
   options.multiple = false;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

   function contactfindSuccess(contacts) {
      var contact = contacts[0];
      contact.remove(contactRemoveSuccess, contactRemoveError);

      function contactRemoveSuccess(contact) {
         alert("Contact Deleted");
      }

      function contactRemoveError(message) {
         alert('Failed because: ' + message);
      }
   }

   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
    
}

/*
function listContact(){
    alert("Hello1");
}
*/

//Battery Stauts
function onBatteryStatus(info) { 
   alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged); 
}

//Device
function displayDevice() {
   alert("Cordova version: " + device.cordova + "\n" +
      "Device model: " + device.model + "\n" +
      "Device platform: " + device.platform + "\n" +
      "Device UUID: " + device.uuid + "\n" +
      "Device version: " + device.version);
}

//Accelerometer
function getAcceleration() {
   navigator.accelerometer.getCurrentAcceleration(
      accelerometerSuccess, accelerometerError);

   function accelerometerSuccess(acceleration) {
      alert('Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' +
         'Timestamp: '      + acceleration.timestamp + '\n');
   };

   function accelerometerError() {
      alert('onError!');
   };
}

function watchAcceleration() {
   var accelerometerOptions = {
      frequency: 3000
   }
   var watchID = navigator.accelerometer.watchAcceleration(
      accelerometerSuccess, accelerometerError, accelerometerOptions);

   function accelerometerSuccess(acceleration) {
      alert('Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' +
         'Timestamp: '      + acceleration.timestamp + '\n');

      setTimeout(function() {
         navigator.accelerometer.clearWatch(watchID);
      }, 10000);
   };

   function accelerometerError() {
      alert('onError!');
   };
  
}


//Geolocation
function getPosition() {
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

function watchPosition() {
   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }
   var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }
}

//Current Geolocation
function currentGeolocation(){

 var x = navigator.geolocation.getCurrentPosition(onSuccess, onError);

  function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

}

//Count Distance
function countDistance(){
  /*
  navigator.geolocation.getCurrentPosition(function (position) {
     var here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     var msg = "Your current latitude is: " + position.coords.latitude +" and current longitude is " + position.coords.longitude;

     if (window.cordova && window.plugins && window.plugins.toast)
         window.plugins.toast.showShortCenter(msg);
     else alert(msg);

 },function(error){console.log("Error retrieving location " + error.code + " " + error.message)});
*/

navigator.geolocation.getCurrentPosition(function (position) {
     var here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

     // Use Google Maps Geometry library to compute distance between two points and produce a message
     var distance = (google.maps.geometry.spherical.computeDistanceBetween(here, there) / 1000).toFixed(2);
     var msg = "You are " + distance + "KM away from here";

     if (window.cordova && window.plugins && window.plugins.toast)
         window.plugins.toast.showShortCenter(msg);
     else alert(msg);

 },function(error){console.log("Error retrieving location " + error.code + " " + error.message)});
}


//Dialogs
function dialogAlert() {
   var message = "I am Alert Dialog!";
   var title = "ALERT";
   var buttonName = "Alert Button";
   navigator.notification.alert(message, alertCallback, title, buttonName);
   
   function alertCallback() {
      console.log("Alert is Dismissed!");
   }
}
function dialogConfirm() {
   var message = "Am I Confirm Dialog?";
   var title = "CONFIRM";
   var buttonLabels = "YES,NO";
   navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

   function confirmCallback(buttonIndex) {
      console.log("You clicked " + buttonIndex + " button!");
   }
  
}
function dialogPrompt() {
   var message = "Am I Prompt Dialog?";
   var title = "PROMPT";
   var buttonLabels = ["YES","NO"];
   var defaultText = "Default"
   navigator.notification.prompt(message, promptCallback, 
      title, buttonLabels, defaultText);

   function promptCallback(result) {
      console.log("You clicked " + result.buttonIndex + " button! \n" + 
         "You entered " +  result.input1);
   }
  
}
function dialogBeep() {
   var times = 2;
   navigator.notification.beep(times);
}.


//Vibration
function vibration() {
   var time = 3000;
   navigator.vibrate(time);
}

function vibrationPattern() {
   var pattern = [1000, 1000, 1000, 1000];
   navigator.vibrate(pattern);
}


//Media

var myMedia = null;
function playAudio() {
   var src = "golmaal_again.mp3";

   if(myMedia === null) {
      myMedia = new Media(src, onSuccess, onError);

      function onSuccess() {
         console.log("playAudio Success");
      }

      function onError(error) {
         console.log("playAudio Error: " + error.code);
      }
   }
   myMedia.play();
}

function pauseAudio() {
   if(myMedia) {
      myMedia.pause();
   }
}

function stopAudio() {
   if(myMedia) {
      myMedia.stop(); 
   }
   myMedia = null;
}

var volumeValue = 0.5;
function volumeUp() {
   if(myMedia && volumeValue < 1) {
      myMedia.setVolume(volumeValue += 0.1);
   }
}

function volumeDown() {
   if(myMedia && volumeValue > 0) {
      myMedia.setVolume(volumeValue -= 0.1);
   }
}


//File System
/*
function createFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
  
}
function writeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               alert('Write completed.');
            };

            fileWriter.onerror = function(e) {
               alert('Write failed: ' + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}
function readFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
            };
            reader.readAsText(file);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
} 
function removeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

         fileEntry.remove(function() {
            alert('File removed.');
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
} 

*/