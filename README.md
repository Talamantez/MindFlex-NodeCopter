MindFlex-NodeCopter
===================

Trigger a NodeCopter js file by thinking hard

1) Hack a MindFlex headset. (www.frontiernerds.com/Mind-Hack)

2) Install Processing

3) Install Node.js

2) Plug the headset into a com port

3) Turn on the drone and connect your computer to its wifi

4) Open the Processing sketch - run it to make sure you're getting packets. If you're not, try a different COM port?

5) Edit the JS file to contain the path of the data folder of the processing sketch

6) Open command prompt. cd into the folder containing your JS file.

7) Type "node readFile_takeOffAndLand.js"

8) If you've got a good connection [0]>200, and your "Attention" [1] is greater than 50, the quadcopter
    will be signaled to launch, hover, rotate, and land.
    

**As of right now, you have to keep running the js file - I'm working on a fix for this. 
