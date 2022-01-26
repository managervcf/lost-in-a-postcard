import { useState } from 'react';
import { PhotoEditForm } from './PhotoEditForm';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

interface PhotoEditProps {
  id: string;
  region: string;
  caption: string;
  featured: boolean;
  clicks: number;
  upload: {
    key: string;
  };
  country: {
    name: string;
  };
}

export const PhotoEdit: React.FC<PhotoEditProps> = props => {
  // Checks if the caption is in the edit mode.
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <IconButton color="primary" onClick={() => setEditMode(editMode => !editMode)}>
        <Edit />
      </IconButton>
      <Dialog open={editMode} onClose={() => setEditMode(false)}>
        <DialogContent>
          <PhotoEditForm {...props} closeEditMode={() => setEditMode(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
