import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import Loader from './Loader';
import Errors from './Errors';
import { EDIT_PHOTO } from '../graphql';

function PhotoFormEdit(props) {
  const { id, country, caption, featured, author } = props;
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

  if (error) return <Errors error={error} />;
  if (loading) return <Loader loading={loading} />;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p>
        Photo from {country?.name} by {author?.username}
      </p>
      <input
        id="edit-photo-caption-input"
        type="text"
        placeholder={caption || 'Caption'}
        value={editedCaption}
        onChange={e => setEditedCaption(e.target.value)}
      />
      <label>Photo is{featured ? ' ' : ' not '}featured</label>
      <input
        id="edit-photo-featured-input"
        type="checkbox"
        checked={editedFeatured}
        onChange={e => setEditedFeatured(e.target.checked)}
      />
      <button
        id="edit-photo-submit-button"
        className="button"
        type="sumbit"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}

export default PhotoFormEdit;
