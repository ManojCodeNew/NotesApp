import { createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface Note {
    id: number,
    title: string,
    description: string
}

const initialState: any = []
const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            const currentNote = action.payload
            if (currentNote.title.trim().length === 0) {
                alert("Data is empty")
                return
            }
            state.push(currentNote);
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const { id, title, description } = action.payload;
            const existingNote = state.find((note: Note) => note.id === id)
            if (existingNote) {
                existingNote.title = title;
                existingNote.description = description;
            } else {
                alert("Note Not found")
            }
        },
        deleteNote: (state, action: PayloadAction<number>) => {
            const deleteNoteId: number = action.payload;
            const existNoteId = state.findIndex((note: Note) => Number(note.id) === deleteNoteId)
            if (existNoteId) {
                state.splice(existNoteId, 1)
            } else {
                alert("Note Not found")
            }
        }
    }
})

export const { addNote, updateNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;