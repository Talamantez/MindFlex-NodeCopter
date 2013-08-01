fs = require('fs');

var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');
var benchmark1=40;
var benchmark2=40;
var benchmark3=40;
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
/*If you press "ctrl+c", the drone stops and lands and the program errors out.
	you can start again right away*/
process.stdin.on('keypress', function (c, key) {
  console.log(0, c, key)
  if (key && key.ctrl && key.name == 'c') {
    
	 dontGetReading=1;
	 client.stop();
	 client.land();
	 console.log('mayday! emergency landing!');
	 /*process.stdin.quit() /*this line isn't good code, but it does the trick
							it errors the program out instead of freezing it
							so you can start the script again from the console
							without having to close out first, which is what happens
							without it. Still have to find some real code to go here
							but it's working for now.
							*/
	 
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
	var array1 = fs.readFileSync('C:/Users/rtalaman/Documents/Processing/Brain_Serial_3_Ports/data/data_Serial_1.txt').toString().split("\n");
	var testConnection1 = array1[0];
	var attention1 = 0;          //initialize Attention value at 0
		if (testConnection1 == 200){ //if headset is not on, set attention1 to 0
			attention1 = 0 ;
			console.log("Headset 1 Disconnected     :(");
			}
		else{                        //If the headset is on your head(not 200)
		attention1 = array1[1];  //set Attention to the attention value from Processing
		console.log("1st Headset Attention: " + attention1);
		}
	
/////////////////////////////////////////////////////////////
	var array2 = fs.readFileSync('C:/Users/rtalaman/Documents/Processing/Brain_Serial_3_Ports/data/data_Serial_2.txt').toString().split("\n");
	var testConnection2 = array2[0];
	var attention2 = 0;           //initialize Attention value at 0
		if (testConnection2 == 200){	
			attention2 = 0;
			console.log("Headset 2 Disconnected     :(");
			}	
		else{
			attention2 = array2[1];
			console.log("2nd Headset Attention: " + attention2);
			}
	
/////////////////////////////////////////////////////////////
	var array3 = fs.readFileSync('C:/Users/rtalaman/Documents/Processing/Brain_Serial_3_Ports/data/data_Serial_3.txt').toString().split("\n");
	var testConnection2 = array3[0];
	var attention3 = 0;//initialize Attention value at 0
		if (testConnection2 == 200){
			attention3 = 0;
			console.log("Headset 3 Disconnected     :(");
			}
		else{	
			attention3 = array3[1];
			console.log("3rd Headset Attention: " + attention3);
			}
	
	
	/* if Headset 1's attention>benchmark, launch,
	else, land */
	if(attention1>=benchmark1){
		launch();		
		inAir=1;
		console.log('Launched');}
	else{client.stop();
		client.land();
		inAir=0;
		}
		
	/*while launched, if Headset 2's attention>benchmark, rotate right,
		else, stop rotating*/
	/*while launched, if Headset 3's attention>benchmark, move forward one step
		else, don't move forward*/
		
	if(inAir=1){
		if(attention2>=benchmark2){
			aimRight();
			console.log('Rotating Right');}
		if(attention3>=benchmark3){
			stepForward();
			console.log('Stepping Forward');}
			}	
	setTimeout(getReading,2000);
	}}
	
function launch(){	
		client.takeoff();
		setTimeout(launch,2000);
  }

function aimRight(){
	client.clockwise(0.5);
	client.after(250,function(){
	this.stop();
	setTimeout(aimRight,1000);
	})
}

function stepForward(){
	client.front(.1);
	client.after(100,function(){
	this.stop();
	setTimeout(stepForward,1000);
	})
	}