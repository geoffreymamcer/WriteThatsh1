import { useEffect, useRef } from 'react';

const NoteEditor = ({ note, onUpdate }) => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (note && titleRef.current && contentRef.current) {
      titleRef.current.value = note.title || '';
      contentRef.current.value = note.content || '';
    }
  }, [note]);

  const handleBlur = () => {
    if (!note) return;
    
    const updatedFields = {
      title: titleRef.current.value,
      content: contentRef.current.value
    };
    onUpdate(note.id, updatedFields);
  };

  if (!note) {
    return (
      <div className="note-editor empty">
        <div className="placeholder">
          <h3>Select a note or create a new one</h3>
          <p>Your content will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <input
        type="text"
        className="note-title"
        placeholder="Note Title"
        ref={titleRef}
        onBlur={handleBlur}
        defaultValue={note.title}
      />
      <textarea
        className="note-content"
        placeholder="Start writing..."
        ref={contentRef}
        onBlur={handleBlur}
        defaultValue={note.content}
      />
    </div>
  );
};

export default NoteEditor;