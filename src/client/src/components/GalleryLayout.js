import React from 'react';

const GalleryLayout = ({ galleryItems }) => {
  const columns = galleryItems
    // Create an array of values in 4 columns.
    .reduce(
      (columns, galleryItem, index) => {
        columns[index % 4].push(galleryItem);
        return columns;
      },
      [[], [], [], []]
    )
    // Create column components with a class.
    .map(column => <div className="column">{column}</div>)
    // Filter out empty columns.
    .filter(column => column.length !== 0);

  return <div className="row">{columns}</div>;
};

export default GalleryLayout;
