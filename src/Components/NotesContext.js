import React, { createContext, useEffect, useState } from 'react'
export const notesContext = createContext();

function getLocalStorageData(key, initialValue) {
    const savedData = JSON.parse(localStorage.getItem(key));
    if (savedData) {
        return savedData
    }

    return initialValue;
}

function NotesContextProvider({ children }) {
    const KEY = "allNotes";
    const [savedNotes, setSaveNotes] = useState(() => {
        return getLocalStorageData(KEY, []);
    });

    useEffect(() => {
        localStorage.setItem(KEY, savedNotes)
    }, [savedNotes, KEY])

    const passingVariables = {
        savedNotes,
        setSaveNotes
    }
    
    return (
        <notesContext value={passingVariables}>
            {children}
        </notesContext>
    )
}

export default NotesContext
