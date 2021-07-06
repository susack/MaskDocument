Masking Utility

1. Download from this GitHub dir in a directory of choice

2. Dependencies
	* npm/node (https://nodejs.org/en/download/)
	* express (npm install express)
	* http-server ( npm install http-server)

3. Invoking
	* In downloaded base directory run:
		$ http-server
		$ node server/server.js - There is another file in this server directory called maskInput.txt that can be changed between each mask click action in the browser interface session
		$ In a browser launch http://localhost:8080

Assumptions:
* The document that is to be masked is a hardcoded in the code and used for demonstration purposes. Ideally this would be served by the same nodeJS server under different route.

* The rendered masked/unmasked document represented in interface is in plain text format. This could be represented as HTML.

* The maskInput.txt file contains a single string representing all mask tokens to be applied to the document as masked. Only items between single or double quotes will be considered in the masking per requirement. This file is read on each click of the mask button.