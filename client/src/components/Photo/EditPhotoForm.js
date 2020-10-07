import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import DeleteButton from './DeleteButton';
import Error from '../common/Error';
import withAnimation from '../../wrappers/withAnimation';
import { EDIT_PHOTO } from '../../graphql';

function PhotoFormEdit(props) {
  const { id, country, caption, featured } = props;
  const [editedCaption, setEditedCaption] = useState(caption);
  const [editedFeatured, setEditedFeatured] = useState(featured);

  // Access apollo store.
  const client = useApolloClient();

  // Use mutation hook.
  const [updateMutation, { error, loading }] = useMutation(EDIT_PHOTO, {
    onCompleted: async () => await client.resetStore(),
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
      variables: {
        id,
        caption: editedCaption,
        featured: editedFeatured,
      },
    });
  };

  if (error) return <Error error={error} />;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="u-mb-medium frame">
        <p className="u-mb-small">
          <span className="u-text-dim">Country: </span> {country.name}
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
        type="text"
        placeholder={caption ?? ''}
        value={editedCaption}
        onChange={e => setEditedCaption(e.target.value)}
      />
      <div className="selectable">
        <span className="selectable-label">Featured:</span>
        <input
          id="edit-photo-featured-input"
          className="selectable-input"
          type="checkbox"
          checked={editedFeatured}
          onChange={e => setEditedFeatured(e.target.checked)}
        />
        <label className="selectable-item" htmlFor="edit-photo-featured-input">
          {editedFeatured ? 'Yes' : 'No'}
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

export default withAnimation(PhotoFormEdit);
