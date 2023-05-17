/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map()
    
    for(let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }

  static randomWord(ary){
    return ary[Math.floor(Math.random() * ary.length)]
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys())
    let key = MarkovMachine.randomWord(keys)
    let res = []

    while(res.length < numWords && key !== null){
      res.push(key)
      key = MarkovMachine.randomWord(this.chains.get(key))
    }
    let text = res.join(" ")

    return text

  }
}

module.exports = {MarkovMachine,};