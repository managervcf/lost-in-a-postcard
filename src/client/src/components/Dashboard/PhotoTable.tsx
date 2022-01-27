import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { useMemo, useState } from 'react';
import { AWS_URL, FETCH_LIMIT, ROW_OPTIONS } from '../../constants';
import {
  DeletePhotoData,
  DeletePhotoVars,
  DELETE_PHOTO,
  Photo,
  PHOTOS,
  PhotosData,
  PhotosVars,
} from '../../graphql';
import { Collapse } from '../common';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridToolbar,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Dialog, DialogContent, Grid, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { formatBytes } from '../../utils';
import { DeleteForever } from '@mui/icons-material';
import { PhotoEdit } from '../Photo/PhotoEdit';

export const PhotoTable = () => {
  const [enlarged, setEnlarged] = useState<string | null>(null);
  const [deletedPhotoId, setDeletedPhotoId] = useState<string | null>(null);
  const { data, loading } = useQuery<PhotosData, PhotosVars>(PHOTOS, {
    variables: { limit: FETCH_LIMIT },
    fetchPolicy: 'cache-first',
  });
  // Apollo client used to reset the store.
  const client = useApolloClient();

  const [deletePhoto, { loading: deleteLoading }] = useMutation<
    DeletePhotoData,
    DeletePhotoVars
  >(DELETE_PHOTO, {
    onCompleted: () => {
      setDeletedPhotoId(null);
      client.resetStore();
    },
  });

  const allPhotos = useMemo(() => data?.photos.docs ?? [], [data?.photos.docs]);

  /**
   * Table columns
   */
  const columns: GridColumns = [
    {
      field: 'number',
      headerName: 'No.',
      width: 50,
      hide: true,
      valueGetter: (item: GridValueGetterParams<any, Photo>) =>
        allPhotos.findIndex(({ id }) => id === item.row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 200,
      hide: true,
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
      minWidth: 100,
      hide: true,
      valueGetter: (item: GridValueGetterParams<Photo['author'], Photo>) =>
        item.value.username,
    },
    {
      field: 'upload',
      headerName: 'Preview',
      flex: 1,
      minWidth: 80,
      renderCell: (item: GridRenderCellParams<Photo['upload'], Photo>) => (
        <>
          <Box
            onClick={() => setEnlarged(item.row.id)}
            component="img"
            loading="lazy"
            sx={{ width: '100%' }}
            // Prevent downloading images through context menu.
            onContextMenu={(e: React.MouseEvent<HTMLImageElement>) => e.preventDefault()}
            src={`${AWS_URL}${item.value.key}`}
            alt={item.row.country.name}
          />
          <Dialog open={enlarged === item.row.id} onClose={() => setEnlarged(null)}>
            <DialogContent>
              <Box
                component="img"
                sx={{
                  height: '100%',
                  width: '100%',
                  maxHeight: '70vh',
                  maxWidth: '70vh',
                }}
                loading="lazy"
                // Prevent downloading images through context menu.
                onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
                  e.preventDefault()
                }
                src={`${AWS_URL}${item.value.key}`}
                alt={item.row.country.name}
              />
            </DialogContent>
          </Dialog>
        </>
      ),
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 100,
      type: 'number',
      valueGetter: (item: GridValueGetterParams<undefined, Photo>) =>
        item.row.upload.size,
      valueFormatter: (item: GridValueFormatterParams) =>
        formatBytes(item.value as number),
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      minWidth: 100,
      valueGetter: (item: GridValueGetterParams<Photo['country'], Photo>) =>
        item.value.name,
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'caption',
      headerName: 'Caption',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'featured',
      headerName: 'Featured',
      flex: 1,
      minWidth: 60,
      valueFormatter: (item: GridValueFormatterParams) => (item.value ? 'Yes' : 'No'),
    },
    {
      field: 'clicks',
      headerName: 'Clicks',
      flex: 1,
      minWidth: 60,
    },
    {
      field: 'actions',
      headerName: 'Edit/Delete',
      width: 110,
      renderCell: (item: GridRenderCellParams<any, Photo>) => (
        <>
          <PhotoEdit {...item.row} />
          <IconButton
            id="delete-photo-list-item"
            color="error"
            onClick={() => {
              setDeletedPhotoId(item.row.id);
              deletePhoto({ variables: { id: item.row.id } });
            }}
            disabled={deleteLoading && deletedPhotoId === item.row.id}
          >
            <DeleteForever />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Collapse
          title={loading ? 'Loading photos...' : `List of ${allPhotos.length} photos `}
          disabled={loading}
        >
          <DataGrid
            columns={columns}
            rows={allPhotos}
            initialState={{
              pagination: {
                pageSize: ROW_OPTIONS[0],
              },
            }}
            pagination
            autoPageSize={false}
            rowsPerPageOptions={ROW_OPTIONS}
            loading={loading || deleteLoading}
            autoHeight
            components={{ Toolbar: GridToolbar }}
          />
        </Collapse>
      </Grid>
    </Grid>
  );
};
