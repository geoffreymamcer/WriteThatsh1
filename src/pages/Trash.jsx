import NoteCard from '../components/NoteCard';

const Trash = ({ deletedNotes, restoreNote, permanentlyDeleteNote }) => {
  return (
    <div className="trash-page">
      <h2>Trash</h2>
      
      {deletedNotes.length === 0 ? (
        <p className="empty-message">Trash is empty</p>
      ) : (
        <div className="notes-grid">
          {deletedNotes.map(note => (
            <div key={note.id} className="trash-note-container">
              <NoteCard
                note={note}
                isActive={false}
                onArchive={(id) => restoreNote(id, 'trash')}
              />
              <button 
                className="permanent-delete-button"
                onClick={() => permanentlyDeleteNote(note.id)}
              >
                Delete Permanently
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;