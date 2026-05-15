import React, { useEffect, useState } from 'react'

function getLocalStorageData(key, initialValue) {
    const savedData = JSON.parse(localStorage.getItem(key));
    if (savedData) {
        return savedData
    }
    console.log("Initial value on get :", initialValue);

    return initialValue;
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getLocalStorageData(key, initialValue);
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue]
}

