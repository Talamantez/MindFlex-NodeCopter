/**
 * Sketch for a drone control object. 
 * NOT FUNCTIONAL just ideas, if I wasn't 
 * a bit tipsy this might work for realzzzzzz
 */

myDrone = new DroneControls();
myDrone.init('192.168.1.1');
myDrone.registerFileInput('helmet1', "c:\files\readFile1");
myDrone.registerFileInput('helmet2', "c:\files\readFile2");

while(true){
  readings = myDrone.getAllReadings();
  winner = myDrone.determineWinner(readings);
  if (winner == 'helmet1'){myDrone.fly();}
  else if (winner == 'helmet2'){myDrone.stopAndLand();}
}


var DroneControls = {

  this.init = function(droneIp){
    this.fs = require('fs')
    this.arDrone = require('ar-drone');
    this._ = require('_.js');
    this.droneIp = droneIp;
    this.fileInputs = {};
    this.brainData = {};
    this.benchMark = 30;
    this.logging = false;    
    this.drone  = this.arDrone.createClient(this.droneIp);
    return this;
  }

  this.getReadingFromFile = function(inputName){
     this.brainData.[inputName] = this.fs.readFileSync(this.fileInputs[inputName])
      .toString()
      .split("\n");
  }

  this.registerFileInput = function(inputName, filePath){
    this.fileInputs[inputName] = filePath;
  }


  this.getAllReadings = function(){
    var returnData = {};
    _.each(this.fileInputs, function(filePath, inputName){
      returnData[inputName] = this.getReadingFromFile(inputName);
    });
    return returnData;
  }

  this.determineWinner(data){
    //magic to determine winner
    return inputNameOfWinner;
  }


  this.fly = function(){
    this.drone.takeoff();
    setTimeout(fly,2000);
  }

  this.stopAndLand = function(){
    this.drone.stop();
    this.drone.land();
    setTimeout(stopAndLand,2000);
  }  
};

