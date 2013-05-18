import processing.serial.*;
import controlP5.*;

ControlP5 controlP5;
ControlFont font;

int x = 30;
PFont fontA;

String[] incomingValues;
String[] data;

Serial serial;
int lf = 10;	// ASCII linefeed

int count=0;//count incoming packets
String fileName="think_1";

int packetCount = 0;
int globalMax;
String scaleMode;

void setup() {
	size(400,600);
	smooth();
	font = new ControlFont(createFont("DIN-MediumAlternate", 12), 12);
	// Create each channel
	serial = new Serial(this, Serial.list()[0], 9600);	
	serial.bufferUntil(10);
        fontA = loadFont("Ziggurat-HTF-Black-32.vlw");
        // Set the font and its size (in units of pixels)
        textFont(fontA, 32);

	}
	
void draw() {
  data = loadStrings("data.txt");
  

  int v=PApplet.parseInt(data[0]);

  
if(v>=1){
    int w=PApplet.parseInt(data[1]);
  int z=PApplet.parseInt(data[2]);
  fill(0);
  rect(0,0,width,height);
  fill(45);
  text(count, x, 60);
  fill(87);
  //text(data[0], x, 95);
 
  fill(97);
  rect(100,145,v,15);
   fill(204);
 // text(data[1], x, 130);

  text(data[0], x, 165);
  fill(97);
  rect(100,185,w,15);
   fill(204);
text(data[1], x, 200);
  fill(97);
  rect(100,240,z,15);
//delay(100000);

   fill(204);
text(data[2],x,255);




      
  fill(255);
  //text("shi", x, 185); }}
}

	}

void serialEvent(Serial p) {
	incomingValues = split(p.readString(), ',');

	println(incomingValues);
 count+=1;
        
      //  saveStrings(dataPath("thinkLeft_"+count+".txt"), incomingValues);
	//Print to a file that is referenced in the loop
delay(50);
     saveStrings(dataPath("data.txt"), incomingValues);
      // Add the data to the logs
	if (incomingValues.length > 1) {
		packetCount++;
		
		// Wait till the third packet or so to start recording to avoid initialization garbage.
		if(packetCount > 3) {
			for (int i = 0; i < incomingValues.length; i++) {
				int newValue = Integer.parseInt(incomingValues[i].trim());
		
				// Zero the EEG power values if we don't have a signal.
				// Can be useful to leave them in for development.
				if((Integer.parseInt(incomingValues[0]) == 200) && (i > 2)) newValue = 0;		}
		}
		
	}
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
