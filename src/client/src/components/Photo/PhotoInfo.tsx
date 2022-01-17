import React from 'react';

interface PhotoInfoProps {
  id: string;
  country: {
    name: string;
  };
  region: string;
  caption: string;
  featured: boolean;
  clicks: number;
  upload: {
    key: string;
  };
}

export const PhotoInfo: React.FC<PhotoInfoProps> = ({
  country,
  region,
  caption,
  featured,
  clicks,
  id,
  upload,
}) => (
  <section className="gallery-caption-content">
    <p className="gallery-caption-description">
      <strong>AWS key:</strong> {upload.key}
    </p>
    <p className="gallery-caption-description">
      <strong>ID:</strong> {id}
    </p>
    <hr />
    <p className="gallery-caption-description">
      <strong>Country:</strong> {country.name}
    </p>
    <p className="gallery-caption-description">
      <strong>Region:</strong> {region}
    </p>
    <p className="gallery-caption-description">
      <strong>Caption:</strong> {caption}
    </p>
    <p className="gallery-caption-description">
      <strong>Clicks:</strong> {clicks}
    </p>
    <p className="gallery-caption-description">
      <strong>Featured:</strong> {featured ? 'Yes' : 'No'}
    </p>
  </section>
);
