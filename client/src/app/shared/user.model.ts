export class User {
    id: String;
    username: String;
    image: String;

    constructor({ id, username, image }) {
        this.id = id;
        this.username = username;
        this.image = image;
    }
}
