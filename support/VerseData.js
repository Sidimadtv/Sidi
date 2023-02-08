




export default class VerseData {
    constructor(verseIndex) {
        this.verseIndex = verseIndex
}

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // ********* this  will return a random verse from a specific surah number using the parametre


    // *********
    // The two params will be this by default but I plan to give users a choice.
    async getQuranAndAudio(translation = 131, reciter = 9) {
        const url =
            `https://api.quran.com/api/v4/verses/by_key/${this.verseIndex}?language=en
        &words=true&translations=${translation}&audio=${reciter}&fields=text_imlaei`;
        const response = await fetch(url)
        const json = await response.json();

        this.verse = json.verse.text_imlaei;
        this.verseTranslated = json.verse.translations[0].text;
        this.verseForChallenge = this.verseTranslated.split(" ");
        this.randomWordIndex = this.randomInt(0, this.verseForChallenge.length - 1);
        const regex = /[!"#$%""".&'(˹˺)*+,,-./:;<=>?@[\]^_`{|}~]/g;
        this.missingWord = this.verseForChallenge[this.randomWordIndex].replace(regex, "").toLowerCase();
        if (this.missingWord == "v") {
            this.missingWord = this.verseForChallenge[this.randomWordIndex].replace(regex, "").toLowerCase();
        }
        this.verseForChallenge[this.randomWordIndex] = "____";
        this.verseForChallenge = this.verseForChallenge.join(" ");
        this.audio = `https://verses.quran.com/${json.verse.audio.url}`
  

    }

    // *********
    // This will be the default param but I plan to give users a choice.
     async getTafsir(tafsir = 14) {
        const url = `https://api.quran.com/api/v4/tafsirs/${tafsir}/by_ayah/${this.verseIndex}`;
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json);
        this.tafsirName = json.tafsir.resource_name;
        this.tafsirName = `${json.tafsir.resource_name} (${json.tafsir.translated_name.name})`
        this.tafsir = json.tafsir.text;

    };

async getDataFromAPI(){
    await this.getQuranAndAudio();
    delete this.audioFile
    delete this.randomWordIndex
    await this.getTafsir()
    return this
}


}