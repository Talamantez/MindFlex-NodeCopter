fs = require('fs');

var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');
var benchmark=50;

//read the file with a delay of 1 second
getReading();

function getReading(){
	var array = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_Drone_Control/data/data.txt').toString().split("\n");
	var attention=array[1];
	console.log(attention);
	if(attention>=benchmark){
		fly();
		}
	setTimeout(getReading,5000);
	
	
}
//If your attention is over the benchmark, Run takeoff and land 
function fly(){
	{
		client.takeoff();
		client.after(1000, function() 
			{
			this.clockwise(0.5);
			}
					);
					
		client.after(5000, function() 
			{
		this.stop();
		this.land();
			}					
					);
  setTimeout(fly,10000);
  
  }
  }