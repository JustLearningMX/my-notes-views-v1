import { useLocation, useNavigate } from "react-router-dom";
import styles from '../../css/main/CreateEditNote.module.css';
import { Save } from '@styled-icons/fluentui-system-filled';
import { Cancel } from '@styled-icons/material';
import { Add } from '@styled-icons/fluentui-system-filled';
import { Tag } from '@styled-icons/bootstrap';
import { useEffect, useState } from "react";
import { NewNote } from "../../model/NewNoteDto";
import { Note } from "../../model/Note";
import { requestsRouter } from "../../data/requests/RequestsRouter";
import { Category } from "../../model/Category";

export function CreateEditNote() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [tag, setTag] = useState("");
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const { note } = location.state;

    let navigate = useNavigate();

    const fetchDatabase = async (request, body) => {

        return await requestsRouter[request](body);

    };

    const handleSaveNote = (event) => {
        
        event.preventDefault();

        let data = null;

        if (title.trim() === "" || description.trim() === "") {
            alert("Title and description are required");
        } else {
            if (note.id !== null) { //Si es una nota existente
                const updatedNote = new Note(
                    note.id,
                    title,
                    description,
                    new Date().toISOString(),
                    note.state,
                    note.deleted
                );
                
                data = fetchDatabase('updateNote', updatedNote);
            
            } else { //Es una nota nueva
                const newNote = new NewNote(
                    title,
                    description,
                    new Date().toISOString(),
                    "ACTIVE",
                    false
                );

                data = fetchDatabase('createNote', newNote);
            }

            data.then( 
                dataNote => {
                    const newCategories = new Category(
                        dataNote.id,
                        categories
                    );

                    fetchDatabase('createCategory', newCategories)
                        .then( () => {
                            setCategories([]);
                            navigate(`/`, { replace: true });
                        })
                        .catch( error => console.log(error));
                }
            )
            .catch( error => console.log(error));
        }
    };

    const handleAddTag = (event) => {
        event.preventDefault();

        if (tag.trim() === "") {
            alert("Tag is required");
        } else {
            setCategories([...categories, {name: tag}]);
            setTag("");
        }
    };

    useEffect( () => {
        
    }, [categories]);

    useEffect( () => {
        if(note.id !== null) {
            setTitle(note.title);
            setDescription(note.description);
            setCategories(note.categories);
        }
    }, [note]);

    return (
        <section className={styles.container__main}>
            <form className={styles.container__form}>

                {note.id !== null ?  //Header title
                    <div className={styles.container__headerTitle}>
                        <h2 className={styles.title}>Edit Note</h2>
                    </div> 
                    : 
                    <div className={styles.container__headerTitle}>
                        <h2 className={styles.title}>Create Note</h2>
                    </div> 
                }

                {note.id !== null ? //Id if it's an existing note
                    <div className={styles.container__elements}>
                        <label htmlFor="fid" className={styles.elements__label}>Id:</label>
                        <input 
                            type="text" 
                            id="fid" 
                            name="fid" 
                            value={note.id} 
                            className={styles.elements__input}
                            disabled                        
                        />
                    </div> : null 
                }

                <div className={styles.container__elements}> {/* Title */}
                    <label htmlFor="ftitle" className={styles.elements__label}>Title:</label>
                    <input 
                        type="text" 
                        id="ftitle" 
                        name="ftitle" 
                        value={title} 
                        className={styles.elements__input}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>

                <div className={styles.container__elements}> {/* Description */}
                    <label htmlFor="fdescription" className={styles.elements__label}>Description:</label>
                    <textarea  
                        type="text" 
                        id="fdescription" 
                        name="fdescription" 
                        value={description} 
                        onChange={event => setDescription(event.target.value)}
                        rows="6" cols="20"
                        className={styles.elements__input}
                    />
                </div>

                <div className={styles.container__elements}> {/* Categories */}
                    <div className={styles.container__elements}>
                        <p className={styles.elements__label}>Categories:</p>
                        <div className={`${styles.elements__input} ${styles.tags__container}`}>
                            {categories.map( (category, index) => (
                                <div key={index} className={styles.tags__tagContainer}>
                                    <div className={styles.tag_tag}>
                                        <Tag className={`${styles.icon__tag}`} />
                                    </div>
                                    <p className={styles.tag__text}>{category.name}</p>
                                    <div className={styles.tag__delete}>
                                        <Cancel 
                                            className={`${styles.icon__removeTag}`}
                                            onClick={() => setCategories(categories.filter( (cat, i) => i !== index))}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.categories__addSection}> {/* Categories add section */}
                        <input 
                            type="text" 
                            id="ftag" 
                            name="ftag" 
                            value={tag} 
                            className={`${styles.elements__input} ${styles.addSection__input}`}
                            onChange={event => setTag(event.target.value)}
                        />
                        <div 
                            className={`${styles.button} ${styles.button__addTag}`}
                            onClick={handleAddTag}
                        >
                            <Add className={`${styles.button__icon} ${styles.icon__addTag}`} />
                            Add
                        </div>
                    </div>
                </div>

                <div className={styles.container__buttons}> {/* Buttons */}
                    <div 
                        className={`${styles.button} ${styles.button__save}`}
                        onClick={handleSaveNote}
                    >
                        <Save className={`${styles.button__icon} ${styles.icon__save}`} />
                        Save
                    </div>

                    <div 
                        className={`${styles.button} ${styles.button__cancel}`}
                        onClick={() => window.history.back()}
                    >
                        <Cancel className={`${styles.button__icon} ${styles.icon__cancel}`} />
                        Cancel
                    </div>
                </div>
            </form>
        </section>
    );
}