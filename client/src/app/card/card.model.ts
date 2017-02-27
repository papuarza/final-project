import { SortableItem } from './../shared/sortable-item.interface';
import { List } from './../list/list.model';
import { User } from './../shared/user.model';

export class Card implements SortableItem {
    _id: String;
    title: String;
    description: String;
    position: Number;
    dueDate: Date;
    list: List;
    created_at: Date;
    updated_at: Date;

    constructor ({
        _id, title, position, list, dueDate, description, created_at, updated_at
    }) {
        this._id = _id;
        this.title = title;
        this.position = position;
        this.list = list;
        this.dueDate = dueDate;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
