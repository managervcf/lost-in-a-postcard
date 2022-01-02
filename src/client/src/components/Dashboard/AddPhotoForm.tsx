import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Button, Error } from '../common';
import { ProgressBar } from '../ProgressBar';
import { useLocalStorage, useUpload } from '../../hooks';
import { COUNTRIES, CountriesData } from '../../graphql';
import { Errors } from '../../constants';

interface NewPhotoState {
  country: string;
  region: string;
  caption: string;
  featured: boolean;
  files: any[];
}

export const AddPhotoForm: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [err, setErr] = useState<Errors | null>(null);

  // Use the custom useUpload hook.
  const { uploadToS3, loading, getUrlError, uploadError } = useUpload();

  const { value: newPhoto, setter: setNewPhoto } = useLocalStorage<NewPhotoState>(
    'new_photo',
    {
      country: '',
      region: '',
      caption: '',
      featured: false,
      files: [],
    }
  );

  const { data } = useQuery<CountriesData>(COUNTRIES);

  /**
   * Handles the form submit event.
   * 1. Prevent the page refresh.
   * 2. Check for incomplete fields.
   * 2. Loop over all selected photos and
   *    upload each one of them.
   * 3. Reset state variables.
   * 4. After a timeout, reset the progress bar.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newPhoto.country) {
      setErr(Errors.NoCountryNameProvided);
    } else if (newPhoto.files.length === 0) {
      setErr(Errors.NoFileProvided);
    } else {
      setErr(null);

      for (let file of newPhoto.files) {
        await uploadToS3({
          ...newPhoto,
          file,
        });

        setProgress([...newPhoto.files].indexOf(file) + 1);
      }

      setNewPhoto({
        country: '',
        region: '',
        caption: '',
        featured: false,
        files: [],
      });

      setTimeout(() => setProgress(0), 1000);
    }
  };

  /**
   * Handles on change events.
   * 1. Update the newPhoto state variable
   *    with the changed input value.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
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
  const countries = data?.countries ?? [];
  const countryOptions = countries.map(({ name, id }) => (
    <div key={id}>
      <input
        id={id}
        className="selectable-input"
        name="country"
        type="radio"
        value={name}
        checked={name === newPhoto.country}
        onChange={handleInputChange}
        disabled={loading}
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

  // Photos chosen message.
  const n = newPhoto.files.length;
  const photosChosen = n > 0 && <span>{`${n} photo${n > 1 ? 's' : ''}`}</span>;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Error text={err} error={getUrlError ?? uploadError} />
      <div className="selectable">
        <span className="selectable-label">Existing countries:</span>
        {countryOptions}
      </div>
      <hr />
      <ProgressBar max={newPhoto.files.length} value={progress} />
      <input
        id="add-photo-country-input"
        name="country"
        type="text"
        placeholder="Country"
        value={newPhoto.country}
        onChange={handleInputChange}
        disabled={loading}
      />
      <input
        id="add-photo-region-input"
        name="region"
        type="text"
        placeholder="Region"
        value={newPhoto.region}
        onChange={handleInputChange}
        disabled={loading}
      />
      <input
        id="add-photo-caption-input"
        name="caption"
        type="text"
        placeholder="Caption"
        value={newPhoto.caption}
        onChange={handleInputChange}
        disabled={loading}
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
          disabled={loading}
        />
        <label className="selectable-item" htmlFor="add-photo-featured-input">
          {featuredText}
        </label>
      </div>
      <div className="file-upload-container">
        <label className="file-upload button">
          <svg className="icon">
            <use xlinkHref="./assets/icons/icons.svg#icon-upload"></use>
          </svg>
          <input
            id="add-photo-file-input"
            name="files"
            type="file"
            accept="image/jpeg"
            multiple
            disabled={loading}
            onChange={handleInputChange}
          />
        </label>
        {photosChosen}
      </div>
      <Button
        id="add-photo-submit-button"
        className="button"
        disabled={loading}
        primary
        submit
      >
        {loading ? 'Uploading...' : 'Upload'}
      </Button>
    </form>
  );
};
