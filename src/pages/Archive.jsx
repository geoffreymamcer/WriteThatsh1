import NoteCard from '../components/NoteCard';

const Archive = ({ archivedNotes, restoreNote, deleteNote }) => {
  return (
    <div className="archive-page">
      <h2>Archived Notes</h2>
      
      {archivedNotes.length === 0 ? (
        <p className="empty-message">No archived notes</p>
      ) : (
        <div className="notes-grid">
          {archivedNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              isActive={false}
              onDelete={deleteNote}
              onArchive={(id) => restoreNote(id, 'archive')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;