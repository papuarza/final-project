import { SortableItem } from './../shared/sortable-item.interface';
import { List } from './../list/list.model';
import { User } from './../shared/user.model';

export class Card implements SortableItem {
    id: String;
    title: String;
    position: Number;
    list: List;
    members: Array<User>;

    constructor ({
        id, title, position, list, members
    }) {
        this.id = id;
        this.title = title;
        this.position = position;
        this.list = list;
        this.members = members;
    }
}
