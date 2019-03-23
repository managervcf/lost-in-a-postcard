import React, { useState } from 'react';
import { withApollo } from 'react-apollo';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import PhotoFormEdit from './PhotoFormEdit';
import PhotoCaptionContent from './PhotoCaptionContent';

const Caption = props => {
	let [editMode, setEditMode] = useState(false);

	return (
		<div className="gallery-caption">
			{editMode ? (
				<PhotoFormEdit
					editMode={editMode}
					setEditMode={setEditMode}
					{...props}
				/>
			) : (
				<PhotoCaptionContent {...props} />
			)}
			<EditButton editMode={editMode} setEditMode={setEditMode} />
			<DeleteButton {...props} />
		</div>
	);
};

export default withApollo(Caption);
