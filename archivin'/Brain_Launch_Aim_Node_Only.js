fs = require('fs');

var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');
var benchmark1=40;
var benchmark2=40;
var benchmark3=40;
var inAir=0;
var dontGetReading = 0;

var connection_1;
var attention_1;
var meditation_1;

var connection_2;
var attention_2;
var meditation_2;

var connection_3;
var attention_3;
var meditation_3;
////////////////////////////////////////////////////////
// Use the cool library                               //
// git://github.com/voodootikigod/node-serialport.git //
// to read the serial port where arduino is sitting.  //
////////////////////////////////////////////////////////               
var com = require("serialport");

var serialPort_1 = new com.SerialPort("COM6", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });

  var serialPort_2 = new com.SerialPort("COM7", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });
  var serialPort_3 = new com.SerialPort("COM5", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });
  
serialPort_1.on('open',function() {
  console.log('ONE: COM 5: Port open');
});

serialPort_2.on('open',function() {
  console.log('TWO: COM 6: Port open');
});

serialPort_3.on('open',function() {
  console.log('TRE: COM 7: Port open');
});


serialPort_1.on('data', function(data) {
  var parsed_1 = data.split(',');
  connection_1 = parsed_1[0]
  attention_1 = parsed_1[1];
  meditation_1 = parsed_1[2];
 // console.log("1: "+ connection_1 + '  ' + attention_1 + ' ' + meditation_1);
  });

serialPort_2.on('data', function(data) {
 var parsed_2 = data.split(',');
  connection_2 = parsed_2[0]
  attention_2 = parsed_2[1];
  meditation_2 = parsed_2[2];
  //console.log("2: "+ connection_2+ '  ' + attention_2 + ' ' + meditation_2);
});

serialPort_3.on('data', function(data) {
  var parsed_3 = data.split(',');
  connection_3 = parsed_3[0]
  attention_3 = parsed_3[1];
  meditation_3 = parsed_3[2];
  //console.log("3: "+ connection_3 + '  ' + attention_3 + ' ' + meditation_3);
});

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
	//console.log(attention_1);
	//var array1 = fs.readFileSync('C:/Users/rtalaman/Documents/Processing/Brain_Serial_3_Ports/data/data_Serial_1.txt').toString().split("\n");
	var testConnection_1 = connection_1;
	//var attention1 = 0;          //initialize Attention value at 0
		if (testConnection_1 == 200){ //if headset is not on, set attention1 to 0
			attention_1 = 0 ;
			console.log("Headset 1 Disconnected     :(");
			}
		else{                        //If the headset is on your head(not 200)
		//attention1 = array1[1];  //set Attention to the attention value from Processing
		console.log("1st Headset c/a: " + connection_1 + " " + attention_1);
		}
	
/////////////////////////////////////////////////////////////
	//var array2 = fs.readFileSync('C:/Users/rtalaman/Documents/Processing/Brain_Serial_3_Ports/data/data_Serial_2.txt').toString().split("\n");
	var testConnection_2 = connection_2;
	//var attention2 = 0;           //initialize Attention value at 0
		if (testConnection_2 == 200){	
			attention_2 = 0;
			console.log("Headset 2 Disconnected     :(");
			}	
		else{
			//attention_2 = array2[1];
			console.log("2nd Headset c/a: " + connection_2 + " " + attention_2);
			}
	
/////////////////////////////////////////////////////////////
	//var array3 = fs.readFileSync('C:/Users/rtalaman/Documents/Processing/Brain_Serial_3_Ports/data/data_Serial_3.txt').toString().split("\n");
	var testConnection_3 = connection_3;
	//var attention3 = 0;//initialize Attention value at 0
		if (testConnection_3 == 200){
			attention_3 = 0;
			console.log("Headset 3 Disconnected     :(");
			}
		else{	
			//attention_3 = array3[1];
			console.log("3rd Headset c/a: " + connection_3 + " " + attention_3);
			}
	
	
	/* if Headset 1's attention>benchmark, launch,
	else, land */
	if(attention_1>=benchmark1){
		launch();		
		inAir=1;
		console.log('Launched');}
	else{client.stop();
		client.land();
		inAir=0;
		console.log('Landing');
		}
		
	/*while launched, if Headset 2's attention>benchmark, rotate right,
		else, stop rotating*/
	/*while launched, if Headset 3's attention>benchmark, move forward one step
		else, don't move forward*/
		
	if(inAir=1){
		if(attention_2>=benchmark2){
			aimRight();
			console.log('Rotating Right');}
		if(attention_3>=benchmark3){
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