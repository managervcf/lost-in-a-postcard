import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { useMatch } from 'react-router-dom';
import { Photo } from '../Photo';
import { GalleryDescription } from './GalleryDescription';
import { Error, Loader } from '../common';
import { PHOTOS, PhotosData, PhotosVars } from '../../graphql';
import { usePageBottom } from '../../hooks';
import { buildQueryVars } from '../../utils';

export const Gallery: React.FC = () => {
  const { bottom } = usePageBottom(200);
  const match = useMatch({ path: '/photos/:country/*' });

  // Build a query depending on url.
  const variables = buildQueryVars(match);

  const { data, loading, error, fetchMore } = useQuery<PhotosData, PhotosVars>(PHOTOS, {
    variables,
  });

  /**
   * Fetches more photos while there is more and when bottom
   * of the page has been reached.
   */
  useEffect(() => {
    if (!data?.photos) {
      return;
    }

    // Destructure `nextPage` and `hasNextPage`.
    const { nextPage, hasNextPage } = data?.photos;

    if (bottom && hasNextPage) {
      fetchMore({
        variables: { ...variables, page: nextPage },
        updateQuery: (oldData, { fetchMoreResult: newData }) =>
          !newData
            ? oldData
            : {
                ...newData,
                photos: {
                  ...newData.photos,
                  docs: [...oldData.photos.docs, ...newData.photos.docs],
                },
              },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottom]);

  // Handle the error, loading and lack of photos cases.
  if (loading) {
    return <Loader loading={loading} />;
  }

  if (data?.photos.docs.length === 0) {
    return <Error text={`No photos found for ${variables.country}`} />;
  }

  if (error) {
    return <Error text="Cannot load the gallery" />;
  }

  return (
    <article className="gallery">
      <GalleryDescription {...variables} />
      {data?.photos.docs.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
    </article>
  );
};
