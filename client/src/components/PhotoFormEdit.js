import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import LoaderInline from './LoaderInline';
import { EDIT_PHOTO } from '../graphql/mutations';

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

  // Define submit handler.
  const onSubmit = e => {
    e.preventDefault();
    updateMutation({
      variables: {
        id,
        caption: editedCaption,
        featured: editedFeatured,
      },
    });
  };

  if (error) return <p>{error.message}</p>;
  if (loading) return <LoaderInline size={5} loading={loading} />;

  return (
    <form className="form" onSubmit={onSubmit}>
      <p>
        Photo from {country.name} by {author.username}
      </p>
      <input
        type="text"
        placeholder={caption || 'Caption'}
        value={editedCaption}
        onChange={e => setEditedCaption(e.target.value)}
      />
      <label>Photo is{featured ? ' ' : ' not '}featured</label>
      <input
        type="checkbox"
        checked={editedFeatured}
        onChange={e => setEditedFeatured(e.target.checked)}
      />
      <button className="button" type="sumbit" disabled={loading}>
        {loading ? 'Loading...' : 'Update'}
      </button>
    </form>
  );
}

export default PhotoFormEdit;
