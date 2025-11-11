import { useCallback } from 'react';
import { fechaCorta } from '../../utils/dateFormatter.js';
import { ArchiveFill, PencilSquare } from '@styled-icons/bootstrap';
import { Delete, Unarchive } from '@styled-icons/material';
import styles from '../../css/main/NoteCard.module.css';
import { requestsRouter } from '../../data/requests/RequestsRouter.js';
import { NavLink } from 'react-router-dom';

const lastUpdated = (lastEdited) => {
    const fecha = new Date(lastEdited);
    return fechaCorta(fecha);
};

export function NoteCard( {note, setActiveNotes, from}) {

    const fetchNote = useCallback( async (id, request) => {

        let data = null;

        if (id !== null) {
            data = await requestsRouter[request](id);
        } 
        else {
            data = await requestsRouter[request]();
        }

        if(data.error || data.content === null){
            console.log(`Note request error: ${request}...`);
          } else {
            setActiveNotes(null);
          }
    }, [setActiveNotes]);
    

    const handleArchived = (event, id) => {
        event.preventDefault();
        fetchNote(id, 'archiveNote');
    };

    const handleUnarchived = (event, id) => {
        event.preventDefault();
        fetchNote(id, 'unarchiveNote');
    };

    const handleDeleted = (event, id) => {
        event.preventDefault();
        fetchNote(id, 'deleteNote');
    };

    return (
        <li className={styles.container__main}>
            <div className={styles.container__data}>
                <h3 className={styles.data__title}>{note.title}</h3>
                <div className={styles.container__description}>
                    <p>{note.description}</p>
                </div>
                <p className={styles.note_date}>Last edited: {lastUpdated(note.lastEdited)}</p>
            </div>
            <div className={styles.container__icon}>
                { from === "MyNotes" ?
                    <div className={`${styles.icon} ${styles.icon_archived}`}>
                        <ArchiveFill 
                            onClick={event => handleArchived(event, note.id)}
                        />
                    </div> :
                    <div className={`${styles.icon} ${styles.icon_archived}`}>
                        <Unarchive 
                            onClick={event => handleUnarchived(event, note.id)}
                        />
                    </div>
                }
                <div className={`${styles.icon} ${styles.icon_edit}`}>
                    <NavLink
                        to="/create_edite_note"
                        state={
                            {
                                note: note
                            }
                        }
                        className={styles.link}
                    >
                        <PencilSquare />
                    </NavLink>
                </div>
                <div className={`${styles.icon} ${styles.icon_delete}`}>
                    <Delete 
                        onClick={event => handleDeleted(event, note.id)}
                    />
                </div>
            </div>
        </li>
    );
}