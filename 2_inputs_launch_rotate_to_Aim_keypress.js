fs = require('fs');

var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');
var benchmark=40;
var inAir=0;
var dontGetReading = 0;

var keypress = require('./')
keypress(process.stdin)

if (process.stdin.setRawMode)
  process.stdin.setRawMode(true)
else
  require('tty').setRawMode(true)
//read the file with a delay of 1 second
getReading();
process.stdin.on('keypress', function (c, key) {
  console.log(0, c, key)
  if (key && key.ctrl && key.name == 'c') {
    //process.stdin.pause()
	 dontGetReading=1;
	 client.stop();
	 client.land();
	 
	 console.log('mayday! emergency landing!');
  }})
process.stdin.on('mousepress', function (mouse) {
  console.log(mouse)
})

keypress.enableMouse(process.stdout)
process.on('exit', function () {
  //disable mouse on exit, so that the state is back to normal
  //for the terminal.
  keypress.disableMouse(process.stdout)
})
process.stdin.resume()
function getReading(){
if(dontGetReading==0){
	var array1 = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_to_rectangles_1st_input/data/data.txt').toString().split("\n");
	var testConnection1 = array1[0];
	var attention1 = 0;//initialize Attention value at 0
	if (testConnection1 != 200){     //If the headset is on your head(not 200)
		var attention1 = array1[1];  //set Attention to the attention value from Processing
		}
	console.log("1st Headset Attention: " + attention1);
	var array2 = fs.readFileSync('C:/users/rtalaman/documents/processing/Brain_to_rectangles_2nd_input/data/data.txt').toString().split("\n");
	var  testConnection2 = array2[0];
	var attention2 = 0;//initialize Attention value at 0
	if (testConnection2 != 200){	
		var attention2 = array2[1];
		}
	console.log("2nd Headset Attention: " + attention2);
	/* if Headset 1's attention>benchmark, launch,
	else, land */
	if(attention1>=benchmark){
		fly();
		
		inAir=1;}
	else{client.stop();
		client.land();
		inAir=0;
		}
	/*while launched, if Headset 2's attention>benchmark, rotate right,
		else, stop rotating*/
	if(inAir=1){
		if(attention2>=benchmark){
			aimRight();}
			}	
	setTimeout(getReading,2000);
	}}
function fly(){	
		client.takeoff();
		setTimeout(fly,2000);
  }
function aimRight(){
	client.clockwise(0.5);
	client.after(250,function(){
	this.stop();
	setTimeout(aimRight,1000);
	})
}


