import { SortableItem } from './../shared/interfaces/sortable-item.interface';
import { List } from './../list/list.model';
import { User } from './../shared/user.model';

export class Card implements SortableItem {
    _id: string;
    title: string;
    description: string;
    position: number;
    dueDate: Date;
    list: string;
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

    setList(id) {
        this.list = id;
    }
}
