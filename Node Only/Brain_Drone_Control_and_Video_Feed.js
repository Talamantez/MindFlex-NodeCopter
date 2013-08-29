var http = require("http"),
    drone = require("../../index");
fs = require('fs');
var io = require('socket.io');
var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');
var com = require("serialport");

//benchmark attention levels for the players

var benchmark1=40;
var benchmark2=40;
var benchmark3=40;
var inAir=0;
var rotatingRight=0;
var movingForward=0;
var airState= 'waiting';
var rotationState= 'waiting';
var forwardState= 'waiting';

var dontGetReading = 0;

//initialize connection quality , attention, meditation for the players
var connection_1 = -50;
var attention_1 = -50;
var meditation_1 = -50;

var connection_2 = -50;
var attention_2 = -50;
var meditation_2 = -50;

var connection_3 = -50;
var attention_3 = -50;
var meditation_3 = -50;

var serialPort_1 = new com.SerialPort("COM6", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });
var serialPort_2 = new com.SerialPort("COM7", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });
var serialPort_3 = new com.SerialPort("COM8", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });
serialPort_1.on('open',function() {
  console.log('ONE: COM 6: Port open');
});
serialPort_2.on('open',function() {
  console.log('TWO: COM 7: Port open');
});
serialPort_3.on('open',function() {
  console.log('TRE: COM 8: Port open');
});
serialPort_1.on('data', function(data) {
  var parsed_1 = data.split(',');
  connection_1 = parsed_1[0];
  attention_1 = parsed_1[1];
  meditation_1 = parsed_1[2];
    });
serialPort_2.on('data', function(data) {
 var parsed_2 = data.split(',');
  connection_2 = parsed_2[0];
  attention_2 = parsed_2[1];
  meditation_2 = parsed_2[2];
});
serialPort_3.on('data', function(data) {
  var parsed_3 = data.split(',');
  connection_3 = parsed_3[0];
  attention_3 = parsed_3[1];
  meditation_3 = parsed_3[2];
});
getReading();
function getReading(){
if(dontGetReading==0){
	var testConnection_1 = connection_1;
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
		//if (testConnection_2 = 200){	
		//	attention_2 = 0;
		//	console.log("Headset 2 Disconnected     :(");
		//	}	
		//else{
			//attention_2 = array2[1];
			console.log("2nd Headset c/a: " + connection_2 + " " + attention_2);
		//	}
	
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
		airState='Launched';
		console.log(airState);}
	else if(attention_1<benchmark1){
		client.stop();
		client.land();
		inAir=0;
		airState='LAND';
		rotationState=airState;
		forwardState=airState;
		console.log(airState);
		}
	
	/*while launched, if Headset 2's attention>benchmark, rotate right,
		else, stop rotating*/
	/*while launched, if Headset 3's attention>benchmark, move forward one step
		else, don't move forward*/
		
	if(inAir!=0){
		if(connection_2<1){	
			if(attention_2>=benchmark2){
				rotatingRight=1;
				rotationState='ROTATE';
				aimRight();
				console.log(rotationState);
				}
			else{rotatingRight=0;
				rotationState='NO ROTATE';
				console.log(rotationState);
				}
						}
		else{rotatingRight=0;
			rotationState='NO ROTATE';
			console.log(rotationState);
			}
			
		if(connection_3<1){
			if(attention_3>=benchmark3){
				movingForward=1;
				forwardState='FRONT';
				stepForward();
				console.log(forwardState);
				}
			else{movingForward=0;
				forwardState='NO FRONT';
				console.log(forwardState);
				}
						}
			else{movingForward=0;
				forwardState='NO FRONT';
				console.log(forwardState);
				}
			
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
var camServer = http.createServer(function(req, res) {
	require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(camServer);
camServer.listen(5555);

var server= http.createServer(function(req, res){
		fs.readFile('./index.html', function(error,data){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data, 'utf-8');
			});
		}).listen(3000,"127.0.0.1");
	console.log('Server running at http://127.0.0.1.3000/');
	var io = require('socket.io').listen(server);
	io.sockets.on('connection', function(socket) {
		console.log('User Connected');
			brainData = [connection_1,attention_1,meditation_1,
							airState, 
						connection_2, attention_2, meditation_2,
							rotationState,
						connection_3, attention_3, meditation_3,
							forwardState];
		socket.emit('brainData', {array: brainData});
		socket.on('requestBrainData', function(){
			brainData = [connection_1,attention_1,meditation_1,
							airState, 
						connection_2, attention_2, meditation_2,
							rotationState,
						connection_3, attention_3, meditation_3,
							forwardState];
			socket.emit('brainData', {array: brainData});
					});
					
		socket.on('disconnect',function(){
			console.log('User Disconnected');
		});
	});

/*
access the head camera:
	client.config('video:video_channel', 0);
access the bottom camera"
	client.config('video:video_channel', 3);
*/