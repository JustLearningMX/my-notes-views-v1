export class Note {
    id;
    title;
    description;
    lastEdited;
    state;
    deleted;

    constructor(id, title, description, lastEdited, state, deleted) {
        this.id = id ? id : null;;
        this.title = title ? title : null;
        this.description = description ? description : null;
        this.lastEdited = lastEdited ? lastEdited : null;
        this.state = state ? state : null;
        this.deleted = deleted === true ? true : false;
    }

}