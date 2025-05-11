import { useState } from 'react';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';

const Home = ({ 
  notes, 
  activeNote, 
  setActiveNote, 
  updateNote, 
  deleteNote, 
  archiveNote,
  togglePinNote,
  changeNoteColor
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const otherNotes = filteredNotes.filter(note => !note.isPinned);

  return (
    <div className="home-page">
      <div className="notes-list-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="notes-list">
          {pinnedNotes.length > 0 && (
            <div className="notes-section">
              <h4>Pinned Notes</h4>
              <div className="notes-grid">
                {pinnedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    isActive={activeNote === note.id}
                    onClick={() => setActiveNote(note.id)}
                    onDelete={deleteNote}
                    onArchive={archiveNote}
                    onTogglePin={togglePinNote}
                    onChangeColor={changeNoteColor}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="notes-section">
            {pinnedNotes.length > 0 && <h4>Other Notes</h4>}
            <div className="notes-grid">
              {otherNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isActive={activeNote === note.id}
                  onClick={() => setActiveNote(note.id)}
                  onDelete={deleteNote}
                  onArchive={archiveNote}
                  onTogglePin={togglePinNote}
                  onChangeColor={changeNoteColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="note-editor-container">
        <NoteEditor 
          note={notes.find(note => note.id === activeNote)}
          onUpdate={updateNote}
        />
      </div>
    </div>
  );
};

export default Home;