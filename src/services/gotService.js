export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
        // this.overlordName = '';
    }
    
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses/');
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        // const overlord = this._transformHouse(house).overlord;
        // if (overlord !== 'no data') {
        //     this.overlordName = await this.getResource(`/houses/${overlord}`);
        // }
        // console.log(this.overlordName.name);
        return this._transformHouse(house)
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    _transformCharacter(char) {
        return {
            id: char.url.match(/\d+/),
            name: char.name,
            gender: char.gender ? char.gender : 'no data',
            born: char.born ? char.born : 'no data',
            died: char.died ? char.died : 'no data',
            culture: char.culture ? char.culture : 'no data'
        }
    }

    _transformHouse = (house) => {
        return {
            id: house.url.match(/\d+/),
            name: house.name,
            region: house.region ? house.region : 'no data',
            words: house.words ? house.words : 'no data',
            titles: house.titles ? house.titles : 'no data',
            overlord: house.overlord ? house.overlord.match(/\d+/) : 'no data',
            overlordName: this.overlordName,
            ancestralWeapons: house.ancestralWeapons ? house.ancestralWeapons : 'no data'
        }
    }

    _transformBook(book) {
        return {
            id: book.url.match(/\d+/),
            name: book.name,
            numberOfPages: book.numberOfPages ? book.numberOfPages : 'no data',
            publisher: book.publisher ? book.publisher : 'no data',
            released: book.released ? book.released.split('T')[0] : 'no data'
        }
    }
}