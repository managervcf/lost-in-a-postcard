import React, { useState } from 'react';
import classnames from 'classnames';
import EditButton from './EditButton';
import EditPhotoForm from './EditPhotoForm';
import PhotoInfo from './PhotoInfo';

interface PhotoDetailsProps {
  visible: boolean;
  id: string;
  caption: string;
  featured: boolean;
  country: {
    name: string;
  };
}

function PhotoDetails(props: PhotoDetailsProps) {
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
      {editMode ? (
        <EditPhotoForm {...props} />
      ) : (
        <PhotoInfo
          country={props.country}
          caption={props.caption}
          featured={props.featured}
        />
      )}
      <EditButton editMode={editMode} setEditMode={setEditMode} />
    </figcaption>
  );
}

export default PhotoDetails;
