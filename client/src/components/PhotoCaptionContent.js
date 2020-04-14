import React from 'react';

function PhotoCaptionContent({ country, caption }) {
  return (
    <section className="gallery-caption-content">
      <p className="gallery-caption-description">{caption}</p>
      <p className="gallery-caption-title">{country.name}</p>
    </section>
  );
}

export default PhotoCaptionContent;
