import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Photo from '../Photo';
import Navbar from '../Navbar';
import GalleryDescription from './GalleryDescription';
import Error from '../common/Error';
import Loader from '../common/Loader';
import { PHOTOS } from '../../graphql';
import { usePageBottom } from '../../hooks';
import { buildQueryVariables } from '../../utils';

function Gallery() {
  const [page, setPage] = useState(2);
  const { bottom } = usePageBottom(200);

  const location = useLocation();
  const match = useRouteMatch();

  // Build a query depending on url.
  const variables = buildQueryVariables(location, match);
  const { data, loading, error, fetchMore } = useQuery(PHOTOS, { variables });

  // Pull out the hasNextPage variable.
  const hasNextPage = data?.photos?.pageInfo?.hasNextPage;

  /**
   * Fetches more photos while there is more and when bottom
   * of the page has been reached.
   */
  useEffect(() => {
    function fetchMorePhotos() {
      fetchMore({
        variables: { ...variables, page },
        updateQuery: (prev, { fetchMoreResult }) =>
          !fetchMoreResult
            ? prev
            : {
                ...fetchMoreResult,
                photos: {
                  ...fetchMoreResult.photos,
                  docs: [...prev.photos.docs, ...fetchMoreResult.photos.docs],
                },
              },
      });

      setPage(page + 1);
    }

    if (bottom && hasNextPage) {
      fetchMorePhotos();
    }
    // eslint-disable-next-line
  }, [bottom, hasNextPage]);

  // Handle the error, loading and lack of photos cases.
  if (error) return <Error text="Cannot load the gallery" />;
  if (loading) return <Loader loading={loading} />;
  if (data.photos.docs.length === 0)
    return <Error text={`No photos found for ${variables.country}`} />;

  // Build photo items.
  const photoItems = data.photos.docs.map(photo => (
    <Photo key={photo.id} {...photo} />
  ));

  return (
    <article className="gallery u-mb-small">
      <GalleryDescription {...variables} />
      {photoItems}
      <Navbar />
    </article>
  );
}

export default Gallery;
