export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    
    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllHouses() {
        const res = await this.getResource('/houses/');
        return res.map(this._transformHouse);
    }

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house)
    }

    async getAllBooks() {
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);
    }

    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    _transformCharacter(char) {
        // const setDied = () => {
        //     if (char.died) {
        //         return char.died;
        //     } else if (!char.born) {
        //         return 'In fetus';
        //     } else return 'Still alive'
        // }
        return {
            url: char.url,
            name: char.name,
            gender: char.gender ? char.gender : 'Mutant',
            born: char.born ? char.born : 'unknown',
            died: char.died ? char.died : 'unknown',
            culture: char.culture ? char.culture : 'Bydlo'
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}