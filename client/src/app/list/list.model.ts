import { Card } from './../card/card.model';
import { SortableItem } from './../shared/sortable-item.interface';

export class List implements SortableItem {
    _id: string;
    title: string;
    position: number;
    cards: Array<Card> = [];

    constructor ({
        _id, title, position, cards
    }) {
        this._id = _id;
        this.title = title;
        this.position = position;
        this.cards = cards.map((card) => new Card(card));
    }

    update(list) {
        this.title = list.title;
        this.position = list.position;
    }
}
