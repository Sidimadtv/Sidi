import DomEngine from 'support/DomEngine.js';
// Two nested classes used in DomEngine.js
// import MetaData from 'support/MetaData.js';
// import VerseData from 'support/VerseData.js';


const domEngine = new DomEngine();

async function challenge() {
    await domEngine.getNewVerse();
}


await challenge()