MindFlex-NodeCopter (Trialectic)
===================

You and 2 friends (or enemies) can fly a quadcopter with your minds!

what you need:

* a sense of adventure
* node.js (http://nodejs.org)
* 3 hacked mindflex headsets (http://frontiernerds.com/brain-hack)
* 2 guinea-pig like friends 

Inside the "Node Only" you'll find 2 files:

1) Brain_Drone_Control_and_Video_Feed.js
  * parses mindflex data from 3 serial ports
  * serves brain data to 127.0.0.1:3000
  * controls AR Drone 2.0
    * headset 1: Takeoff/Landing
    * headset 2: Unidirectional Rotation
    * headset 3: Pulsed Forward Motion
    
2) index.html
  * posts connection quality, attention, and meditation data for each headset
  * posts drone flight states
  
Have fun and if you have any questions or ideas for improving it, please let me know.

sam-heller added a library for the neurosky mindset - it's in "Node Only" and called "node-neurosky.js."

Invaluable resource from which all drone commands come: http://nodecopter.com/



