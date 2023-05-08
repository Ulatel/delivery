import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function FilterSelect() {
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box>
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"NameAsc"}>A-Я</MenuItem>
          <MenuItem value={"NameDesc"}>Я-А</MenuItem>
          <MenuItem value={"PriceAsc"}>Сначала дорогие</MenuItem>
          <MenuItem value={"PriceDesc"}>Сначала дешёвые</MenuItem>
          <MenuItem value={"RatingAsc"}>Сначала популярные</MenuItem>
          <MenuItem value={"RatingDesc"}>Сначала непопулярные</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Box>
  );
}