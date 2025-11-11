import { Routes, Route } from 'react-router-dom';
import styles from '../../css/main/Main.module.css';
import { MyNotes } from './MyNotes';
import { NotFound } from '../NotFound';
import { CreateEditNote } from './CreateEditNote';

export function Main() {
    return (
        <main className={styles.main}>
            <Routes>
                <Route path="/" element={<MyNotes />} />
                <Route path="/archived" element={<MyNotes />} />
                <Route path="/create_edite_note" element={<CreateEditNote />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
}