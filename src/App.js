import { useState } from "react";

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: "10px",
    margin: '10px'
  },
  title: {
    width: '50vh',
    padding: '10px',
  },
  textarea: {
    width: '60vh',
    height: '80px',
    padding: '10px'

  },
  addBtn: {
    width: 'fit-content',
    padding: '10px',
    cursor: 'pointer'
  }
}


function App() {
  const [notes, setNotes] = useState({
    title: '',
    description: '',
    timestamp: 0
  })
  const [allNotes, setAllNotes] = useState([]);

  function handleChangeTitle(event) {
    setNotes(prev => ({
      ...prev,
      title: event.target.value
    }))
  }

  function handleChangeDes(event) {
    setNotes(prev => ({
      ...prev,
      description: event.target.value
    }))
  }

  function addNotes() {
    let newNote = { ...notes, timestamp: new Date() }
    setNotes(newNote)
    let updatedNotes = [...allNotes, newNote]
    setAllNotes(updatedNotes)
    console.log(updatedNotes);
  }

  return (
    <div >
      Notes App

      <div style={styles.main}>
        <label >Title</label>
        <input style={styles.title} type='text' value={notes.title} onChange={(e) => handleChangeTitle(e)} />
        <label >Description</label>
        <textarea style={styles.textarea} value={notes.description} onChange={(e) => handleChangeDes(e)} />
        <button style={styles.addBtn} onClick={() => addNotes()}>Add</button>
      </div>

    </div>
  );

}

export default App;
