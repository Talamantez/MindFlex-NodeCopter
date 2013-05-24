MindFlex-NodeCopter
===================

Make your AR Drone 2.0 take off by thinking hard.

1) Hack a MindFlex headset.  (www.frontiernerds.com/Mind-Hack)

2) Install Processing.       (http://processing.org/download/)

3) Install Node.js.          (http://nodejs.org/download/) 

4) Plug the headset into a com port.

5) Turn on the drone and connect your computer to its wifi.

6) Open the Processing sketch - run it to make sure you're getting packets. If you're not, try a different COM port?

7) Edit the JS file to contain the path of the data folder of the processing sketch.

8) Open command prompt. cd into the folder containing your JS file.

9) Type "node readFile_takeOffAndLand.js"

10) Think hard and watch your nodecopter take off for 2 seconds and land.

**ISSUES: Make sure you stop the node program (hit ctrl+c) if anything is going awry. If you take the headset off and the last reading was above 50, then the quad will continue to take off and land indefinitely.
**Working on a fix for this

Thanks!
Robert
