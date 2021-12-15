import React from 'react';

interface EditButtonProps {
  editMode: boolean;
  setEditMode: Function;
}

export const EditButton: React.FC<EditButtonProps> = ({ editMode, setEditMode }) => (
  <button className="button edit-photo-button" onClick={() => setEditMode(!editMode)}>
    {editMode ? 'Exit editing' : 'Edit'}
  </button>
);
