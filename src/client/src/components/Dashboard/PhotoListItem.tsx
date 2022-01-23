import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';
import { AWS_URL } from '../../constants';
import { DeletePhotoData, DeletePhotoVars, DELETE_PHOTO } from '../../graphql';
import { Button, Modal } from '../common';
import { PhotoEdit } from '../Photo/PhotoEdit';
import { PhotoImage } from '../Photo/PhotoImage';

interface PhotoListItemProps {
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
    size: number;
  };
  author: {
    username: string;
  };
}

export const PhotoListItem: React.FC<PhotoListItemProps> = ({
  id,
  country,
  region,
  caption,
  featured,
  clicks,
  upload,
  author,
}) => {
  // Displays confirmation when deleting a photo.
  const [deletePopup, setDeletePopup] = useState(false);
  // Displays the edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  // Complete image url.
  const url = `${AWS_URL}${upload.key}`;

  // Apollo client used to reset the store.
  const client = useApolloClient();

  const [deletePhoto, { loading }] = useMutation<DeletePhotoData, DeletePhotoVars>(
    DELETE_PHOTO,
    { variables: { id }, onCompleted: client.resetStore }
  );

  // Closes the delete confirmation after a while.
  useEffect(() => {
    setTimeout(() => setDeletePopup(false), 8000);
  });

  return (
    <tr className="table-row">
      <td className="table-data">
        <img
          // Prevent downloading images through context menu.
          style={{ height: 50 }}
          className="table-data-image"
          onContextMenu={e => e.preventDefault()}
          src={url}
          alt={country.name}
        />
      </td>
      <td className="table-data">{country.name}</td>
      <td className="table-data">{region}</td>
      <td className="table-data">{caption}</td>
      <td className="table-data">{featured ? 'Yes' : 'No'}</td>
      <td className="table-data">{clicks}</td>
      <td className="table-data table-data-actions">
        {deletePopup ? (
          <>
            Sure?
            <Button
              className="u-danger"
              id="delete-photo-list-item-yes"
              onClick={() => {
                setDeletePopup(false);
                deletePhoto();
              }}
            >
              Yes
            </Button>
            <Button id="delete-photo-list-item-no" onClick={() => setDeletePopup(false)}>
              No
            </Button>
          </>
        ) : (
          <>
            <Button
              id="delete-photo-list-item"
              onClick={() => setDeletePopup(true)}
              loading={loading}
            >
              Delete
            </Button>
            <Button id="edit-photo-list-item" onClick={() => setShowEditModal(true)}>
              Edit
            </Button>
          </>
        )}
        <Modal
          title="Edit photo"
          toggle={() => setShowEditModal(false)}
          isOpen={showEditModal}
        >
          <PhotoEdit
            id={id}
            country={country}
            region={region}
            caption={caption}
            featured={featured}
          />
        </Modal>
      </td>
    </tr>
  );
};
