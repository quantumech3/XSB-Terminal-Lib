// Initialize Terminal object inside the (XSB_PROPERTIES.TERMINAL_ELEMENT_ID) element with custom startup message (XSB_PROPERTIES.STARTUP_MESSAGE)
var term = $('#' + XSB_PROPERTIES.TERMINAL_ELEMENT_ID).terminal(
	[{
		QUERY: function(input)
		{
			term.echo(XSB.execute(input))
		},
	}, function(command)
{
	XSB.LowLevel.xsb_command_string(command)
}], {greetings: XSB_PROPERTIES.STARTUP_MESSAGE, prompt: "?- "});
var re = /^___terminal::/;

XSB.Events.onOutput = function(output, isError)
{
	term.echo(output)
}

XSB.init()