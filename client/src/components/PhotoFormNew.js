import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import { ADD_PHOTO } from '../graphql/mutations';

function PhotoFormNew() {
  // Define country state variable.
  const [country, setCountry] = useState('');
  const [caption, setCaption] = useState('');
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState({});

  // Access apollo store.
  const client = useApolloClient();

  // Use mutation hook.
  const [uploadMutation, { error, loading }] = useMutation(ADD_PHOTO, {
    onCompleted: () => client.resetStore(),
  });

  // Define submit handler.
  const handleSubmit = async (e, mutate) => {
    e.preventDefault();
    await mutate({ variables: { file, country, caption, featured } });
  };

  return (
    <form className="form" onSubmit={e => handleSubmit(e, uploadMutation)}>
      {error && <div>{error.message}</div>}
      <input
        type="text"
        required
        placeholder="Country"
        value={country}
        onChange={e => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={e => setCaption(e.target.value)}
      />
      <div className="featured-input">
        <label>{featured ? 'Featured!' : 'Feature?'}</label>
        <input
          type="checkbox"
          checked={featured}
          onChange={e => setFeatured(e.target.checked)}
        />
      </div>
      <input
        type="file"
        required
        disabled={loading}
        value={file ? file.filename : 'Pick a photo'}
        onChange={e => setFile(e.target.files[0])}
      />
      <button className="button" disabled={loading} type="submit">
        {loading ? 'Uploading...' : 'Send'}
      </button>
    </form>
  );
}

export default PhotoFormNew;
