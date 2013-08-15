MindFlex-NodeCopter (Trialectic)
===================

You and 2 friends (or enemies) can fly a quadcopter with your minds!

what you need:

* a sense of adventure
* node.js (http://nodejs.org)
* 3 hacked mindflex headsets (http://frontiernerds.com/brain-hack)
* 2 guinnea-pig like friends 

Inside the directory you'll find 2 files:

1) server_sockets.js
  * serves brain data to 127.0.0.1:3000
  * controls AR Drone 2.0
    * headset 1: Takeoff/Landing
    * headset 2: Unidirectional Rotation
    * headset 3: Pulsed Forward Motion
    
2) index.html
  * posts connection quality, attention, and meditation data for each headset
  * posts drone flight states
  

Have fun and if you have any questions or ideas for improving it, hit me up.

