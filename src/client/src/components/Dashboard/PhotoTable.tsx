import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box } from '@mui/system';
import { Dialog, DialogContent, Grid } from '@mui/material';
import { AWS_URL, FETCH_LIMIT, ROW_OPTIONS } from '../../constants';
import { formatBytes, scrollToTop } from '../../utils';
import { PhotoEdit } from '../Photo/PhotoEdit';
import { Collapse, Delete, Featured, IncrementClicks } from '../common';
import { Photo, PHOTOS, PhotosData, PhotosVars } from '../../graphql';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridToolbar,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export const PhotoTable = () => {
  const [enlarged, setEnlarged] = useState<string | null>(null);

  const { data, loading } = useQuery<PhotosData, PhotosVars>(PHOTOS, {
    variables: { limit: FETCH_LIMIT },
    fetchPolicy: 'cache-first',
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
      minWidth: 120,
      maxWidth: 160,
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
      renderCell: ({ row }: GridRenderCellParams<Photo['featured'], Photo>) => (
        <Featured id={row.id} featured={row.featured} />
      ),
    },
    {
      field: 'clicks',
      headerName: 'Clicks',
      width: 110,
      renderCell: ({ value, row }: GridRenderCellParams<Photo['clicks'], Photo>) => (
        <Grid container flexDirection="row" alignItems="center">
          <IncrementClicks
            id={row.id}
            clicks={row.clicks}
            incrementBy={-1}
            size="small"
          />
          {value}
          <IncrementClicks id={row.id} clicks={row.clicks} incrementBy={1} size="small" />
        </Grid>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: ({ row }: GridRenderCellParams<any, Photo>) => (
        <>
          <PhotoEdit {...row} />
          <Delete id={row.id} trashIcon />
        </>
      ),
    },
  ];

  return (
    <Grid container justifyContent="center">
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
