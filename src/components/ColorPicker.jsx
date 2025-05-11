import { FiX } from "react-icons/fi";

const colorOptions = [
  "#27272a", // default
  "#3f3f46",
  "#52525b",
  "#1e293b",
  "#0f172a",
  "#1e3a8a",
  "#1e40af",
  "#1d4ed8",
  "#0369a1",
  "#0e7490",
  "#155e75",
  "#164e63",
  "#065f46",
  "#047857",
  "#059669",
  "#166534",
  "#4d7c0f",
  "#65a30d",
  "#854d0e",
  "#a16207",
  "#713f12",
  "#831843",
  "#9d174d",
  "#86198f",
  "#7e22ce",
  "#6b21a8",
];

const ColorPicker = ({ selectedColor, onSelect, onClose }) => {
  return (
    <div className="color-picker-popup">
      <div className="color-picker-header">
        <h4>Choose Color</h4>
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>
      </div>
      <div className="color-grid">
        {colorOptions.map((color) => (
          <div
            key={color}
            className={`color-option ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
