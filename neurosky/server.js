var nodeThinkGear = require('node-neurosky');
var http = require('http');

var tgClient = nodeThinkGear.createClient({
    appName: 'SomeSortaClient',
    appKey: 'iamtheverymodelofamodernmajorgeneral'
});

tgClient.on('data', function(data){
	tgClient.currentData = data;
	console.log(data);
});

tgClient.connect();


// tgClient.on('data', function(data){
// 	if (typeof data.poorSignalLevel === "number" && data.poorSignalLevel !== 0){
// 		console.log("Poor signal level : ", data.poorSignalLevel)
// 	} else if (typeof data.blinkStrength === "number"){
// 		console.log("Blinked at ", data.blinkStrength);
// 	} else {
// 		if (data.eSense.attention > data.eSense.meditation){
// 			console.log("Attentive eh?");
// 		} else {
// 			console.log("Much zen, very calm");
// 		}
// 	}	
// });

var server = http.createServer(function(req, res){
	res.writeHead(200);
	res.write(JSON.stringify(tgClient.currentData));
	res.end();
	
});

server.listen(8181);