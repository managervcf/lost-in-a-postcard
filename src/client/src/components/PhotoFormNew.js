import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';

import { ADD_PHOTO } from '../graphql/mutations';

const PhotoFormNew = () => {
  // Define country state variable.
  let [country, setCountry] = useState('');
  let [caption, setCaption] = useState('');
  let [featured, setFeatured] = useState(false);
  let [file, setFile] = useState({});

  // Access apollo store.
  const client = useApolloClient();

  // Use mutation hook.
  const [uploadMutation, { error, loading }] = useMutation(ADD_PHOTO, {
    onCompleted: () => client.resetStore()
  });

  // Define submit handler.
  let handleSubmit = async (e, mutate) => {
    e.preventDefault();
    await mutate({ variables: { file, country, caption, featured } });
  };

  return (
    <form
      className="upload-form"
      onSubmit={e => handleSubmit(e, uploadMutation)}
    >
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
      <label>Featured?</label>
      <input
        type="checkbox"
        checked={featured}
        onChange={e => setFeatured(e.target.checked)}
      />
      <input
        type="file"
        required
        disabled={loading}
        value={file ? file.filename : 'Pick a photo'}
        onChange={e => setFile(e.target.files[0])}
      />
      <button disabled={loading} type="submit">
        {loading ? 'Uploading...' : 'Send'}
      </button>
    </form>
  );
};

export default PhotoFormNew;
