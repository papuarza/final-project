import { SortableItem } from './../shared/sortable-item.interface';
import { List } from './../list/list.model';
import { User } from './../shared/user.model';

export class Card implements SortableItem {
    _id: String;
    title: String;
    position: Number;
    list: List;

    constructor ({
        _id, title, position, list
    }) {
        this._id = _id;
        this.title = title;
        this.position = position;
        this.list = list;
    }
}
