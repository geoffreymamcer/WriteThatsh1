import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Trash from "./pages/Trash";
import Sidebar from "./components/Sidebar";
import ColorPicker from "./components/ColorPicker";
import "./styles/App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load notes from localStorage on initial render
  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const savedArchived =
        JSON.parse(localStorage.getItem("archivedNotes")) || [];
      const savedDeleted =
        JSON.parse(localStorage.getItem("deletedNotes")) || [];

      setNotes(savedNotes);
      setArchivedNotes(savedArchived);
      setDeletedNotes(savedDeleted);
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      // Initialize with empty arrays if loading fails
      setNotes([]);
      setArchivedNotes([]);
      setDeletedNotes([]);
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    console.log("Saving to localStorage...", {
      notes,
      archivedNotes,
      deletedNotes,
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  }, [notes, archivedNotes, deletedNotes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      color: "#27272a",
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const updateNote = (id, updatedFields) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, ...updatedFields, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    if (noteToDelete) {
      setNotes(notes.filter((note) => note.id !== id));
      setDeletedNotes([
        { ...noteToDelete, deletedAt: new Date().toISOString() },
        ...deletedNotes,
      ]);
    }
  };

  const archiveNote = (id) => {
    const noteToArchive = notes.find((note) => note.id === id);
    if (noteToArchive) {
      setNotes(notes.filter((note) => note.id !== id));
      setArchivedNotes([noteToArchive, ...archivedNotes]);
    }
  };

  const restoreNote = (id, from) => {
    if (from === "archive") {
      const noteToRestore = archivedNotes.find((note) => note.id === id);
      if (noteToRestore) {
        setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
        setNotes([noteToRestore, ...notes]);
      }
    } else if (from === "trash") {
      const noteToRestore = deletedNotes.find((note) => note.id === id);
      if (noteToRestore) {
        setDeletedNotes(deletedNotes.filter((note) => note.id !== id));
        setNotes([{ ...noteToRestore, deletedAt: undefined }, ...notes]);
      }
    }
  };

  const permanentlyDeleteNote = (id) => {
    setDeletedNotes(deletedNotes.filter((note) => note.id !== id));
  };

  const togglePinNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const changeNoteColor = (id, color) => {
    updateNote(id, { color });
  };

  return (
    <div className={`app ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        createNote={createNote}
      />

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                notes={notes}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                updateNote={updateNote}
                deleteNote={deleteNote}
                archiveNote={archiveNote}
                togglePinNote={togglePinNote}
                changeNoteColor={changeNoteColor}
              />
            }
          />
          <Route
            path="/archive"
            element={
              <Archive
                archivedNotes={archivedNotes}
                restoreNote={restoreNote}
                deleteNote={deleteNote}
              />
            }
          />
          <Route
            path="/trash"
            element={
              <Trash
                deletedNotes={deletedNotes}
                restoreNote={restoreNote}
                permanentlyDeleteNote={permanentlyDeleteNote}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
