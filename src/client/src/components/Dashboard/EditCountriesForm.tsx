import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Button, Error, Form } from '../common';
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
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
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
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
    handleClick();
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
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      )),
    [data]
  );

  // Handles the query error and loading state.
  if (countriesLoading || !data?.countries) {
    return null;
  }

  if (countriesError) {
    return <Error setError={setErr} error={countriesError} />;
  }

  return (
    <Form id="edit-country" onSubmit={handleSubmit}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success">
          Country edited
        </Alert>
      </Snackbar>
      <Grid item>
        <Typography variant="h6">Edit country</Typography>
      </Grid>
      <Error setError={setErr} text={err} error={updateCountryError} />
      <Grid item>
        <FormControl sx={{ m: 1, minWidth: 230 }}>
          <InputLabel id="country-select">Country</InputLabel>
          <Select
            label="Country"
            name="country-select"
            labelId="country-select"
            value={data.countries.find(({ id }) => id === editedCountry.id)?.id ?? ''}
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
                  ?.description?.slice(0, 15)
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
