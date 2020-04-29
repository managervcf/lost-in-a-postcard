import React, { useState } from 'react';
import classnames from 'classnames';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import PhotoFormEdit from './PhotoFormEdit';
import PhotoCaptionContent from './PhotoCaptionContent';

function Caption(props) {
  // Checks if the caption is in edit mode.
  const [editMode, setEditMode] = useState(false);

  // Build caption classes based on visibility.
  const captionClasses = classnames({
    'gallery-caption': true,
    'fade-in': true,
    hidden: true,
    visible: props.visible,
  });

  return (
    <figcaption className={captionClasses}>
      {editMode ? (
        <PhotoFormEdit {...props} />
      ) : (
        <PhotoCaptionContent {...props} />
      )}
      <ButtonEdit editMode={editMode} setEditMode={setEditMode} />
      <ButtonDelete {...props} />
    </figcaption>
  );
}

export default Caption;
