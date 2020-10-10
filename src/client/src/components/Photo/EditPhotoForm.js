import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import DeleteButton from './DeleteButton';
import Error from '../common/Error';
import { EDIT_PHOTO } from '../../graphql';

function PhotoFormEdit({ id, country, caption, featured }) {
  const [editedPhoto, setEditedPhoto] = useState({ id, caption, featured });

  // Use mutation hook.
  const [updateMutation, { error, loading, client }] = useMutation(EDIT_PHOTO, {
    onCompleted: () => client.resetStore(),
  });

  /**
   * Handles the form submit event.
   * 1. Prevent the page refresh.
   * 2. Issue the editPhoto mutation.
   * @param {Event} e
   */
  const handleSubmit = e => {
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
  const handleInputChange = e =>
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
      <div className="u-mb-medium frame">
        <p className="u-mb-small">
          <span className="u-text-dim">Country: </span> {country?.name}
        </p>
        <p className="u-mb-small">
          <span className="u-text-dim">Caption: </span> {caption}
        </p>
        <p>
          <span className="u-text-dim">Featured: </span>{' '}
          {featured ? 'Yes' : 'No'}
        </p>
      </div>
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
      <button
        id="edit-photo-submit-button"
        className="button"
        type="sumbit"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
      <DeleteButton id={id} />
    </form>
  );
}

export default PhotoFormEdit;
