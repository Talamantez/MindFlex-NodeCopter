var nodeThinkGear = require('node-neurosky');
var http = require('http');
var arDrone = require('ar-drone');
// var arDrone = this.arDrone = require('ar-drone');

var myObject = {
	attention : 0,
	currentState : "land",
	drone : {},
	setAttention : function(att){
/*		console.log("Attention is ", att);
		if ( att > 50 && myObject.currentState == "land"){
			myObject.drone.takeoff();
			myObject.currentState = "hover";
			console.log("Start");
		}
		else if (att < 50 && myObject.currentState == "hover"){
			myObject.drone.stop();
			myObject.drone.land();
			myObject.currentState = "land";
			console.log("Stop");
		}
	},*/

		if (att < 50 && myObject.currentState == "hover"){
			myObject.drone.stop();
			myObject.drone.land();
			myObject.currentState = "land";
			console.log("Stop Edit");
		} else if ( att > 50 && myObject.currentState == "land"){
			myObject.drone.takeoff();
			myObject.currentState = "hover";
			console.log("Start Edit");
		}
	},
	init : function(){
		console.log("Initializing Droooooooone");
		myObject.drone = arDrone.createClient('192.168.1.1');
	},
	badSignal : function(){
		if (myObject.currentState == "hover"){
			myObject.drone.stop();
			myObject.drone.land();
		}
	}

};
droneConnect();

runHeadset();
function runHeadset(){
	console.log("Running headset");
	var tgClient = nodeThinkGear.createClient({
	    appName: 'SomeSortaClient',
	    appKey: 'iamtheverymodelofamodernmajorgeneral'
	});
  myObject.init();
	tgClient.on('data', function(data){
		//console.log(data);

		if( typeof data.eSense.attention === "number"){
			console.log("Setting attention?");
			myObject.setAttention(data.eSense.attention);
		} else {
			//console.log(data);
		}
		if (typeof data.poorSignalLevel === "number" && data.poorSignalLevel !== 0){
			console.log("Poor signal level : ", data.poorSignalLevel);
			if (data.poorSignalLevel == 200){
				myObject.badSignal();
			}
		} else if (typeof data.blinkStrength === "number"){
			console.log("Blinked at ", data.blinkStrength);
		} else {
			myObject.setAttention(data.eSense.attention);
		}
	});

	tgClient.connect();
}

function droneConnect(){
	console.log("entering drone connect");
	var arDrone = require('ar-drone');
	console.log("drone loaded, connecting to client");
	var client = arDrone.createClient('192.168.1.1');
	console.log("Client connected");

	client.takeoff();
	console.log("Takeoff");

	client.after(5000, function() {
		console.log("Landing");
	    this.stop();
	    this.land();
	  });

}


// function connectHeadset(){
// var tgClient = nodeThinkGear.createClient({
//     appName: 'SomeSortaClient',
//     appKey: 'iamtheverymodelofamodernmajorgeneral'
// });

// 	tgClient.currentData = {
// 		'attention' : 0,
// 		'meditation' : 0,
// 		'delta' : 0,
// 		'theta' : 0,
// 		'blink' : 0,
// 		'lastBlink' : 0
// 	}
// 	tgClient.on('data', function(data){
// 		if (typeof tgClient.currentData.eSense.attention === "number"){
// 		tgClient.currentData.attention = data.eSense.attention;
// 		tgClient.currentData.meditation = data.eSense.attention;
// 		tgClient.currentData.delta = data.eegPower.delta;
// 		tgClient.currentData.theta = data.eegPower.theta.
// 		}
// 		console.log(data);
// 	});

// 	tgClient.connect();


// 	// tgClient.on('data', function(data){
// 	// 	if (typeof data.poorSignalLevel === "number" && data.poorSignalLevel !== 0){
// 	// 		console.log("Poor signal level : ", data.poorSignalLevel)
// 	// 	} else if (typeof data.blinkStrength === "number"){
// 	// 		console.log("Blinked at ", data.blinkStrength);
// 	// 	} else {
// 	// 		if (data.eSense.attention > data.eSense.meditation){
// 	// 			console.log("Attentive eh?");
// 	// 		} else {
// 	// 			console.log("Much zen, very calm");
// 	// 		}
// 	// 	}
// 	// });

// 	var server = http.createServer(function(req, res){
// 		res.writeHead(200);
// 		res.write(JSON.stringify(tgClient.currentData));
// 		res.end();

// 	});

// 	server.listen(8181);
// }
