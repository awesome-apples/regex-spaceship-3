# Regex Spaceship

Hi Everyone!

the boilerplate is setup
we've got socket.io connection
socket runs from its own folder and is imported into server where its hooked up
on the clientside, socket is running from our mainscene
we can add socket connection to any scene
there is a redux store folder setup on the src client side

## Adria - server & socket info -

- the server is in server/index.js
- if you navigate to the function where the startListening function is declared (line 98), inside of it we are requiring in a socket/index.js
- whereas - in the tutorial, we directly put our socket connections in this server area, here, we are giving them their own separate file and exporting & requiring them back inside this file and function
- you will see that at the top of socket/index.js - we have the player / game data hardcoded here (this will eventually come from the store but for now this is where they are stored)
- everything with the sockets is coded and set up like before, the only difference being this file structure
- the game instance is created in src/index.js, but you will see that thats only where we are calling the game instance, and we dont have the same code all put into one game file like before -
- navigate to src/scenes/mainscene, and you will see our clientside socket connections like we did in the tutorial. mainscene pretty much has all the same code that the main game file had in the multiplayer tutorial, we have just given it its own scene to make it more modular. these client side sockets work just like they did in the tutorial. be sure to use "self" variable instead of "this" (just like they did in the tutorial) inside of socket callback functions to maintain the context of this within our class

## Cat - scene and popup info -

- as you may have read above, the mainscene is in src/scenes/mainscene. you can create new scenes by adding new files with the title of the popup scenes in this folder.
- once you make these scenes, in order to link them to the game and make them capable of being visible on the screne, you will need to navigate to src/index.js where we created our game class. underneath line 26 (it says: this.scene.add('Mainscene', Mainscene)), you will need to write a matching line here to add the popup scenes you created (i.e. this.scene.add('PopupOne', PopupOne)), you will also need to require it in at the top of the file in the same way that Mainscene is required in. this process makes them loadable and visible, but wont automatically start them ---
- you wont need to add a line to start a scene in this file! as you will be starting these scenes from mainscene, upon collision, or however you decide to program it. mainscene starts in this file because its the scene we want to load upon starting the game.
