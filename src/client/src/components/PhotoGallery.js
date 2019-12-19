import React from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useRouteMatch } from 'react-router-dom';

import PhotoItem from './PhotoItem';
import PhotoGalleryDescription from './PhotoGalleryDescription';
import GalleryLayout from './GalleryLayout';
import LoaderBlock from './LoaderBlock';
import ErrorMessage from './ErrorMessage';

import { PHOTOS } from '../graphql/queries';
import { shuffle } from '../utils';

const PhotoGallery = () => {
    // Use location and match object.
    const location = useLocation();
    const match = useRouteMatch();

  // Build a query depending on url.
  let query = {};
  // If url match is not exact, pull out parameters.
  if (!match.isExact) {
    // If url contains featured, add featured = true as a variable.
    if (location.pathname === '/photos/featured') {
      query.featured = true;
    } else {
      // If url is not exact and it is not featured, add as country.
      query.country = location.pathname.replace(`${match.path}/`, '');
    }
  }

  // Query graphql backend.
  const response = useQuery(PHOTOS);
  console.log('GraphQL response:\n', response);
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
