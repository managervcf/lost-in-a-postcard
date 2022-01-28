import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Button, Collapse, Error, Form } from '../common';
import {
  COUNTRIES,
  CountriesData,
  UpdateCountryData,
  UpdateCountryVars,
  UPDATE_COUNTRY,
} from '../../graphql';
import { Errors } from '../../constants';
import { useLocalStorage } from '../../hooks';
import {
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

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
  } = useQuery<CountriesData>(COUNTRIES, { fetchPolicy: 'network-only' });

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

    setTimeout(() => setEditedCountry(emptyEditedCountry), 1500);
  };

  /**
   * Handles select event.
   * 1. Find the country with the name equal to the input value.
   * 2. Set the editedCountry state variable.
   */
  const handleSelect = (e: SelectChangeEvent<string>) => {
    const foundCountry = data?.countries.find(({ id }) => id === e.target.value);

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

  // Build the country options.
  const countryOptions = useMemo(
    () =>
      [...(data?.countries?.sort() ?? [])].map(({ name, id }) => (
        <MenuItem value={id}>{name}</MenuItem>
      )),
    [data]
  );

  // Handles the query error and loading state.
  if (countriesLoading || !data?.countries) {
    return null;
  }

  if (countriesError) {
    return <Error error={countriesError} />;
  }

  return (
    <Form id="edit-countries-form" onSubmit={handleSubmit}>
      <Grid item>
        <Typography variant="h6">Edit country</Typography>
      </Grid>
      <Error text={err} error={updateCountryError} />
      <Grid item>
        <FormControl sx={{ m: 1, minWidth: 230 }}>
          <InputLabel id="country-select">Country</InputLabel>
          <Select
            label="Country"
            labelId="country-select"
            value={data.countries.find(({ name }) => name === editedCountry.name)?.id}
            onChange={handleSelect}
            disabled={updateCountryLoading}
            autoWidth
          >
            {countryOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          id="edit-country-name-input"
          name="name"
          type="text"
          value={editedCountry.name}
          onChange={handleInputChange}
          label={
            'Name: ' +
            (!!editedCountry.id
              ? data?.countries.find(({ id }) => id === editedCountry.id)?.name
              : '')
          }
          disabled={!editedCountry.id}
        />
      </Grid>
      <Grid item>
        <TextField
          id="edit-country-description-input"
          name="description"
          type="text"
          multiline
          rows={4}
          label={
            'Description: ' +
            (!!editedCountry.id
              ? data?.countries
                  ?.find(({ id }) => id === editedCountry.id)
                  ?.description?.slice(5)
              : '')
          }
          value={editedCountry.description}
          onChange={handleInputChange}
          disabled={updateCountryLoading || !editedCountry.id}
        />
      </Grid>
      <Button
        id="edit-country-submit-button"
        submit
        variant="contained"
        disabled={updateCountryLoading || !editedCountry.id}
        loading={updateCountryLoading}
      >
        Update
      </Button>
    </Form>
  );
};
