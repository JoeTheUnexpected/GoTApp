import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import './itemList.css';

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then(charList => {
                this.setState({
                    charList
                })
            })
    }

    // в onCharSelected props прходят из app, там их создаем
    // onCharSelected в виде стрелочной, иначе ошибка
    renderItems(arr) {
        return arr.map(item => {
            // let fake = item.url.split('characters/');
            // console.log(fake[1]);
            let itemId = item.url.match(/\d+/);
            return (
                <li 
                    key={itemId}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(itemId)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}