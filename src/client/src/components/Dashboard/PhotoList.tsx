import { useQuery } from '@apollo/react-hooks';
import { useEffect, useMemo, useState } from 'react';
import { FETCH_LIMIT, PHOTO_ITEM_LIMIT } from '../../constants';
import { Photo, PHOTOS, PhotosData, PhotosVars } from '../../graphql';
import { Button } from '../common';
import { PhotoListItem } from './PhotoListItem';

export const PhotoList = () => {
  const [open, setOpen] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [photoList, setPhotoList] = useState<Photo[]>([]);

  const { data, loading } = useQuery<PhotosData, PhotosVars>(PHOTOS, {
    variables: { limit: FETCH_LIMIT },
  });

  const allPhotos = useMemo(() => data?.photos.docs ?? [], [data?.photos.docs]);

  useEffect(() => {
    if (loadMore && open) {
      // Insert another batch of photos in `photoList`.
      setPhotoList(photoList => {
        setIsMore(allPhotos.length > photoList.length + PHOTO_ITEM_LIMIT);
        return allPhotos.slice(0, photoList.length + PHOTO_ITEM_LIMIT) ?? photoList;
      });

      setLoadMore(false);
    }
  }, [allPhotos, loadMore, open]);

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
        <>
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
            {photoList.map(photo => (
              <PhotoListItem {...photo} />
            ))}
          </table>
          {isMore && <Button onClick={() => setLoadMore(true)}>Load More</Button>}
        </>
      )}
    </>
  );
};
