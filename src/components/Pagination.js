import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({size, setCurrPage}) {
  return (
    <Stack spacing={2}>
      <Pagination count={size-1} shape="rounded" onChange={(event, page)=>{
        setCurrPage(page);
      }} />
      {/*<Pagination count={10} variant="outlined" shape="rounded" />*/}
    </Stack>
  );
}