import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

export default function PaginationRounded({pageid, count, setCurrPage, setURL}) {
  const nav = useNavigate();

  return (
    <Stack spacing={2}>
      <Pagination 
      count={count} 
      shape="rounded" 
      
      onChange={(event, page)=>{
        nav(`/?page=${page}`);
        setURL(new URLSearchParams([["page", page]]));
        setCurrPage(page);
      }} 
      page={pageid}/>
      {/*<Pagination count={10} variant="outlined" shape="rounded" />*/}
    </Stack>
  );
}