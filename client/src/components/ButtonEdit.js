import React from 'react';

function ButtonDelete({ editMode, setEditMode }) {
  return (
    <button
      className="button edit-photo-button"
      onClick={() => setEditMode(!editMode)}
    >
      {editMode ? 'Exit editing' : 'Edit'}
    </button>
  );
}

export default ButtonDelete;
