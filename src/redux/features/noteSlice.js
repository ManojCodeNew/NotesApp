import { createSlice } from '@reduxjs/toolkit'
const initialState = []
const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        addNote: (state, action) => {
            const currentNote = action.payload
            if (currentNote.title.trim().length === 0) {
                alert("Data is empty")
                return
            }
            state.push(currentNote);
        },
        updateNote: (state, action) => {
            const { editNoteId, updatedTitle, updatedDescription } = action.payload;
            const existingNote = state.find(note => note.id === editNoteId)
            if (existingNote) {
                existingNote.title = updatedTitle;
                existingNote.description = updatedDescription;
            } else {
                alert("Note Not found")
            }
        },
        deleteNote: (state, action) => {
            const deleteNoteId = action.payload;
            const existNoteId = state.findIndex(note => note.id === deleteNoteId)
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