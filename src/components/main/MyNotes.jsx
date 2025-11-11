import { useLocation } from 'react-router-dom';
import { NotesGrid } from './NotesGrid';
import { useCallback, useEffect, useState } from 'react';
import { requestsRouter } from '../../data/requests/RequestsRouter.js';
import { Spinner } from '@styled-icons/evil';
import spinnerStyles from '../../css/various/Spinner.module.css';
import styles from '../../css/main/MyNotes.module.css';

export function MyNotes() {

    const location = useLocation();
    const from = location.state?.from ? location.state.from : "MyNotes";

    const [arrayNotes, setArrayNotes] = useState(null); //Todas las notas

    const [categories, setCategories] = useState(null);

    const fetchData = useCallback( async (request) => {
        return await requestsRouter[request]();
    }, []);

    useEffect( () => {

        setArrayNotes(null);

    }, [from]);

    useEffect( () => {

        if(!arrayNotes){
            fetchData('getNotes')
                .then( data => {
                    const state = from === "MyNotes" ? "ACTIVE" : "ARCHIVED";
                    const newNotes = data.content.filter( note => note.state === state);
                    setArrayNotes(newNotes);
                })
                .catch( error => console.log('Error al descargar la lista de notas...', error));
        }

    }, [arrayNotes, fetchData, from]);

    useEffect( () => {

        if(!categories){
            fetchData('getCategories')
                .then( data => {
                    setCategories(data.categories);
                })
                .catch( error => console.log('Error al descargar la lista de categorias...', error));
        }

    }, [categories, fetchData]);

    return !arrayNotes ?
    (
        <section className={styles.seccionSpinner}>
            <Spinner className={spinnerStyles.spinner} />
        </section>
    ) :
    (
        <section>
            <NotesGrid 
                arrayNotes={arrayNotes}
                setArrayNotes={setArrayNotes}
                from={from}
                categories={categories}
            />
        </section>
    );
}