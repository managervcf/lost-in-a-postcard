import { useMutation, useQuery } from '@apollo/react-hooks';
import { useMemo, useState } from 'react';
import { AWS_URL, FETCH_LIMIT, ROW_OPTIONS } from '../../constants';
import {
  COUNTRIES,
  DeletePhotoData,
  DeletePhotoVars,
  DELETE_PHOTO,
  Photo,
  PHOTOS,
  PhotosData,
  PhotosVars,
} from '../../graphql';
import { Collapse, IncrementClicksButton } from '../common';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridToolbar,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Snackbar,
} from '@mui/material';
import { Box } from '@mui/system';
import { formatBytes, scrollToTop } from '../../utils';
import { DeleteForever } from '@mui/icons-material';
import { PhotoEdit } from '../Photo/PhotoEdit';

export const PhotoTable = () => {
  const [enlarged, setEnlarged] = useState<string | null>(null);
  const [deletedPhotoId, setDeletedPhotoId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { data, loading } = useQuery<PhotosData, PhotosVars>(PHOTOS, {
    variables: { limit: FETCH_LIMIT },
    fetchPolicy: 'cache-first',
  });

  const [deletePhoto, { loading: deleteLoading }] = useMutation<
    DeletePhotoData,
    DeletePhotoVars
  >(DELETE_PHOTO, {
    refetchQueries: [
      { query: PHOTOS, variables: { limit: FETCH_LIMIT } },
      { query: COUNTRIES },
    ],
    onCompleted: () => {
      setDeletedPhotoId(null);
      handleClick();
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
      valueGetter: ({ row }: GridValueGetterParams<any, Photo>) =>
        allPhotos.findIndex(({ id }) => id === row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 200,
      hide: true,
    },
    {
      field: 'upload',
      headerName: 'Preview',
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      renderCell: ({ value, row }: GridRenderCellParams<Photo['upload'], Photo>) => (
        <>
          <Box
            onClick={() => setEnlarged(row.id)}
            component="img"
            loading="lazy"
            sx={{ width: '100%' }}
            // Prevent downloading images through context menu.
            onContextMenu={(e: React.MouseEvent<HTMLImageElement>) => e.preventDefault()}
            srcSet={`${AWS_URL}${value.key}`}
            alt={row.country.name}
          />
          <Dialog open={enlarged === row.id} onClose={() => setEnlarged(null)}>
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
                srcSet={`${AWS_URL}${value.key}`}
                alt={row.country.name}
              />
            </DialogContent>
          </Dialog>
        </>
      ),
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 85,
      type: 'number',
      valueGetter: ({ row }: GridValueGetterParams<undefined, Photo>) => row.upload.size,
      valueFormatter: ({ value }: GridValueFormatterParams) =>
        formatBytes(value as number),
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      minWidth: 100,
      valueGetter: ({ value }: GridValueGetterParams<Photo['country'], Photo>) =>
        value.name,
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 2,
      minWidth: 100,
    },
    {
      field: 'caption',
      headerName: 'Caption',
      flex: 2,
      minWidth: 100,
    },
    {
      field: 'featured',
      headerName: 'Featured',
      flex: 0.5,
      minWidth: 90,
      maxWidth: 110,
      valueFormatter: ({ value }: GridValueFormatterParams) => (value ? 'Yes' : 'No'),
    },
    {
      field: 'clicks',
      headerName: 'Clicks',
      width: 110,
      renderCell: ({ value, row }: GridRenderCellParams<Photo['clicks'], Photo>) => (
        <Grid container flexDirection="row" alignItems="center">
          <IncrementClicksButton id={row.id} incrementBy={-1} size="small" />
          {value}
          <IncrementClicksButton id={row.id} incrementBy={1} size="small" />
        </Grid>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: ({ row }: GridRenderCellParams<any, Photo>) => (
        <>
          <PhotoEdit {...row} disabled={deleteLoading && deletedPhotoId === row.id} />
          <IconButton
            id="delete-photo-list-item"
            color="error"
            onClick={() => {
              setDeletedPhotoId(row.id);
              deletePhoto({ variables: { id: row.id } });
            }}
            disabled={deleteLoading && deletedPhotoId === row.id}
          >
            <DeleteForever />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Grid container justifyContent="center">
      <Backdrop sx={{ zIndex: 10 }} open={deleteLoading}>
        <CircularProgress color="primary" size={65} />
      </Backdrop>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          icon={<DeleteForever />}
          variant="filled"
          onClose={handleClose}
          severity="success"
        >
          Photo deleted
        </Alert>
      </Snackbar>
      <Grid item xl={9} md={11} xs={12} m={1}>
        <Collapse
          title={loading ? 'Loading photos...' : `List of ${allPhotos.length} photos `}
          disabled={loading}
        >
          <DataGrid
            hideFooterSelectedRowCount={false}
            columns={columns}
            rows={allPhotos}
            initialState={{
              pagination: {
                pageSize: ROW_OPTIONS[0],
              },
            }}
            onPageChange={() => scrollToTop(270)}
            pagination
            autoPageSize={false}
            rowsPerPageOptions={ROW_OPTIONS}
            loading={loading}
            autoHeight
            components={{ Toolbar: GridToolbar }}
          />
        </Collapse>
      </Grid>
    </Grid>
  );
};
