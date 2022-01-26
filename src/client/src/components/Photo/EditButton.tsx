import React from 'react';
import { Button } from '../common';

interface EditButtonProps {
  editMode: boolean;
  setEditMode: Function;
}

export const EditButton: React.FC<EditButtonProps> = ({ editMode, setEditMode }) => (
  <Button onClick={() => setEditMode(!editMode)}>
    {editMode ? 'Exit editing' : 'Edit'}
  </Button>
);
