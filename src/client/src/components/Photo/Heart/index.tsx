import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { ClickPhotoData, ClickPhotoVars, CLICK_PHOTO } from '../../../graphql';
import { Box } from '@mui/system';
import { Badge, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface HeartProps {
  id: string;
  clicks: number;
}

export const Heart: React.FC<HeartProps> = ({ id, clicks }) => {
  /**
   * Local storage version on a click.
   */
  // const { value: clicked, setter: setClicked } = useLocalStorage<boolean>(
  //   `photo_clicked_${id}|`,
  //   false
  // );
  const [clicked, setClicked] = useState(false);

  const [clickPhoto] = useMutation<ClickPhotoData, ClickPhotoVars>(CLICK_PHOTO);

  /**
   * Handles the click event on the heart icon.
   * 1. Set the clicked state variable to true.
   * 2. If clicked is false, issue the clickPhoto mutation.
   */
  const handleHeartClick = () => {
    setClicked(true);

    if (!clicked) {
      clickPhoto({ variables: { id } });
    }
  };

  return (
    <Box
      position="absolute"
      bottom="1.5rem"
      right="1rem"
      display="flex"
      flexDirection="column"
    >
      <IconButton color="primary" onClick={handleHeartClick}>
        <Badge color="primary" badgeContent={clicked ? clicks + 1 : null}>
          {clicked ? <Favorite /> : <FavoriteBorder />}
        </Badge>
      </IconButton>
    </Box>
  );
};
