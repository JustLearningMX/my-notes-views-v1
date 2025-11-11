import styles from '../../css/main/MyNotes.module.css';
import { NoteCard } from './NoteCard';
import { NavLink } from 'react-router-dom';
import { Note } from '../../model/Note.js';
import { useEffect, useState } from 'react';

export function NotesGrid( {arrayNotes, setArrayNotes, from, categories}) {

    const handlerFilterByCategory = (event) => {
        event.preventDefault();
        const category = event.target.value;

        if (category === "all") {
            setArrayNotes(null);
        } else {
            const state = from === "MyNotes" ? "ACTIVE" : "ARCHIVED";
            const newNotes = arrayNotes.filter( note => note.state === state && note.categories.filter( cat => cat.name.toLowerCase() === category.toLowerCase()).length > 0);

            if (newNotes.length === 0) {
                alert(`You don't have any ${from === "MyNotes" ? "active" : "archived"} notes with the category ${category} yet...`);
                setArrayNotes(null);
            } else {
                setArrayNotes(newNotes);
            }
        }
    }

    useEffect( () => {

        if (categories === null) {
            setArrayNotes(null);
        }
        
    }, [categories, setArrayNotes]);

    return arrayNotes.length > 0 ?
    (
        <section>
            { from === "MyNotes" ?
                <div className={styles.container__headerTitle}>
                    <h2 className={styles.title}>My Notes</h2>
                    <div className={styles.container__link}>
                        <NavLink 
                            to="/create_edite_note"
                            state={{note: new Note()}}
                            className={styles.link}
                        >
                            Create note
                        </NavLink>
                    </div>
                </div>
            : 
                <div className={styles.container__headerTitle}>
                    <h2 className={styles.title}>My Archived Notes</h2>
                </div> 
            }

            <div className={styles.container__filter}>
                <p className={styles.filter_title}>Category filter:</p>
                <select className={styles.container__select} onChange={handlerFilterByCategory}>

                    <option key={0} value="all" defaultValue>All</option>
                    {            
                        categories ? categories.map( category => {
                            return <option 
                                        key={category.id} 
                                        value={category.name}                                        
                                    >
                                        {category.name}
                                    </option>
                        }) : 
                        <option value="wait">Wating</option>
                    }
                    
                </select>
            </div>

            <ul className={styles.notesContainer}>
                {arrayNotes.map( note => {
                    return <NoteCard
                                note={note} 
                                key={note.id}
                                setActiveNotes={setArrayNotes}
                                from={from}
                            />
                })}
            </ul>
        </section>
    ) :
    (
        <section>
            <div className={styles.container__headerTitle}>
                <h2 className={styles.title}>My Notes</h2>
                <div className={styles.container__link}>
                    <NavLink 
                        to="/create_edite_note"
                        state={{note: new Note()}}
                        className={styles.link}
                    >
                        Create note
                    </NavLink>
                </div>
            </div>
            <p className={styles.noNotes}>You don't have any {from === "MyNotes" ? "active" : "archived"} notes yet...</p>
        </section>
    );
}