import data from "./metadata.json" assert { type: 'json'}

export default class MetaData {
    constructor(chapterIndex){

        this.chapterIndex = chapterIndex

    }
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setChapter(chapterIndex) {
        
        if (chapterIndex == null) {
            chapterIndex = this.randomInt(0, data.length)
        }

        this.chapterIndex = chapterIndex

        return chapterIndex
    }

    // ********* this  will return a random verse from a specific surah number using the parametre
    getRandomVerseByChapter() {
        this.chapter = data[this.chapterIndex - 1]
        this.chapterName = `${this.chapter.name} (${this.chapter.translated_name})`
        this.verseIndex = `${this.chapterIndex}:${this.randomInt(1, this.chapter.verse_count)}`
    }

    getMetadata(){
        this.setChapter()
        this.getRandomVerseByChapter()
        delete this.chapter
        delete this.chapterIndex
        // console.log(this.verseIndex);
    }

}
