fs = require('fs');
var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');
var benchmark=30;
//read the file with a delay of 1 second
getReading();

function getReading(){
//get the data from  the headsets
	var array1 = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_to_rectangles_1st_input/data/data.txt').toString().split("\n");
	var array2 = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_to_rectangles_2nd_input/data/data.txt').toString().split("\n");
	var array3 = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_to_rectangles_3rd_input/data/data.txt').toString().split("\n");
//log the data	
	var attention1=array1[1];
		console.log('headset 1: '+attention1);
	var attention2=array2[1];
		console.log('headset 2: '+attention2);
	var attention3=array3[1];
		console.log('headset 3: '+attention3);
//determine the highest value	
var winningHeadset;
	if(attention1>attention2 && attention1>attention3){
		winningHeadset=1;}
	else if(attention2>attention1 && attention2>attention3){
		winningHeadset=2;}
	else if(attention3>attention1 && attention3>attention2){
		winningHeadset=3;}
	//decide which signal to run with...switch?
	console.log(winningHeadset+' IS WINNING');
//use a switch to command the drone
var choice=winningHeadset;
	switch(choice)
{
case 1:
		fly();
		console.log('flying');
		break;
case 2:
		client.clockwise(0.5);
		console.log('rotating');
		break;
case 3:		
		console.log('landing');
		break;
}				
	setTimeout(getReading,2000);
}


function fly(){
	
		client.takeoff();
		setTimeout(fly,2000);
					  
  }

function stopAndLand(){
		client.stop();
		client.land();
		setTimeout(stopAndLand,2000);
		
		}