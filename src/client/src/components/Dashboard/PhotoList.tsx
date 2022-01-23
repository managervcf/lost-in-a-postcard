import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { FETCH_LIMIT } from '../../constants';
import { PHOTOS, PhotosData, PhotosVars } from '../../graphql';
import { Button } from '../common';
import { PhotoListItem } from './PhotoListItem';

export const PhotoList = () => {
  const [open, setOpen] = useState(false);

  const { data, loading } = useQuery<PhotosData, PhotosVars>(PHOTOS, {
    variables: { limit: FETCH_LIMIT },
  });

  const photoList = data?.photos.docs.map(photo => <PhotoListItem {...photo} />);

  // const photoList = (
  //   <ul>
  //     <li>photo1</li>
  //     <li>photo2</li>
  //     <li>photo3</li>
  //   </ul>
  // );

  return (
    <>
      <Button
        id="list-all-photos-button"
        loading={loading}
        onClick={() => setOpen(open => !open)}
      >
        {open ? 'Hide' : 'Show'} all photos ({data?.photos.docs.length})
      </Button>
      {open && (
        <table className="table">
          <tr className="table-row">
            <th className="table-header">Preview</th>
            <th className="table-header">Country</th>
            <th className="table-header">Region</th>
            <th className="table-header">Caption</th>
            <th className="table-header">Featured</th>
            <th className="table-header">Clicks</th>
            <th className="table-header">Actions</th>
          </tr>
          {photoList}
        </table>
      )}
    </>
  );
};
