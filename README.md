# Chroma for GTA V #
---
## Info ##
This is a web application which uses [WebScriptHook](https://www.gta5-mods.com/tools/webscripthook-for-gtav) for GTA V and the [Razer Chroma](https://www.razerzone.com/chroma) SDK. 
It visualizes some data from GTA V onto a Razer Chroma compatible keyboard.

## What can it do ##

 - Shows the current health level (from 1 until 0 keys) in steps of 10
 - The Razer logo shows the fps 'status' (green for > 45, orange for 30 - 45 and red for < 30)
 - Shows the wanted level via de macro keys (animated from 1 till 5)
 - Shows the default movement keys in a hardcoded color (for azerty :neutral_face:)

## Installation ##

Stuff you will need:

 - Legal copy of Grand Theft Auto V (PC)
 - [WebScriptHook for GTA V](https://www.gta5-mods.com/tools/webscripthook-for-gtav)
 - Razer Synapse (an up-to-date version, you probably have installed this already if you own a Razer device)
 - The code from this repo

First make sure you have installed WebScriptHook correctly. If that's done just copy the content of this repostory into a new folder (you can choose the name) and move it to the /apps folder from WebScriptHook (like described [here](https://github.com/libertylocked/webscripthook#webscripthook-apps)). Then navigate to:

    http://localhost:25555/apps/<name of the folder you created>

## Example ##
![alt text](https://github.com/wimvdc/ChromaGTA/blob/master/example/example_keyboard.gif?raw=true "Example")
