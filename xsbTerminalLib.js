var xsbTerm = 
{
	executeXSBCommand: function(command=""){}, // Invoked by JQuery terminal after the user inputs an XSB command
	handleXSBOutput: function(results){}, // Invoked by XSB web worker when query results are returned from a command
	startXSB: function(){},
	stopXSB: function(){}
}

// Invoked by JQuery terminal after the user inputs an XSB command
xsbTerm.executeXSBCommand = function(command="")
{
	// If either the user-inputted command lacks a period at the end, only contains a period, or is an empty string, throw error
	// These user-errors must be handled because the XSB C Interface will crash on user input if they aren't handled
	if(command[command.length - 1] != '.' || command.length == 1 || command.length == 0)
	{
		xsbWorker.postMessage("writeln('Invalid command')."); // Invoke XSB command from web worker
		return;
	}

	// Else if the command is valid, execute the XSB command via a web worker
	xsbWorker.postMessage(command);
}

// Invoked by XSB web worker when query results are returned from a command
xsbTerm.handleXSBOutput = function(results)
{
	// Print XSB query results if such results exist (XSB.execute() returns [""] when no query results exist which is equivilent to 'false' in JS)
	if(results.var[0])
	{
		for(let j = 0; j < results.var[0].length; j++)
		{
			for(let i = 0; i < results.var.length; i++)
			{
				term.echo("Var #" + i.toString() + ": " + results.var[i][j])
			}
			term.echo();
		}
	}

	if(results.isTrue)
		term.echo("yes.")
	else
		term.echo("no.")
}

// Initialize Terminal object inside the (XSB_PROPERTIES.TERMINAL_ELEMENT_ID) element with custom startup message (XSB_PROPERTIES.STARTUP_MESSAGE)
var term = $('#' + XSB_PROPERTIES.TERMINAL_ELEMENT_ID).terminal(xsbTerm.executeXSBCommand, {greetings: XSB_PROPERTIES.STARTUP_MESSAGE, prompt: "?- "});
var re = /^___terminal::/;

// Initialize XSB interface web worker
var xsbWorker = new Worker("xsbTerminalWorker.js");

// When the XSB web worker returns query results resulting from an XSB command, pass results and standard output to executeXSBCommand() and handleXSBOutput()
xsbWorker.onmessage = function(message)
{
	// Print standard output from XSB interpreter
	if(message.data.stdout)
		term.echo(message.data.stdout);

	// Print results from XSB query
	if(message.data.results)
		xsbTerm.handleXSBOutput(message.data.results);
}