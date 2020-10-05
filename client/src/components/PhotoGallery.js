import React from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import PhotoGalleryDescription from './PhotoGalleryDescription';
import Loader from './Loader';
import Errors from './Errors';
import Navbar from './Navbar';
import { PHOTOS } from '../graphql/queries';
import { buildQueryVariables } from '../utils';

function PhotoGallery() {
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

  // Build gallery items.
  const galleryItems = data.photos.docs.map(photo => (
    <PhotoItem key={photo.id} {...photo} />
  ));

  return (
    <article className="gallery u-mb-small">
      <PhotoGalleryDescription countryName={country} featured={featured} />
      {galleryItems}
      <Navbar />
    </article>
  );
}

export default PhotoGallery;
