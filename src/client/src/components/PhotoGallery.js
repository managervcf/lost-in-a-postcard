import React from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';

import PhotoItem from './PhotoItem';
import PhotoGalleryDescription from './PhotoGalleryDescription';
import GalleryLayout from './GalleryLayout';
import LoaderBlock from './LoaderBlock';
import ErrorMessage from './ErrorMessage';

import { PHOTOS } from '../graphql/queries';
import { shuffle, buildQueryVariables } from '../utils';

const PhotoGallery = () => {
  // Use location and match object.
  const location = useLocation();
  const match = useRouteMatch();

  // Build a query depending on url.
  let variables = buildQueryVariables(location, match);

  // Query graphql backend.
  const response = useQuery(PHOTOS, { variables });

  const { data, loading, error } = response;

  // Handle error, loading and lack of photos.
  if (error) return <ErrorMessage text="Cannot load gallery :(" />;
  if (loading) return <LoaderBlock size={5} loading={loading} />;
  if (data.photos.docs.length === 0)
    return <ErrorMessage text="No photos found :(" />;

  // Shuffle array so the gallery is different each time.
  let shuffledPhotos = shuffle(data.photos.docs);
  console.log('Shuffled photos: \n', shuffledPhotos);

  // Build gallery items.
  let galleryItems = shuffledPhotos.map(photo => (
    <PhotoItem key={photo.id} {...photo} />
  ));

  return (
    <section className="gallery">
      <PhotoGalleryDescription
        countryName={query.country}
        featured={query.featured}
      />
      <GalleryLayout galleryItems={galleryItems} />
    </section>
  );
};

export default PhotoGallery;
