import DomEngine from './kal/DomEngine.js';
// Two nested classes used in DomEngine.js
 import MetaData from './kal/MetaData.js';
 import VerseData from './kal/VerseData.js';


const domEngine = new DomEngine();

async function challenge() {
    await domEngine.getNewVerse();
}


await challenge()