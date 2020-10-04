import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import Errors from './Errors';
import { COUNTRIES } from '../graphql/queries';
import { UPDATE_COUNTRY } from '../graphql/mutations';

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

  // Handles submit event.
  const onSubmit = e => {
    // Prevent default browser behavior.
    e.preventDefault();
    // Mutate using provided function
    updateCountry({
      variables: editedCountry,
      onCompleted: () => client.resetStore(),
      // Refetches query after mutation to update the DOM.
      refetchQueries: () => [{ query: COUNTRIES }],
    });
    // Reset state to empty strings.
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

  // Handles on change events.
  const handleInputChange = e =>
    setEditedCountry({
      ...editedCountry,
      [e.target.name]: e.target.value,
    });

  // Handles query error and loading state.
  if (qLoading) return null;
  if (qError) return null;

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
    <form className="form" onSubmit={onSubmit}>
      <Errors error={mError} />
      <div className="selectable">
        <span>Pick a country: </span>
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
