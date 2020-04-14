import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import ErrorMessage from "./ErrorMessage";
import { COUNTRIES } from "../graphql/queries";
import { UPDATE_COUNTRY } from "../graphql/mutations";

const CountryFormEdit = () => {
  let [editedCountry, setEditedCountry] = useState({
    id: "",
    name: "",
    description: "",
  });

  // Use apollo-client query and mutation hooks.
  const { loading: qLoading, error: qError, data, client } = useQuery(
    COUNTRIES
  );
  const [updateCountry, { loading: mLoading, error: mError }] = useMutation(
    UPDATE_COUNTRY
  );

  // Handles submit event.
  let handleSubmit = async (e) => {
    // Prevent default browser behavior.
    e.preventDefault();
    // Mutate using provided function
    await updateCountry({
      variables: editedCountry,
      onCompleted: async () => await client.resetStore(),
      // Redetches query after mutation to update the DOM.
      refetchQueries: () => [{ query: COUNTRIES }],
    });
    // Reset state to empty strings.
    setEditedCountry({ id: "", name: "", description: "" });
  };

  // Handles select event.
  let handleSelect = (e, countryArray) => {
    let { id, name, description } = countryArray.find(
      ({ name }) => name === e.target.value
    );
    // Set state.
    setEditedCountry({ id, name, description });
  };

  // Handles on change events.
  let handleInputChange = (e) =>
    setEditedCountry({
      ...editedCountry,
      [e.target.name]: e.target.value,
    });

  // Handles query error and loading state.
  if (qLoading) return null;
  if (qError) return null;

  // Build select menu with countries.
  let countryOptions = data.countries.sort().map(({ id, name }) => (
    <option key={id} value={name}>
      {name}
    </option>
  ));

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <select
        defaultValue={0}
        required
        onChange={(e) => handleSelect(e, data.countries)}
      >
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
      {mError && (
        <ErrorMessage text="Could not edit selected country, please try again." />
      )}
      <button type="submit" disabled={mError}>
        {!mLoading ? "Update" : "Updating..."}
      </button>
    </form>
  );
};

export default CountryFormEdit;
