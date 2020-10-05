import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import Errors from './Errors';
import { COUNTRIES, UPDATE_COUNTRY } from '../graphql';

function CountryFormEdit() {
  const [editedCountry, setEditedCountry] = useState({
    id: '',
    name: '',
    description: '',
  });

  // Use apollo-client query and mutation hooks.
  const { loading: qLoading, error: qError, data, client } = useQuery(
    COUNTRIES
  );

  const [updateCountry, { loading: mLoading, error: mError }] = useMutation(
    UPDATE_COUNTRY
  );

  /**
   * Handles submit event.
   * 1. Prevent the refresh.
   * 2. Issue a query to update the country.
   *    a) Reset the Apollo store on completed
   *       to update the DOM.
   * 3. Reset the editedCountry state variable.
   * @param {Event} e
   */
  const handleSubmit = e => {
    e.preventDefault();
    updateCountry({
      variables: editedCountry,
      onCompleted: () => client.resetStore(),
    });
    setEditedCountry({ id: '', name: '', description: '' });
  };

  /**
   * Handles select event.
   * 1. Find the country with the name equal to the input value.
   * 2. Set the editedCountry state variable.
   * @param {Event} e
   */
  const handleSelect = e => {
    const { id, name, description } = data?.countries.find(
      ({ name }) => name === e.target.value
    );
    setEditedCountry({ id, name, description });
  };

  /**
   * Handles on change events.
   * 1. Update the editedCountry state variable
   *    with the changed input value.
   * @param {Event} e
   */
  const handleInputChange = e =>
    setEditedCountry({
      ...editedCountry,
      [e.target.name]: e.target.value,
    });

  // Handles the query error and loading state.
  if (qLoading) return null;
  if (qError) return <Errors error={qError} />;

  // Build the country options.
  const countryOptions = [...data?.countries?.sort()].map(({ name, id }) => (
    <div key={id} className="selectable-group">
      <input
        id={name}
        className="selectable-input"
        type="checkbox"
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
      <Errors error={mError} />
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

export default CountryFormEdit;
