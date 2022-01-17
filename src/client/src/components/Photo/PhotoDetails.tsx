import React, { useState } from 'react';
import classnames from 'classnames';
import { EditButton } from './EditButton';
import { PhotoEdit } from './PhotoEdit';
import { PhotoInfo } from './PhotoInfo';

interface PhotoDetailsProps {
  visible: boolean;
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

export const PhotoDetails: React.FC<PhotoDetailsProps> = props => {
  // Checks if the caption is in the edit mode.
  const [editMode, setEditMode] = useState(false);

  // Build caption classes based on the visibility.
  const captionClasses = classnames({
    'gallery-caption': true,
    'fade-out': !props.visible,
    'fade-in': props.visible,
  });

  return (
    <figcaption className={captionClasses}>
      {editMode ? <PhotoEdit {...props} /> : <PhotoInfo {...props} />}
      <hr />
      <EditButton editMode={editMode} setEditMode={setEditMode} />
    </figcaption>
  );
};
