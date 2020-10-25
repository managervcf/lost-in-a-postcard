import React from 'react';

interface PhotoInfoProps {
  country: {
    name: string;
  };
  caption: string;
  featured: boolean;
}

function PhotoInfo({ country, caption, featured }: PhotoInfoProps) {
  return (
    <section className="gallery-caption-content">
      <p className="gallery-caption-title">{caption}</p>
      <p className="gallery-caption-description">{country?.name}</p>
      {featured && <p className="gallery-caption-description">Featured</p>}
    </section>
  );
}

export default PhotoInfo;
