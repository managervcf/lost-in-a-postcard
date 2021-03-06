import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import Error from '../common/Error';
import {
  COUNTRIES,
  CountriesData,
  UpdateCountryData,
  UpdateCountryVars,
  UPDATE_COUNTRY,
} from '../../graphql';
import { Errors } from '../../constants';

interface EditedCountryState {
  id: string;
  name: string;
  description: string;
}

function EditCountriesForm() {
  const [editedCountry, setEditedCountry] = useState<EditedCountryState>({
    id: '',
    name: '',
    description: '',
  });

  const [err, setErr] = useState<Errors | null>(null);

  // Use apollo-client query and mutation hooks.
  const { loading: qLoading, error: qError, data } = useQuery<CountriesData>(
    COUNTRIES
  );

  const [
    updateCountry,
    { loading: mLoading, error: mError, client },
  ] = useMutation<UpdateCountryData, UpdateCountryVars>(UPDATE_COUNTRY, {
    onCompleted: () => client?.resetStore(),
  });

  /**
   * Handles submit event.
   * 1. Prevent the refresh.
   * 2. Check for errors.
   * 2. Issue a query to update the country.
   *    a) Reset the Apollo store on completed
   *       to update the DOM.
   * 3. Reset the editedCountry state variable.
   * @param {Event} e
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!editedCountry.id) {
      setErr(Errors.NoIdProvided);
    } else if (!editedCountry.name) {
      setErr(Errors.NoCountryNameProvided);
    } else if (editedCountry.name.length < 3) {
      setErr(Errors.CountryNameTooShort);
    } else {
      setErr(null);
    }

    updateCountry({
      variables: editedCountry,
    });

    setEditedCountry({ id: '', name: '', description: '' });
  };

  /**
   * Handles select event.
   * 1. Find the country with the name equal to the input value.
   * 2. Set the editedCountry state variable.
   * @param {Event} e
   */
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const foundCountry = data?.countries.find(
      ({ name }) => name === e.target.value
    );
    if (foundCountry) {
      const { id, name, description } = foundCountry;
      setEditedCountry({ id, name, description: description ?? '' });
    }
  };

  /**
   * Handles on change events.
   * 1. Update the editedCountry state variable
   *    with the changed input value.
   * @param {Event} e
   */
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setEditedCountry({
      ...editedCountry,
      [e.target.name]: e.target.value,
    });

  // Handles the query error and loading state.
  if (qLoading) return null;
  if (qError) return <Error error={qError} />;

  // Build the country options.
  const countryOptions = [...data?.countries?.sort()].map(({ name, id }) => (
    <div key={id} className="selectable-group">
      <input
        id={name}
        className="selectable-input"
        type="radio"
        checked={name === editedCountry.name}
        onChange={handleSelect}
        value={name}
      />
      <label className="selectable-item" htmlFor={name}>
        {name}
      </label>
    </div>
  ));

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Error text={err} error={mError} />
      <div className="selectable">
        <span className="selectable-label">Pick a country:</span>
        {countryOptions}
      </div>
      <input
        id="edit-country-name-input"
        type="text"
        value={editedCountry.name}
        name="name"
        onChange={handleInputChange}
        placeholder="Name"
      />
      <textarea
        id="edit-country-description-input"
        className="textarea"
        value={editedCountry.description}
        name="description"
        onChange={handleInputChange}
        placeholder="Description"
      />
      <button
        id="edit-country-submit-button"
        className="button"
        type="submit"
        disabled={mLoading || !editedCountry.id}
      >
        {!mLoading ? 'Update' : 'Updating...'}
      </button>
    </form>
  );
}

export default EditCountriesForm;
