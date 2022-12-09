import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({size}) {
  return (
    <Stack spacing={2}>
      <Pagination count={size} shape="rounded" />
      {/*<Pagination count={10} variant="outlined" shape="rounded" />*/}
    </Stack>
  );
}