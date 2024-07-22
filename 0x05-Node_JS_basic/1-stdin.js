/**
 * this nodejs script to be executed through the command line
 */
const readline = require("readline");
const rl_interface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log("Welcome to Holberton School, what is your name?")

rl_interface.on('line',(input)=> {
	console.log(`Your name is: ${input}`)
	rl_interface.close();
});

rl_interface.on('close',()=>{
	console.log("This important software is now closing")
	process.exit(0);
})
