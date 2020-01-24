### Summary
XSB-Terminal-Lib is a library that summons a Terminal running the XSB Interpreter at a user-specified location in a webpage. This library uses JQuery-Terminal which provides access to tools that make rendering CLI visuals easier. JQuery-Terminal was created by none other then the genius himself, jCubic 👏👏! You can find his Github page here: https://github.com/jcubic

------------------------
### How to setup XSB-Terminal-Lib

**1**. Copy the following files/folders into your project directory

* deps
* xsbInterface.data
* xsbInterface.js.mem
* xsbInterface.wasm
* xsbInterface.worker.js
* xsbInterface.js
* xsbTerminalLib.js

**2**. Add the following code to the top of your project's `<head>` section

```html
<script src="deps/jquery-3.2.1.min.js"></script>
<script src="deps/jquery.terminal.min.js"></script>
<link href="deps/jquery.terminal.min.css" rel="stylesheet"/>
```

**3**. Add the following code to the absolute bottom of your project's `<body>` section

```html
<script>
var XSB_PROPERTIES = 
{
	STARTUP_MESSAGE: "", // Insert what you want your startup message to be here
	TERMINAL_ELEMENT_ID: "" // Insert the ID of the HTML element you want the terminal to reside in here
}
</script>
```

**4**. Add the following code to the absolute bottom of your project's `<body>` section

```html
<script src="xsbInterface.js"></script>
<script src="xsbTerminalLib.js"></script>
```

------------------------
### Directory Structure

* **deps/:** Folder containing JS & CSS dependancies
* **xsbTerminalLib.js:** The XSB-Terminal-Lib JS library
* **xsbInterface.js**: WASM-powered XSB C Interface wrapper
* **xsbInterface.wasm:** xsbInterface.js dependency
* **xsbInterface.worker.js:** xsbInterface.js dependency
* **xsbInterface.js.mem:** xsbInterface.js dependency
* **xsbInterface.data:** xsbInterface.js dependency
* **debug_page.html:** Used to test modifications to this library
	

------------------------
### Please note that
* All files and folders specified in step 1 of 'How to setup XSB-Terminal-Lib' must be in the same directory for XSB-Terminal-Lib to function properly
* To execute `make build`, you must have Emscripten 1.38.30 installed.
