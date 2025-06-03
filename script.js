const { createApp } = Vue;

createApp({
  data() {
    return {
      activeTab: 'phonology',
      phonology: {
        consonants: '',
        vowels: '',
        notes: ''
      },
      lexicon: [],
      entry: { word: '', translation: '', pos: '' },
      grammarNotes: '',
      generator: { pattern: '' },
      generatedWord: ''
    };
  },
  mounted() {
    const stored = localStorage.getItem('conlang-data');
    if (stored) {
      Object.assign(this.$data, JSON.parse(stored));
    }
  },
  watch: {
    $data: {
      deep: true,
      handler() {
        localStorage.setItem('conlang-data', JSON.stringify({
          phonology: this.phonology,
          lexicon: this.lexicon,
          grammarNotes: this.grammarNotes
        }));
      }
    }
  },
  methods: {
    addEntry() {
      this.lexicon.push({ ...this.entry });
      this.entry.word = '';
      this.entry.translation = '';
      this.entry.pos = '';
    },
    removeEntry(index) {
      this.lexicon.splice(index, 1);
    },
    generateWord() {
      const pattern = this.generator.pattern.toUpperCase();
      const cons = this.phonology.consonants.split(/\s+/);
      const vows = this.phonology.vowels.split(/\s+/);
      let result = '';
      for (const char of pattern) {
        if (char === 'C') {
          result += cons[Math.floor(Math.random() * cons.length)] || '';
        } else if (char === 'V') {
          result += vows[Math.floor(Math.random() * vows.length)] || '';
        } else {
          result += char;
        }
      }
      this.generatedWord = result;
    }
  }
}).mount('#app');
