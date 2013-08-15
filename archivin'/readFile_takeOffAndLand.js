fs = require('fs')

var arDrone = require('ar-drone');
var client  = arDrone.createClient('192.168.1.1');
var fs = require('fs');

//read the file with a delay of 1 second

for(i=0;i<10000;i++){
var array = fs.readFileSync('/foo/bar/data.txt').toString().split("\n");
// for(i in array) {
    // console.log(array[i]);
// }
var attention=array[1];
console.log(attention);

var benchmark=50;
//If your attention is over the benchmark, Run takeoff and land 

if(attention>benchmark){
client.takeoff();

client
  .after(1000, function() {
    this.clockwise(0.5);
  })
  .after(2000, function() {
    this.stop();
    this.land();
  });
  i+=1;
  }
// else if(attention<=benchmark){
// client
	// .after(0, function(){
		// this.stop();
		// this.land();
		// }):
   // +=1;
   // }  
  }