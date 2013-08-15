import processing.serial.*;

String[] incomingValues_Serial_1;
String[] data_Serial_1;

String[] incomingValues_Serial_2;
String[] data_Serial_2;

String[] incomingValues_Serial_3;
String[] data_Serial_3;

Serial serial_1;
Serial serial_2;
Serial serial_3;

int exists_Serial_1=0;
int exists_Serial_2=0;
int exists_Serial_3=0;

int lf = 10;	// ASCII linefeed

int count_Serial_1=0;//count incoming packets
int count_Serial_2=0;//count incoming packets
int count_Serial_3=0;//count incoming packets

int packetCount_Serial_1 = 0;
int packetCount_Serial_2 = 0; 
int packetCount_Serial_3 = 0;

int globalMax;
String scaleMode;

void setup() {
	size(300,225);
	smooth();
println(Serial.list());
//look for serial ports, if available, create serial connections

try{	serial_1 = new Serial(this, Serial.list()[0], 9600);	
	serial_1.bufferUntil(10);
        exists_Serial_1=1;}
catch(Exception e){exists_Serial_1=0;}
	
try{	serial_2 = new Serial(this, Serial.list()[1], 9600);	
	serial_2.bufferUntil(10);
        exists_Serial_2=1;}
catch(Exception e){exists_Serial_2=0;}

try{	serial_3 = new Serial(this, Serial.list()[2], 9600);	
	serial_3.bufferUntil(10);
        exists_Serial_3=1;}
catch(Exception e){exists_Serial_3=0;}
	}

	
void draw() {  
  /*If serial 1 exists, 
  load the written text file data_Serial_1.txt 
  */
//if(exists_Serial_1==1){  
  try{  data_Serial_1 = loadStrings("data_Serial_1.txt");
  //get the connection quality number -> Must Be 0 to get Attention value!
  int v=PApplet.parseInt(data_Serial_1[0]);
  //get the attention value if connection quality is 0
  if(v>=0){int w=PApplet.parseInt(data_Serial_1[1]);}}
  catch(Exception e){
    ;}
  //  }
  /*If serial 2 exists, 
  load the written text file data_Serial_2.txt 
  */
//if(exists_Serial_2==1){  
  try{  data_Serial_2 = loadStrings("data_Serial_2.txt");
  //get the connection quality number -> Must Be 0 to get Attention value!
  int v=PApplet.parseInt(data_Serial_2[0]);
  //get the attention value if connection quality is 0
  if(v>=0){int w=PApplet.parseInt(data_Serial_2[1]);}}
  catch(Exception e){
  ;}

//}
/*If serial 3 exists, 
  load the written text file data_Serial_3.txt 
  */
//if(exists_Serial_3==1){  
  try{  data_Serial_3 = loadStrings("data_Serial_3.txt");
  //get the connection quality number -> Must Be 0 to get Attention value!
  int v=PApplet.parseInt(data_Serial_3[0]);
  //get the attention value if connection quality is 0
  if(v>=0){int w=PApplet.parseInt(data_Serial_3[1]);}}
  catch(Exception e){
  ;}
}
//}
  
void serialEvent(Serial thisPort){
  
  //try{
    if (thisPort == serial_1){
	incomingValues_Serial_1 = split(serial_1.readString(), ',');
	println("ONE : " + incomingValues_Serial_1[0] + "/" + incomingValues_Serial_1[1] + "/" + incomingValues_Serial_1[2]);
        /*if the headset has a connection of 200 (headset off),
        zero out the Attention value to land the quadcopter       
        */
        //if(incomingValues[0] == 200)incomingValues[1]=0;
        //increase the reading count
        count_Serial_1+=1;
        //saveStrings(dataPath("thinkLeft_"+count+".txt"), incomingValues);
	//Print to a file that is referenced in the loop
     delay(1000);
     saveStrings(dataPath("data_Serial_1.txt"), incomingValues_Serial_1);
      // Add the data to the logs
	if (incomingValues_Serial_1.length > 1) {
		packetCount_Serial_1++;
		// Wait till the third packet or so to start recording to avoid initialization garbage.
		if(packetCount_Serial_1 > 3) {
			for (int i = 0; i < incomingValues_Serial_1.length; i++) {
				int newValue = Integer.parseInt(incomingValues_Serial_1[i].trim());
				// Zero the EEG power values if we don't have a signal.
				// Can be useful to leave them in for development.
				if((Integer.parseInt(incomingValues_Serial_1[0]) == 200) && (i > 2)) newValue = 0;		}
		}}}
   if(thisPort == serial_2){
//}
//catch(Exception e){;}
	
//try{
//
      incomingValues_Serial_2 = split(serial_2.readString(), ',');
	println("TWO : " + incomingValues_Serial_2[0] + "/" + incomingValues_Serial_2[1] + "/" + incomingValues_Serial_2[2]);
        /*if the headset has a connection of 200 (headset off),
        zero out the Attention value to land the quadcopter       
        */
        //if(incomingValues[0] == 200)incomingValues[1]=0;
        //increase the reading count
        count_Serial_2+=1;
        //  saveStrings(dataPath("thinkLeft_"+count+".txt"), incomingValues);
	//Print to a file that is referenced in the loop
     delay(1000);
     saveStrings(dataPath("data_Serial_2.txt"), incomingValues_Serial_2);
      // Add the data to the logs
	if (incomingValues_Serial_2.length > 1) {
		packetCount_Serial_2++;
		// Wait till the third packet or so to start recording to avoid initialization garbage.
		if(packetCount_Serial_2 > 3) {
			for (int i = 0; i < incomingValues_Serial_2.length; i++) {
				int newValue = Integer.parseInt(incomingValues_Serial_2[i].trim());
				// Zero the EEG power values if we don't have a signal.
				// Can be useful to leave them in for development.
				if((Integer.parseInt(incomingValues_Serial_2[0]) == 200) && (i > 2)) newValue = 0;
		}
		}}
//}

//catch(Exception e){;}
}

if (thisPort == serial_3){
	incomingValues_Serial_3 = split(serial_3.readString(), ',');
	println("TRE : " + incomingValues_Serial_3[0] + "/" + incomingValues_Serial_3[1] + "/" +incomingValues_Serial_3[2]);
        /*if the headset has a connection of 200 (headset off),
        zero out the Attention value to land the quadcopter       
        */
        //if(incomingValues[0] == 200)incomingValues[1]=0;
        //increase the reading count
        count_Serial_3+=1;
        //saveStrings(dataPath("thinkLeft_"+count+".txt"), incomingValues);
	//Print to a file that is referenced in the loop
     delay(1000);
     saveStrings(dataPath("data_Serial_3.txt"), incomingValues_Serial_1);
      // Add the data to the logs
	if (incomingValues_Serial_3.length > 1) {
		packetCount_Serial_3++;
		// Wait till the third packet or so to start recording to avoid initialization garbage.
		if(packetCount_Serial_3 > 3) {
			for (int i = 0; i < incomingValues_Serial_3.length; i++) {
				int newValue = Integer.parseInt(incomingValues_Serial_3[i].trim());
				// Zero the EEG power values if we don't have a signal.
				// Can be useful to leave them in for development.
				if((Integer.parseInt(incomingValues_Serial_3[0]) == 200) && (i > 2)) newValue = 0;		}
		}}}

//}
//catch(Exception e){;}

}




// Extend core's Map function to the Long datatype.
long mapLong(long x, long in_min, long in_max, long out_min, long out_max)  { 
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min; 
}
long constrainLong(long value, long min_value, long max_value) {
  if(value > max_value) return max_value;
  if(value < min_value) return min_value;
  return value;
}
