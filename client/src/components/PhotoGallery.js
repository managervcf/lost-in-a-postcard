import React from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';

import PhotoItem from './PhotoItem';
import PhotoGalleryDescription from './PhotoGalleryDescription';
import LoaderBlock from './LoaderBlock';
import ErrorMessage from './ErrorMessage';

import { PHOTOS } from '../graphql/queries';
import { shuffle, buildQueryVariables } from '../utils';

const PhotoGallery = () => {
  // Use location and match object.
  let location = useLocation();
  let match = useRouteMatch();

  // Build a query depending on url.
  let variables = buildQueryVariables(location, match);
  let { country, featured } = variables;

  // Query graphql backend.
  const { data, loading, error } = useQuery(PHOTOS, { variables });

  // Handle error, loading and lack of photos.
  if (error) return <ErrorMessage text="Cannot load gallery :(" />;
  if (loading) return <LoaderBlock size={5} loading={loading} />;
  if (data.photos.docs.length === 0)
    return <ErrorMessage text="No photos found :(" />;

  // Build gallery items on shuffled array.
  let galleryItems = shuffle(data.photos.docs).map(photo => (
    <PhotoItem key={photo.id} {...photo} />
  ));

  return (
    <section className="gallery">
      <PhotoGalleryDescription countryName={country} featured={featured} />
      {galleryItems}
    </section>
  );
};

export default PhotoGallery;
