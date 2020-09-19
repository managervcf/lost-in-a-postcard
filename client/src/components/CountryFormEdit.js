import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import Errors from './Errors';
import ErrorMessage from './ErrorMessage';
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
      onCompleted: async () => await client.resetStore(),
      // Redetches query after mutation to update the DOM.
      refetchQueries: () => [{ query: COUNTRIES }],
    });
    // Reset state to empty strings.
    setEditedCountry({ id: '', name: '', description: '' });
  };

  // Handles select event.
  const handleSelect = e => {
    const { id, name, description } = data?.countries.find(
      ({ name }) => name === e.target.value
    );
    // Set state.
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

  // Build select menu with countries.
  const countryOptions = data.countries.sort().map(({ id, name }) => (
    <option key={id} value={name}>
      {name}
    </option>
  ));

  return (
    <form className="form" onSubmit={onSubmit}>
      <Errors error={mError} />
      <select defaultValue={0} required onChange={handleSelect}>
        <option value={0} disabled>
          Pick a country
        </option>
        {countryOptions}
      </select>
      <input
        type="text"
        value={editedCountry.name}
        name="name"
        onChange={handleInputChange}
      />
      <textarea
        value={editedCountry.description}
        name="description"
        onChange={handleInputChange}
      />
      <button
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
