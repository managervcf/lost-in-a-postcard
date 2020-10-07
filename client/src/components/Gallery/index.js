import React from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Error from '../common/Error';
import Loader from '../common/Loader';
import Navbar from '../Navbar';
import GalleryDescription from './GalleryDescription';
import Photo from '../Photo';
import withAnimation from '../../wrappers/withAnimation';
import { PHOTOS } from '../../graphql';
import { buildQueryVariables } from '../../utils';

function Gallery() {
  // Use location and match object.
  const location = useLocation();
  const match = useRouteMatch();

  // Build a query depending on url.
  const variables = buildQueryVariables(location, match);

  const { data, loading, error } = useQuery(PHOTOS, { variables });

  // Handle the error, loading and lack of photos cases.
  if (error) return <Error text="Cannot load the gallery :(" />;
  if (loading) return <Loader loading={loading} />;
  if (data.photos.docs.length === 0)
    return <Error text="No photos found  :(" />;

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

export default withAnimation(Gallery);
