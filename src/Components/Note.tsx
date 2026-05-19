import { useCallback, useEffect, useState } from 'react'
import { addNote, deleteNote, updateNote } from '../redux/features/noteSlice'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { fetchImages } from '../redux/features/imageSlice'

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
    const [allImgs, setAllImages] = useState<any[]>([])

    const allNotes = useAppSelector(state => state.note)
    const fetchedImages = useAppSelector(state => state.image)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchImages('smal_phone'))
    }, [dispatch])

    useEffect(() => {
        if (fetchedImages?.images?.results) {
            setAllImages(fetchedImages.images.results)
        }
    }, [fetchedImages])

    const handleAddNote = useCallback(() => {
        const finalCurrentNote = { ...currentNote, id: allNotes?.length + 1 };
        dispatch(addNote(finalCurrentNote))
    }, [currentNote, allNotes, dispatch])


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

    if (fetchedImages.error) {
        return (
            <p>Image fetch error</p>
        )
    } else if (fetchedImages.loading) {
        return (
            <p style={{ textAlign: 'center', fontWeight: 'bolder' }}>Loading...</p>
        )
    }
    console.log(allImgs);

    return (
        <>
            <div style={{padding:'40px', backgroundColor:'crimson'}}>
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

            <div style={{ flexWrap: "wrap", gap: "10px" }}>
                {allImgs.map((img) => (

                    <>
                        <div  key={img.id} style={{ padding: '30px', backgroundColor: `${img.color}` }}>
                            <img
                                key={img.id}
                                src={img.urls.small}
                                alt="Unsplash"
                                style={{
                                    width: "18%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                        <p>Likes : {img.likes}</p>
                        <p>Slug : {img.alternative_slugs.en}</p>
                    </>



                ))}
            </div>
        </>
    )
}

export default Note
