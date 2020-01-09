import React from 'react';

const PhotoCaptionContent = ({ country, caption }) => (
  <div className="gallery-caption-content">
    <span className="gallery-caption-description">{caption}</span>
    <span className="gallery-caption-title">{country.name}</span>
  </div>
);

export default PhotoCaptionContent;
