import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Button, Error, Form } from '../common';
import { ProgressBar } from '../ProgressBar';
import { useLocalStorage, useUpload } from '../../hooks';
import { COUNTRIES, CountriesData } from '../../graphql';
import { Errors } from '../../constants';
import {
  Alert,
  Badge,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  Radio,
  RadioGroup,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { UploadFileRounded } from '@mui/icons-material';
import { theme } from '../../constants';
interface NewPhotoState {
  country: string;
  region: string;
  caption: string;
  featured: boolean;
  files: File[];
}

export const AddPhotoForm: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [err, setErr] = useState<Errors | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const uploadRef = useRef<HTMLInputElement | null>(null);

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
    } else if (!newPhoto.files?.['0']?.name) {
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

      handleClick();
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
  const countryRadioButtons = countries.map(({ name, id }) => (
    <FormControlLabel
      color="primary"
      key={id}
      value={name}
      label={name}
      control={
        <Radio
          size="small"
          sx={{
            '&.Mui-checked': {
              '&, & + .MuiFormControlLabel-label': {
                color: theme.palette.primary.main,
              },
            },
          }}
        />
      }
    />
  ));

  /**
   * Handles select event.
   * 1. Find the country with the name equal to the input value.
   * 2. Set the editedCountry state variable.
   */
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPhoto({ ...newPhoto, country: e.target.value });
  };

  // Photos chosen message.
  const n = newPhoto.files.length;

  return (
    <Form id="add-photo" onSubmit={handleSubmit}>
      <Snackbar open={loading} onClose={handleClose}>
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Alert variant="filled" onClose={handleClose} severity="info">
            Uploading {n} photo(s) from {newPhoto.country}...
            <LinearProgress
              color="inherit"
              variant="indeterminate"
              sx={{ marginTop: 0.5 }}
            />
          </Alert>
        </Grid>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success">
          Photos added
        </Alert>
      </Snackbar>
      <Grid item position="absolute" bottom={30} left={20}>
        <ProgressBar loading={loading} value={progress} max={newPhoto.files.length} />
      </Grid>
      <Grid item>
        <Typography variant="h6">Add photo</Typography>
      </Grid>
      <Error setError={setErr} text={err} error={getUrlError ?? uploadError} />
      <Grid item>
        <FormControl disabled={loading}>
          <RadioGroup
            name="country-radio"
            value={newPhoto.country}
            onChange={handleSelect}
            row
            style={{ justifyContent: 'space-evenly' }}
          >
            {countryRadioButtons}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          id="add-photo-country-input"
          name="country"
          type="text"
          label="Country"
          value={newPhoto.country}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <TextField
          id="add-photo-region-input"
          name="region"
          type="text"
          label="Region"
          value={newPhoto.region}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <TextField
          id="add-photo-caption-input"
          name="caption"
          type="text"
          label="Caption"
          value={newPhoto.caption}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Grid>

      <Grid
        container
        mt={2}
        ml={5}
        width="auto"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item xs={7}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                name="featured"
                checked={newPhoto.featured}
                onChange={handleInputChange}
              />
            }
            label="Featured"
            disabled={loading}
          />
        </Grid>
        <Grid item xs={5} className="file-upload">
          <IconButton
            size="large"
            color="primary"
            className="icon"
            disabled={loading}
            onClick={() => uploadRef.current?.click()}
          >
            <Badge badgeContent={n} color="primary">
              <UploadFileRounded fontSize="large" />
            </Badge>
          </IconButton>
          <input
            ref={uploadRef}
            id="add-photo-file-input"
            name="files"
            type="file"
            accept="image/*"
            multiple
            disabled={loading}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid item justifyContent="center" alignItems="center" flexDirection="row">
        <Button id="add-photo-submit-button" loading={loading} submit variant="contained">
          Upload
        </Button>
      </Grid>
    </Form>
  );
};
