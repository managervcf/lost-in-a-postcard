import React, { useState } from 'react';
import Errors from './Errors';
import { useUpload } from '../hooks/useUpload';
import { useQuery } from 'react-apollo';
import { COUNTRIES } from '../graphql/queries';

function PhotoFormNew() {
  const [country, setCountry] = useState('');
  const [caption, setCaption] = useState('');
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState({});

  const { data } = useQuery(COUNTRIES);

  // Use the custom useUpload hook.
  const { uploadToS3, loading, getUrlError, uploadError } = useUpload();

  /**
   * Handles the form submit event.
   * 1. Prevent the page refresh.
   * 2. Upload the new photo.
   * @param {Event} e
   */
  const handleSubmit = async e => {
    e.preventDefault();
    await uploadToS3({ file, country, caption, featured });
  };

  // Bulid the country options.
  const countryOptions = [...data?.countries].map(({ name, id }) => (
    <div key={id}>
      <input
        id={id}
        className="selectable-input"
        type="checkbox"
        checked={name === country}
        onChange={() => setCountry(name)}
      />
      <label className="selectable-item" htmlFor={id}>
        {name}
      </label>
    </div>
  ));

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Errors error={getUrlError ? getUrlError : uploadError} />
      <div className="selectable">
        <span className="selectable-label">Existing countries:</span>
        {countryOptions}
      </div>
      <input
        id="add-photo-country-input"
        type="text"
        placeholder="Country"
        value={country}
        onChange={e => setCountry(e.target.value)}
      />
      <input
        id="add-photo-caption-input"
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={e => setCaption(e.target.value)}
      />
      <div className="selectable">
        <span className="selectable-label">Featured:</span>
        <input
          id="add-photo-featured-input"
          className="selectable-input"
          type="checkbox"
          checked={featured}
          onChange={e => setFeatured(e.target.checked)}
        />
        <label className="selectable-item" htmlFor="add-photo-featured-input">
          {featured ? 'Yes' : 'No'}
        </label>
      </div>
      <input
        id="add-photo-file-input"
        className="file-upload"
        type="file"
        accept="image/jpeg"
        disabled={loading}
        value={file ? file.filename : 'Pick a photo'}
        onChange={e => setFile(e.target.files[0] ?? {})}
      />
      <button
        id="add-photo-submit-button"
        className="button"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

export default PhotoFormNew;
