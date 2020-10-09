import React from 'react';

function PhotoInfo({ country, caption, featured }) {
  return (
    <section className="gallery-caption-content">
      <p className="gallery-caption-title">{caption}</p>
      <p className="gallery-caption-description">{country?.name}</p>
      {featured && <p className="gallery-caption-description">Featured</p>}
    </section>
  );
}

export default PhotoInfo;
