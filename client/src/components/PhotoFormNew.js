import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import { ADD_PHOTO } from '../graphql/mutations';
import Errors from './Errors';

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
  const onSubmit = e => {
    e.preventDefault();
    uploadMutation({ variables: { file, country, caption, featured } });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <Errors error={error} />
      <input
        type="text"
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
      <div className="featured">
        <input
          id="featured"
          className="featured-input"
          type="checkbox"
          checked={featured}
          onChange={e => setFeatured(e.target.checked)}
        />
        <label className="featured-label" htmlFor="featured">
          Featured?
          {featured ? (
            <span className="featured-label-checkbox">Yes</span>
          ) : (
            <span className="featured-label-checkbox">No</span>
          )}
        </label>
      </div>
      <input
        className="file-upload"
        type="file"
        disabled={loading}
        value={file ? file.filename : 'Pick a photo'}
        onChange={e => setFile(e.target.files[0] || {})}
      />
      <button className="button" disabled={loading} type="submit">
        {loading ? 'Uploading...' : 'Send'}
      </button>
    </form>
  );
}

export default PhotoFormNew;
