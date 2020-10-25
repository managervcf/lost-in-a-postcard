import React from 'react';

interface EditButtonProps {
  editMode: boolean;
  setEditMode: Function;
}

function EditButton({ editMode, setEditMode }: EditButtonProps) {
  return (
    <button
      className="button edit-photo-button"
      onClick={() => setEditMode(!editMode)}
    >
      {editMode ? 'Exit editing' : 'Edit'}
    </button>
  );
}

export default EditButton;
