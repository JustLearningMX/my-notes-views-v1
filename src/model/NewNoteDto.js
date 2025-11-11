export class NewNote {
    title;
    description;
    lastEdited;
    state;
    deleted;

    constructor(title, description, lastEdited, state, deleted) {
        this.title = title ? title : null;
        this.description = description ? description : null;
        this.lastEdited = lastEdited ? lastEdited : null;
        this.state = state ? state : null;
        this.deleted = deleted === true ? true : false;
    }

}