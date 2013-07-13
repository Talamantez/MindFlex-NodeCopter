fs = require('fs');

var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');
var benchmark=30;
var inAir=0;

//read the file with a delay of 1 second
getReading();

function getReading(){
	var array1 = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_to_rectangles_1st_input/data/data.txt').toString().split("\n");
	var attention1 = array1[1];
	console.log('1st Headset Attention: 'attention1);
	var array2 = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_to_rectangles_2nd_input/data/data.txt').toString().split("\n");
	var attention2 = array2[1];
	console.log('2nd Headset Attention: 'attention2);
	/* if Headset 1's attention>benchmark, launch,
	else, land */
	if(attention>=benchmark){
		fly();
		inAir=1;}
	else{client.stop();
		client.land();
		inAir=0;
		}
	/*while launched, if Headset 2's attention>benchmark, rotate right,
		else, stop rotating*/
	while(inAir=1){
		if(attention2>=benchmark){
			spin();}
		else{client.clockwise(0.0)}
			}	
	setTimeout(getReading,2000);
	}
 
function fly(){	
		client.takeoff();					  
  }
  
function spin(){
	client.clockwise(0.5);
	client.after(1000,function(){
	this.stop();
	}
}