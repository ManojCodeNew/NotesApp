import { useEffect, useState } from 'react'

function getLocalStorageData(key, initialValue) {
    const savedData = JSON.parse(localStorage.getItem(key));
    if (savedData) {
        return savedData
    }

    return initialValue;
}

export function useLocalStorage(key, initialValue) {
    const [savedNotes, setSaveNotes] = useState(() => {
        return getLocalStorageData(key, initialValue);
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(savedNotes));
    }, [savedNotes, key])

    return { savedNotes, setSaveNotes }
}

