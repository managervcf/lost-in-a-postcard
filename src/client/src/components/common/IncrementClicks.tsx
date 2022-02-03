import { useMutation } from '@apollo/react-hooks';
import {
  Add,
  Favorite,
  FavoriteBorder,
  Remove,
  ThumbDown,
  ThumbUp,
} from '@mui/icons-material';
import { Alert, Badge, IconButton, Snackbar } from '@mui/material';
import { useState } from 'react';
import { FETCH_LIMIT } from '../../constants';
import { ClickPhotoData, ClickPhotoVars, CLICK_PHOTO, PHOTOS } from '../../graphql';

interface IncrementClicksProps {
  id: string;
  clicks?: number;
  incrementBy?: number;
  size?: 'small' | 'medium' | 'large';
  disableMultiple?: boolean;
  heart?: boolean;
  disableSnackbar?: boolean;
}

export const IncrementClicks: React.FC<IncrementClicksProps> = ({
  id,
  clicks = 0,
  incrementBy = 1,
  size,
  disableMultiple = false,
  heart = false,
  disableSnackbar = false,
}) => {
  /**
   * Local storage version on a click.
   */
  // const { value: clicked, setter: setClicked } = useLocalStorage<boolean>(
  //   `photo_clicked_${id}|`,
  //   false
  // );
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [clickPhoto, { loading }] = useMutation<ClickPhotoData, ClickPhotoVars>(
    CLICK_PHOTO,
    {
      // refetchQueries: [{ query: PHOTOS, variables: { limit: FETCH_LIMIT } }],
      // awaitRefetchQueries: true,
    }
  );

  const handleClick = () => setOpen(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  /**
   * Handles the click event on the heart icon.
   */
  const handleHeartClick = () => {
    setClicked(true);

    if (clicked && disableMultiple) {
      return;
    }

    clickPhoto({ variables: { id, incrementBy } });
    handleClick();
  };

  /**
   * Disable decrementing when clicks are 0 or less, and increment by is negative.
   */
  const disableDecrementing = clicks <= 0 && incrementBy < 1 && !heart;

  return (
    <>
      {!disableSnackbar && (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            icon={incrementBy > 0 ? <ThumbUp /> : <ThumbDown />}
            variant="filled"
            onClose={handleClose}
            severity="success"
          >
            Photo {incrementBy > 0 ? 'incremeted' : 'decremented'} by{' '}
            {Math.abs(incrementBy)}{' '}
          </Alert>
        </Snackbar>
      )}
      <IconButton
        disabled={disableDecrementing || (loading && !heart)}
        size={size}
        color="primary"
        onClick={handleHeartClick}
      >
        {heart ? (
          <Badge color="primary" badgeContent={clicked ? clicks + 1 : null}>
            {clicked ? <Favorite /> : <FavoriteBorder />}
          </Badge>
        ) : incrementBy > 0 ? (
          <Add />
        ) : (
          <Remove />
        )}
      </IconButton>
    </>
  );
};
