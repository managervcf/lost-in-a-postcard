import React, { useState } from 'react';
import classnames from 'classnames';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import PhotoFormEdit from './PhotoFormEdit';
import PhotoCaptionContent from './PhotoCaptionContent';

const Caption = props => {
	let { visible } = props;
	let [editMode, setEditMode] = useState(false);
	let captionClasses = classnames({
		'gallery-caption': true,
		'fade-in': true,
		visible
	});

	return (
		<div className={captionClasses}>
			{editMode ? (
				<PhotoFormEdit {...props} />
			) : (
				<PhotoCaptionContent {...props} />
			)}
			<EditButton editMode={editMode} setEditMode={setEditMode} />
			<DeleteButton {...props} />
		</div>
	);
};

export default Caption;
