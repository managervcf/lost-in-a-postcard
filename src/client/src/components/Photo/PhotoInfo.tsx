import React from 'react';

interface PhotoInfoProps {
  country: {
    name: string;
  };
  region: string;
  caption: string;
  featured: boolean;
  clicks: number;
}

export const PhotoInfo: React.FC<PhotoInfoProps> = ({
  country,
  region,
  caption,
  featured,
  clicks,
}) => (
  <section className="gallery-caption-content">
    <p className="gallery-caption-title">{caption}</p>
    <p className="gallery-caption-description">
      {region ? `${region}, ` : ''}
      {country?.name}
    </p>
    <p className="gallery-caption-description">
      Clicks: <strong>{clicks}</strong>
    </p>
    {featured && <p className="gallery-caption-description">Featured</p>}
  </section>
);
