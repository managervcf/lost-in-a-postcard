import React from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import PhotoGalleryDescription from './PhotoGalleryDescription';
import LoaderBlock from './LoaderBlock';
import ErrorMessage from './ErrorMessage';
import { PHOTOS } from '../graphql/queries';
import { buildQueryVariables } from '../utils';

function PhotoGallery() {
  // Use location and match object.
  const location = useLocation();
  const match = useRouteMatch();

  // Build a query depending on url.
  const { country, featured } = buildQueryVariables(location, match);

  // Query graphql backend.
  const { data, loading, error } = useQuery(PHOTOS, {
    variables: { country, featured },
  });

  // Handle error, loading and lack of photos.
  if (error) return <ErrorMessage text="Cannot load gallery :(" />;
  if (loading) return <LoaderBlock size={5} loading={loading} />;
  if (data.photos.docs.length === 0)
    return <ErrorMessage text="No photos found :(" />;

  // Build gallery items on shuffled array.
  const galleryItems = data.photos.docs.map(photo => (
    <PhotoItem key={photo.id} {...photo} />
  ));

  return (
    <article className="gallery">
      <PhotoGalleryDescription countryName={country} featured={featured} />
      {galleryItems}
    </article>
  );
}

export default PhotoGallery;
