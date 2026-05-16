import React from 'react'
const styles = {
    main: {
        margin: '10px',
        width: 'fit-content',
        height: 'fit-content',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'lightgray'
    }
}
const CharCalculation = React.memo(({ totalCharCount }) => {
    return (
        <div style={styles.main}>
            <p> All Notes Total character count : <b>{totalCharCount}</b></p>
        </div>
    )
})

export default CharCalculation
