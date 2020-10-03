import React, { useState } from 'react';
import Errors from './Errors';
import { useUpload } from '../hooks/useUpload';

function PhotoFormNew() {
  // Define country state variable.
  const [country, setCountry] = useState('');
  const [caption, setCaption] = useState('');
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState({});

  // Use the custom useUpload hook.
  const { uploadToS3, loading, getUrlError, uploadError } = useUpload();

  // Define submit handler.
  const onSubmit = async e => {
    e.preventDefault();
    await uploadToS3({ file, country, caption, featured });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <Errors error={getUrlError ? getUrlError : uploadError} />
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
        accept="image/jpeg"
        disabled={loading}
        value={file ? file.filename : 'Pick a photo'}
        onChange={e => setFile(e.target.files[0] || {})}
      />
      <button className="button" disabled={loading} type="submit">
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

export default PhotoFormNew;
