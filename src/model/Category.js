export class Category {
    note_id;
    categories;

    constructor(note_id, categories) {
        this.note_id = note_id ? note_id : null;;
        this.categories = categories ? categories : null;
    }

}