import { NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiPlus,
  FiHome,
  FiArchive,
  FiTrash2,
} from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar, createNote }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        {isOpen ? (
          <>
            <h2 className="logo">WriteThatSh1</h2>
            <button className="icon-button" onClick={toggleSidebar}>
              <FiX />
            </button>
          </>
        ) : (
          <button className="icon-button" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <button className="new-note-button" onClick={createNote}>
            <FiPlus /> New Note
          </button>

          <nav className="sidebar-nav">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiHome /> Home
            </NavLink>
            <NavLink
              to="/archive"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiArchive /> Archive
            </NavLink>
            <NavLink
              to="/trash"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiTrash2 /> Trash
            </NavLink>
          </nav>
        </>
      )}
    </div>
  );
};

export default Sidebar;
