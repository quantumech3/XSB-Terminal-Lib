// Handles XSB commands that are typed into the console
let handleXSBCommand = function(command)
{
	
	// If either the user-inputted command lacks a period at the end, only contains a period, or is an empty string, throw error
	// These user-errors must be handled because the XSB C Interface will crash on user input if they aren't handled
	if(command[command.length - 1] != '.' || command.length == 1 || command.length == 0)
	{
		XSB.execute("writeln('Invalid command').")
		return;
	}

	// Invoke XSB-JS-Interface to execute the command 'command' and gets results of the command (See XSB-JS-Interface source code comments for more info on XSB.execute())
	let results = XSB.execute(command)

	// Print XSB query results if such results exist (XSB.execute() returns [""] when no query results exist which is equivilent to 'false' in JS)
	if(results.var[0])
	{
		let resultString = ""

		for(let j = 0; j < results.var[0].length; j++)
		{
			for(let i = 0; i < results.var.length; i++)
			{
				resultString += "Var #" + i.toString() + ": " + results.var[i][j] + "\n"
			}

			resultString += '\n'
		}

		// Print resultString into Terminal
		XSB.Events.onOutput(resultString)
	}

	if(results.isTrue)
		XSB.Events.onOutput("yes.")
	else
		XSB.Events.onOutput("no.")
}

// Initialize Terminal object inside the (XSB_PROPERTIES.TERMINAL_ELEMENT_ID) element with custom startup message (XSB_PROPERTIES.STARTUP_MESSAGE)
var term = $('#' + XSB_PROPERTIES.TERMINAL_ELEMENT_ID).terminal(handleXSBCommand, {greetings: XSB_PROPERTIES.STARTUP_MESSAGE, prompt: "?- "});
var re = /^___terminal::/;

// Make XSB-JS-Interface output to terminal rather then browser console
XSB.Events.onOutput = function(output, isError)
{
	term.echo(output)
}

// Initialize XSB
XSB.init()