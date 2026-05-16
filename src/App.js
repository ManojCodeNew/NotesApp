import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import CharCalculation from "./Components/CharCalculation";

const styles = {
  container: {
    margin: '10px',
    marginTop: '20px',

  },
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
  },
  status: {
    color: 'gray'
  },
  allNote: {
    fontWeight: 'bold'
  },
  count: {
    backgroundColor: 'lightgray',
    padding: '8px',
    borderRadius: '50px'
  },
  noteCardMain: {
    display: 'flex',
    flexDirection: 'column',
  },
  noteCard: {
    borderWidth: '1px',
    borderColor: 'gray',
    borderStyle: 'solid',
    padding: '10px',
    width: '80vh',
    margin: '10px'

  },
  searchedNoteCard: {
    borderWidth: '1px',
    borderColor: 'gray',
    borderStyle: 'solid',
    padding: '10px',
    width: '80vh',
    backgroundColor: 'lightgray'

  }

}


function App() {

  const [currentNote, setCurrentNote] = useState({
    title: '',
    description: '',
    timestamp: 0
  })
  const [allNotes, setAllNotes] = useState();
  const [status, setStatus] = useState(null);
  const [buttonName, setButtonName] = useState("Add");
  const [updatableNoteId, setUpdateableNoteId] = useState();
  const [searchedNote, setSearchedNote] = useState();
  const [searchText, setSearchText] = useState();
  const titleRef = useRef(null);

  const { savedNotes, setSaveNotes } = useLocalStorage('allNotes', [])

  // Input Focus
  useEffect(() => { titleRef.current.focus(); }, [])

  // Store updated Notes to allNotes state
  useEffect(() => {
    setAllNotes(savedNotes)
  }, [savedNotes])


  // Add Note Logics
  function handleChangeTitle(event) {
    setCurrentNote(prev => ({
      ...prev,
      title: event.target.value
    }))
  }

  function handleChangeDes(event) {
    setCurrentNote(prev => ({
      ...prev,
      description: event.target.value
    }))
  }

  function addNotes() {
    if (currentNote.title.trim().length === 0 || currentNote.description.trim().length === 0) {
      alert("Empty title/description acceptable to save")
      return
    }

    let finalCurrentNote = { ...currentNote, timestamp: new Date() }
    let updatedNotes = [...allNotes, finalCurrentNote]
    setSaveNotes(updatedNotes);
    setStatus("Notes Saved Success")
    setCurrentNote({
      title: '',
      description: '',
      timestamp: ''
    })
  }

  // Count total count logic
  const totalCharCount = useMemo(() => {
    console.log("total Char calculated");
    return allNotes.reduce((totalCount, note) => {
      return totalCount += note.title.length + note.description.length
    }, 0);
  }, [allNotes]);

  // Format fetched Date Object
  const getFormatedTime = (dateString) => {
    let dateObject = new Date(dateString);
    let hour = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    let amPm = hour < 12 ? 'am' : 'pm';

    return hour + " : " + minutes + " : " + seconds + " " + amPm;
  }

  // Notes Total count
  const notesTotalCount = useMemo(() => allNotes.length, [allNotes])

  // delete note logic 
  function deleteNote(index) {
    let updatedNotes = allNotes.filter((_, noteIndex) => noteIndex !== index)
    setSaveNotes(updatedNotes)
    setStatus("Note deleted success.")
  }

  // Update note logics
  function setUpdateData(index) {
    let updateableNote = allNotes.find((_, noteIndex) => noteIndex === index)
    setCurrentNote({
      title: updateableNote.title,
      description: updateableNote.description,
    })
    setButtonName("Edit")
    setUpdateableNoteId(index);
  }

  function updateNotes() {
    if (currentNote.title.trim().length === 0 || currentNote.description.trim().length === 0) {
      alert("Empty title/description acceptable to update")
      return
    }

    let updatedNotes = allNotes.map((note, index) =>
    (updatableNoteId === index
      ? { title: currentNote.title, description: currentNote.description, timestamp: new Date() }
      : note)
    )

    setSaveNotes(updatedNotes);
    setStatus("Notes Updated Success")
    setCurrentNote({
      title: '',
      description: '',
      timestamp: ''
    })
    setUpdateableNoteId(null)
    setNoteOp('Add')
  }

  // Search note logics
  function search() {
    let searchedNote = allNotes.find(item => item.title === searchText)
    if (searchedNote === undefined) {
      setStatus("Search failed");
      alert("Not Found")
      return
    }

    // setSearchedNote(note)
    setStatus("Searched Success");
  }

  const displayNotes = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return allNotes;

    return allNotes.filter(note => note.title.toLowerCase().includes(query))
  }, [searchText, allNotes])


  return (
    <div style={styles.container}>
      Notes App
      <hr />
      {/* Add notes */}
      <div style={styles.main}>
        <label >Title</label>
        <input style={styles.title} type='text' ref={titleRef} value={currentNote.title} onChange={(e) => handleChangeTitle(e)} />
        <label >Description</label>
        <textarea style={styles.textarea} value={currentNote.description} onChange={(e) => handleChangeDes(e)} />
        <button style={styles.addBtn} onClick={() => noteOp === 'Add' ? addNotes() : updateNotes()}>{noteOp}</button>
        <p style={styles.status} >{status}</p>
      </div>
      <hr />
      {/* Search */}
      <div style={styles.main}>
        <label style={styles?.allNote}>Search Notes : </label>
        <input type="text" placeholder="Type title name to search" style={styles.title} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button style={styles.addBtn} onClick={() => search()}>Search</button>
        {searchedNote && (
          <div style={styles.searchedNoteCard}>
            <p>Title : {searchedNote.title}</p>
            <p>Description : {searchedNote.description}</p>
            <p>createdAt : {getFormatedTime(searchedNote.timestamp)}</p>
          </div>
        )}
      </div>
      <hr />
      {/* list notes */}
      <div style={styles.main}>
        <p style={styles.allNote}>All Notes  <span style={styles.count}>{notesTotalCount}</span></p>
        <div style={styles.noteCardMain}>
          {value.length > 0 ? value.map((note, index) => (
            <div key={index} style={styles.noteCard} >
              <h5>Title : {note.title}</h5>
              <p>Description : {note.description}</p>
              <p>createdAt : {getFormatedTime(note.timestamp)}</p>
              <button onClick={() => setUpdateData(index)}>Edit</button>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          ))
            : (<p style={styles.status}>Empty Notes</p>)}
        </div>
      </div>
      <hr />

      <CharCalculation totalCharCount={totalCharCount} />
    </div>
  );
}

export default App;
