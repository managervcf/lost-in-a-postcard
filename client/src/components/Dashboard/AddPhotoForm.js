import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import Error from '../common/Error';
import ProgressBar from '../ProgressBar';
import { useUpload } from '../../hooks';
import { COUNTRIES } from '../../graphql';

function AddPhotoForm() {
  const [newPhoto, setNewPhoto] = useState({
    country: '',
    caption: '',
    featured: false,
    files: [],
  });

  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState(null);

  const { data } = useQuery(COUNTRIES);

  // Use the custom useUpload hook.
  const { uploadToS3, loading, getUrlError, uploadError } = useUpload();

  /**
   * Handles the form submit event.
   * 1. Prevent the page refresh.
   * 2. Check for incomplete fields.
   * 2. Loop over all selected photos and
   *    upload each one of them.
   * 3. Reset state variables.
   * 4. After a timeout, reset the progress bar.
   * @param {Event} e
   */
  const handleSubmit = async e => {
    e.preventDefault();

    if (!newPhoto.country) {
      setErr('Must provide a country name');
    } else if (newPhoto.files.length === 0) {
      setErr('Must upload a file');
    } else {
      setErr(null);
    }

    for (let file of newPhoto.files) {
      await uploadToS3({
        ...newPhoto,
        file,
      });
      setProgress([...newPhoto.files].indexOf(file) + 1);
    }

    setTimeout(() => setProgress(0), 1000);
    setNewPhoto({
      country: '',
      caption: '',
      featured: false,
      files: [],
    });
  };

  /**
   * Handles on change events.
   * 1. Update the newPhoto state variable
   *    with the changed input value.
   * @param {Event} e
   */
  const handleInputChange = e =>
    setNewPhoto({
      ...newPhoto,
      [e.target.name]:
        e.target.type === 'text' || e.target.type === 'radio'
          ? e.target.value
          : e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.type === 'file'
          ? e.target.files
          : null,
    });

  // Bulid the country options.
  const countryOptions = [...data?.countries].map(({ name, id }) => (
    <div key={id}>
      <input
        id={id}
        className="selectable-input"
        name="country"
        type="radio"
        value={name}
        checked={name === newPhoto.country}
        onChange={handleInputChange}
      />
      <label className="selectable-item" htmlFor={id}>
        {name}
      </label>
    </div>
  ));

  // Check if multiple photos are selected.
  const multipleSelected = newPhoto.files.length > 1;

  // Build a text message for the featured field.
  const featuredText = newPhoto.featured
    ? multipleSelected
      ? 'All'
      : 'Yes'
    : multipleSelected
    ? 'None'
    : 'No';

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Error text={err} error={getUrlError ?? uploadError} />
      <ProgressBar max={newPhoto.files.length} value={progress || 0} />
      <div className="selectable">
        <span className="selectable-label">Existing countries:</span>
        {countryOptions}
      </div>
      <input
        id="add-photo-country-input"
        name="country"
        type="text"
        placeholder="Country"
        value={newPhoto.country}
        onChange={handleInputChange}
      />
      <input
        id="add-photo-caption-input"
        name="caption"
        type="text"
        placeholder="Caption"
        value={newPhoto.caption}
        disabled={multipleSelected}
        onChange={handleInputChange}
      />
      <div className="selectable">
        <span className="selectable-label">Featured:</span>
        <input
          id="add-photo-featured-input"
          className="selectable-input"
          name="featured"
          type="checkbox"
          checked={newPhoto.featured}
          onChange={handleInputChange}
        />
        <label className="selectable-item" htmlFor="add-photo-featured-input">
          {featuredText}
        </label>
      </div>
      <input
        id="add-photo-file-input"
        className="file-upload"
        name="files"
        type="file"
        accept="image/jpeg"
        multiple
        disabled={loading}
        onChange={handleInputChange}
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

export default AddPhotoForm;
