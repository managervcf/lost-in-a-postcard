import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';

import LoaderInline from './LoaderInline';

import { EDIT_PHOTO } from '../graphql/mutations';

const PhotoFormEdit = props => {
  let { id, country, caption, featured, author } = props;
  let [editedCaption, setEditedCaption] = useState(caption);
  let [editedFeatured, setEditedFeatured] = useState(featured);

  // Access apollo store.
  const client = useApolloClient();

  // Use mutation hook.
  const [updateMutation, { error, loading }] = useMutation(EDIT_PHOTO, {
    onCompleted: async () => await client.resetStore()
  });

  // Define submit handler.
  let handleSubmit = async (e, mutate) => {
    e.preventDefault();
    await mutate({
      variables: {
        id,
        caption: editedCaption,
        featured: editedFeatured
      }
    });
  };

  if (error) return <p>{error.message}</p>;
  if (loading) return <LoaderInline size={5} loading={loading} />;

  return (
    <form
      className="form"
      onSubmit={e => handleSubmit(e, updateMutation)}
    >
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
      <button type="sumbit" disabled={loading}>
        {loading ? 'Loading...' : 'Update'}
      </button>
    </form>
  );
};

export default PhotoFormEdit;
