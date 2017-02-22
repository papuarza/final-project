import { SortableItem } from './../shared/sortable-item.interface';

export class List implements SortableItem {
    id: String;
    title: String;
    position: Number;

    constructor ({
        id, title, position
    }) {
        this.id = id;
        this.title = title;
        this.position = position;
    }
}
