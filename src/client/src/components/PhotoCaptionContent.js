import React from 'react';
import { Link } from 'react-router-dom';

const PhotoCaptionContent = ({ country: { name }, caption }) => (
  <div className="gallery-caption-content">
    <span className="gallery-caption-title">
      <Link to={`/photos/${name.toLowerCase()}`}>{name}</Link>
    </span>
    <span className="gallery-caption-description">{caption}</span>
  </div>
);

export default PhotoCaptionContent;
