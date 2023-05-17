/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require("./markov");


function fileText(path){
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.log(`ERROR: can not read file ${path} >> ${err}`)
			process.exit(1)
		}
		let mm = new markov.MarkovMachine(data)
		console.log(mm.makeText())
	})
}

async function urlText(path){
	try{
		let resp = await axios.get(path);
		let mm = new markov.MarkovMachine(resp.data)
		console.log(mm.makeText())
	} catch(err){
		console.log(`ERROR: ${path} unreachable >> ${err}`)
		process.exit(1)
	}
}

let type = process.argv[2]
let path = process.argv[3]

if(type === "url"){
	urlText(path)
} 
else if (type === "file") {
	fileText(path)
}
else {
	console.log(`ERROR: ${type} is an invalid input type`)
}