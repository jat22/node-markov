const { MarkovMachine } = require("./markov");

describe('markov machine', function() {
	test('chains', function(){
		const mm = new MarkovMachine("the cat in the hat")
		expect(mm.chains).toEqual(new Map([
			["the", ["cat", "hat"]], 
			["cat", ["in"]], 
			["in", ["the"]], 
			["hat", [null]]
		]))
	})

	test('random word', function(){
		const ary = ["the", "cat", "in", "the", "hat"]
		expect(ary).toContain(MarkovMachine.randomWord(ary))
	})

	test('make text', function(){
		let mm = new MarkovMachine("the cat in the hat")
		expect(mm.makeText().endsWith('hat')).toBe(true)
	})
})