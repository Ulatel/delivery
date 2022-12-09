import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function LimitTags() {
  
  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={filters}
      getOptionLabel={(option) => option.title}
      defaultValue={[]}
      renderInput={(params) => (
        <TextField {...params} label="limitTags" placeholder="Favorites" />
      )}
      sx={{ minWidth: 300 }}
    />
  );
}

const filters = [
  { title: 'Wok', year: 1957 },
  { title: 'Pizza', year: 1994 },
  { title: 'Soup', year: 1972 },
  { title: 'Dessert', year: 1974 },
  { title: 'Drink', year: 2008 }
];