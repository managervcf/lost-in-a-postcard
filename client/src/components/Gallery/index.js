import React from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Errors from '../common/Errors';
import Loader from '../common/Loader';
import Navbar from '../Navbar';
import GalleryDescription from './GalleryDescription';
import Photo from '../Photo';
import { PHOTOS } from '../../graphql';
import { buildQueryVariables } from '../../utils';

function Gallery() {
  // Use location and match object.
  const location = useLocation();
  const match = useRouteMatch();

  // Build a query depending on url.
  const { country, featured } = buildQueryVariables(location, match);

  const { data, loading, error } = useQuery(PHOTOS, {
    variables: { country, featured },
  });

  // Handle the error, loading and lack of photos cases.
  if (error) return <Errors text="Cannot load the gallery :(" />;
  if (loading) return <Loader loading={loading} />;
  if (data.photos.docs.length === 0)
    return <Errors text="No photos found  :(" />;

  // Build photo items.
  const photoItems = data.photos.docs.map(photo => (
    <Photo key={photo.id} {...photo} />
  ));

  return (
    <article className="gallery u-mb-small">
      <GalleryDescription countryName={country} featured={featured} />
      {photoItems}
      <Navbar />
    </article>
  );
}

export default Gallery;
