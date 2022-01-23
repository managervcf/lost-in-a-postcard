import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-apollo';
import { DeleteButton } from './DeleteButton';
import { Button, Error } from '../common';
import { UpdatePhotoData, UpdatePhotoVars, UPDATE_PHOTO } from '../../graphql';

interface PhotoFormEditProps {
  id: string;
  country: {
    name: string;
  };
  region: string;
  caption: string;
  featured: boolean;
}

interface EditedPhotoState {
  id: string;
  region: string;
  caption: string;
  featured: boolean;
}

export const PhotoEdit: React.FC<PhotoFormEditProps> = ({
  id,
  country,
  region,
  caption,
  featured,
}) => {
  const [editedPhoto, setEditedPhoto] = useState<EditedPhotoState>({
    id,
    region,
    caption,
    featured,
  });

  // Use mutation hook.
  const [updateMutation, { error, loading, client }] = useMutation<
    UpdatePhotoData,
    UpdatePhotoVars
  >(UPDATE_PHOTO, {
    onCompleted: () => client?.resetStore(),
  });

  /**
   * Handles the form submit event.
   * 1. Prevent the page refresh.
   * 2. Issue the editPhoto mutation.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMutation({
      variables: editedPhoto,
    });
  };

  /**
   * Handles on change events.
   * 1. Update the editedPhoto state variable
   *    with the changed input value.
   * @param {Event} e
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedPhoto({
      ...editedPhoto,
      [e.target.name]:
        e.target.type === 'text'
          ? e.target.value
          : e.target.type === 'checkbox'
          ? e.target.checked
          : null,
    });

  if (error) return <Error error={error} />;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <p>
          <span className="u-text-dim">Country: </span> {country?.name}
        </p>
        <p>
          <span className="u-text-dim">Caption: </span> {caption}
        </p>
        <p>
          <span className="u-text-dim">Featured: </span> {featured ? 'Yes' : 'No'}
        </p>
      </div>
      <hr />
      <input
        id="edit-photo-region-input"
        name="region"
        type="text"
        placeholder={region}
        value={editedPhoto.region}
        onChange={handleInputChange}
      />
      <input
        id="edit-photo-caption-input"
        name="caption"
        type="text"
        placeholder={caption}
        value={editedPhoto.caption}
        onChange={handleInputChange}
      />
      <div className="selectable">
        <span className="selectable-label">Featured:</span>
        <input
          id="edit-photo-featured-input"
          className="selectable-input"
          name="featured"
          type="checkbox"
          checked={editedPhoto.featured}
          onChange={handleInputChange}
        />
        <label className="selectable-item" htmlFor="edit-photo-featured-input">
          {editedPhoto.featured ? 'Yes' : 'No'}
        </label>
      </div>
      <Button id="edit-photo-submit-button" primary submit loading={loading}>
        Update
      </Button>
      <DeleteButton id={id} />
    </form>
  );
};
