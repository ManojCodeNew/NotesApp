import React, { createContext, useEffect, useState } from 'react'
export const NotesContext = createContext();


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
        localStorage.setItem(KEY, JSON.stringify(savedNotes))
    }, [savedNotes, KEY])
    console.log("Called :", savedNotes);

    const passingVariables = {
        savedNotes,
        setSaveNotes
    }

    return (
        <NotesContext value={passingVariables}>
            {children}
        </NotesContext>
    )
}

export default NotesContextProvider;
