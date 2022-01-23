import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Button, Error } from '../common';
import {
  COUNTRIES,
  CountriesData,
  UpdateCountryData,
  UpdateCountryVars,
  UPDATE_COUNTRY,
} from '../../graphql';
import { Errors } from '../../constants';
import { useLocalStorage } from '../../hooks';

interface EditedCountryState {
  id: string;
  name: string;
  description?: string;
}

const emptyEditedCountry: EditedCountryState = {
  id: '',
  name: '',
  description: '',
};

export const EditCountriesForm: React.FC = () => {
  const [err, setErr] = useState<Errors | null>(null);

  const { value: editedCountry, setter: setEditedCountry } =
    useLocalStorage<EditedCountryState>('edited_country', emptyEditedCountry);

  // Use apollo-client query and mutation hooks.
  const {
    loading: countriesLoading,
    error: countriesError,
    data,
  } = useQuery<CountriesData>(COUNTRIES);

  const [updateCountry, { loading: updateCountryLoading, error: updateCountryError }] =
    useMutation<UpdateCountryData, UpdateCountryVars>(UPDATE_COUNTRY, {
      refetchQueries: [{ query: COUNTRIES }],
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

    setEditedCountry(emptyEditedCountry);
  };

  /**
   * Handles select event.
   * 1. Find the country with the name equal to the input value.
   * 2. Set the editedCountry state variable.
   */
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const foundCountry = data?.countries.find(({ name }) => name === e.target.value);

    if (foundCountry) {
      const { id, name, description } = foundCountry;
      setEditedCountry({ id, name, description });
    }
  };

  /**
   * Handles on change events.
   * 1. Update the editedCountry state variable
   *    with the changed input value.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditedCountry({
      ...editedCountry,
      [e.target.name]: e.target.value,
    });

  // Handles the query error and loading state.
  if (countriesLoading || !data?.countries) {
    return null;
  }

  if (countriesError) {
    return <Error error={countriesError} />;
  }

  // Build the country options.
  const countryOptions = [...data?.countries?.sort()].map(({ name, id }) => (
    <div key={id} className="selectable-group">
      <input
        id={name}
        className="selectable-input"
        type="radio"
        checked={id === editedCountry.id}
        onChange={handleSelect}
        value={name}
      />
      <label className="selectable-item" htmlFor={name}>
        {name}
      </label>
    </div>
  ));

  return (
    <form id="edit-countries-form" className="form" onSubmit={handleSubmit}>
      <Error text={err} error={updateCountryError} />
      <div className="selectable">
        <span className="selectable-label">Pick a country:</span>
        {countryOptions}
      </div>
      <hr />
      <input
        id="edit-country-name-input"
        type="text"
        value={editedCountry.name}
        name="name"
        onChange={handleInputChange}
        placeholder="Name"
        disabled={updateCountryLoading}
      />
      <textarea
        id="edit-country-description-input"
        className="textarea"
        value={editedCountry.description}
        name="description"
        onChange={handleInputChange}
        placeholder="Description"
        disabled={updateCountryLoading}
      />
      <Button
        id="edit-country-submit-button"
        className="button"
        disabled={updateCountryLoading || !editedCountry.id}
        loading={updateCountryLoading}
        primary
        submit
      >
        {!updateCountryLoading ? 'Update' : 'Updating...'}
      </Button>
    </form>
  );
};
