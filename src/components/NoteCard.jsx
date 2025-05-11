import { useState } from "react";
import { FiMapPin, FiTrash2, FiArchive } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import ColorPicker from "./ColorPicker";

const NoteCard = ({
  note,
  isActive,
  onClick,
  onDelete,
  onArchive,
  onTogglePin,
  onChangeColor,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color) => {
    onChangeColor(note.id, color);
    setShowColorPicker(false);
  };

  return (
    <div
      className={`note-card ${isActive ? "active" : ""}`}
      style={{ backgroundColor: note.color }}
      onClick={onClick}
    >
      <div className="note-card-header">
        <h3>{note.title || "Untitled Note"}</h3>
        <button
          className={`pin-button ${note.isPinned ? "pinned" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id);
          }}
        >
          <FiMapPin />
        </button>
      </div>

      <p className="note-preview">
        {note.content.substring(0, 100)}
        {note.content.length > 100 ? "..." : ""}
      </p>

      <div className="note-card-footer">
        <small>{new Date(note.updatedAt).toLocaleString()}</small>

        <div className="note-actions">
          <button
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPicker(!showColorPicker);
            }}
          >
            <FaPalette />
          </button>

          <button
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation();
              onArchive(note.id);
            }}
          >
            <FiArchive />
          </button>

          <button
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {showColorPicker && (
        <ColorPicker
          selectedColor={note.color}
          onSelect={handleColorChange}
          onClose={() => setShowColorPicker(false)}
        />
      )}
    </div>
  );
};

export default NoteCard;
