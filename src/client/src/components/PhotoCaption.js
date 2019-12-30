import React, { useState } from 'react';
import classnames from 'classnames';

import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import PhotoFormEdit from './PhotoFormEdit';
import PhotoCaptionContent from './PhotoCaptionContent';

const Caption = props => {
  // Checks if the caption is in edit mode.
  let [editMode, setEditMode] = useState(false);

  // Build caption classes based on visibility.
  let captionClasses = classnames({
    'gallery-caption': true,
    'fade-in': true,
    'visible': props.visible
  });

  return (
    <div className={captionClasses}>
      {editMode ? (
        <PhotoFormEdit {...props} />
      ) : (
        <PhotoCaptionContent {...props} />
      )}
      <ButtonEdit editMode={editMode} setEditMode={setEditMode} />
      <ButtonDelete {...props} />
    </div>
  );
};

export default Caption;
