import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({count, setCurrPage}) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} shape="rounded" onChange={(event, page)=>{
        setCurrPage(page);
      }} />
      {/*<Pagination count={10} variant="outlined" shape="rounded" />*/}
    </Stack>
  );
}