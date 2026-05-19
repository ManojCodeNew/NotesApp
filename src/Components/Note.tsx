import { useCallback, useState } from 'react'
import type { RootState } from '../redux/Store'
import { useSelector, useDispatch } from 'react-redux'
import { addNote, deleteNote, updateNote } from '../redux/features/noteSlice'

interface Note {
    id: number,
    title: string,
    description: string
}
function Note() {
    const [currentNote, setCurrentNote] = useState({
        id: '',
        title: '',
        description: ''
    })
    const [buttonText, setButtonText] = useState("Add")
    const [editableNoteId, setEditableNoteId] = useState<number>()

    const allNotes = useSelector((state: RootState) => state);

    const handleAddNote = useCallback(() => {
        const finalCurrentNote = { ...currentNote, id: allNotes?.length + 1 };
        dispatch(addNote(finalCurrentNote))
    }, [currentNote, allNotes])

    const setEditNote = useCallback((noteId: number | string) => {
        setCurrentNote(allNotes.find((note: Note) => note.id === noteId))
        setButtonText("Edit")
        setEditableNoteId(Number(noteId))
    }, [allNotes])

    const handleUpdateNote = useCallback(() => {
        const finalEditedNote: Note = {
            id: editableNoteId as number,
            title: currentNote.title,
            description: currentNote.description
        }
        dispatch(updateNote(finalEditedNote))
        setButtonText("Add")
    }, [editableNoteId, currentNote])

    const dispatch = useDispatch();
    return (
        <>
            <div>
                <input type="text" value={currentNote.title} onChange={(e) => setCurrentNote(prev => ({ ...prev, title: e.target.value }))} />
                <input type="text" value={currentNote.description} onChange={(e) => setCurrentNote(prev => ({ ...prev, description: e.target.value }))} />
                <button onClick={() => buttonText === 'Add' ? handleAddNote() : handleUpdateNote()}>{buttonText} Note</button>
            </div>

            <div>
                {allNotes && allNotes?.map((note: any) => (
                    <div key={note.id} style={{ margin: '5px', border: "1px solid black", width: 'fit-content', padding: '10px' }}>
                        <p >Id : {note.id}</p>
                        <p >Title : {note.title}</p>
                        <p >Description : {note.description}</p>
                        <button onClick={() => setEditNote(note.id)}>Edit</button>
                        <button onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Note
