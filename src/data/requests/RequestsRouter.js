import { archiveNote } from "./archiveNote";
import { deleteNote } from "./deleteNote";
import { getNotes } from "./getNotes";
import { unarchiveNote } from "./unarchiveNote";
import { updateNote } from "./updateNote";
import { createNote } from "./createNote";
import { createCategory } from "./createCategory";
import { getCategories } from "./getCategories";


export const requestsRouter = {
    getNotes: () => getNotes(),
    archiveNote: (id) => archiveNote(id),
    unarchiveNote: (id) => unarchiveNote(id),
    deleteNote: (id) => deleteNote(id),
    updateNote: (body) => updateNote(body),
    createNote: (body) => createNote(body),
    createCategory: (body) => createCategory(body),
    getCategories: () => getCategories(),
}