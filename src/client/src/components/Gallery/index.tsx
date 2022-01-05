import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useMatch } from 'react-router-dom';
import { Photo } from '../Photo';
import { GalleryDescription } from './GalleryDescription';
import { Button, Error, Loader } from '../common';
import { PHOTOS, PhotosData, PhotosVars } from '../../graphql';
import { usePageBottom, usePageTop } from '../../hooks';
import { buildQueryVars, groupPhotos, shuffle } from '../../utils';
import { Photo as IPhoto } from '../../graphql';
import { DISPLAY_LIMIT } from '../../constants';

export const Gallery: React.FC = () => {
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>([]);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const { bottom } = usePageBottom(100);
  const { top } = usePageTop(500);

  const match = useMatch({ path: '/photos/:country/*' });

  // Build a query depending on url.
  const variables = buildQueryVars(match);
  const { data, loading, error } = useQuery<PhotosData, PhotosVars>(PHOTOS, {
    variables,
  });

  /**
   * Set all photos.
   */
  useEffect(() => {
    setAllPhotos(data?.photos.docs ?? []);
  }, [data?.photos.docs]);

  /**
   * Set photos to display.
   */
  useEffect(() => {
    setPhotos(allPhotos.slice(0, DISPLAY_LIMIT));
  }, [allPhotos]);

  /**
   * Group all photos based on `match`.
   */
  useEffect(() => {
    if (match?.params.country === 'all') {
      setAllPhotos(photos => shuffle(photos));
    } else {
      setAllPhotos(photos => groupPhotos(photos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /**
   * Load more photos when bottom of the page is reached.
   */
  useEffect(() => {
    if (bottom) {
      setPhotos(photos => allPhotos.slice(0, photos.length + DISPLAY_LIMIT));
    }
  }, [bottom, allPhotos]);

  // Handle the error, loading and lack of photos cases.
  if (loading) {
    return <Loader loading={loading} />;
  }

  if (allPhotos.length === 0) {
    return (
      <Error
        text={`No photos found${variables.country ? ` for ${variables.country}` : ''}`}
      />
    );
  }

  if (error) {
    return <Error text="Cannot load the gallery" />;
  }

  return (
    <article className="gallery">
      <GalleryDescription {...variables} />
      {photos.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
      {!top && (
        <Button
          id="scroll-up-button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          primary
        >
          &uarr;
        </Button>
      )}
    </article>
  );
};
