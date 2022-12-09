import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LimitTags({setFilters}) {
  const [sort, setSort] = React.useState('');
  const [vegetarian, setVegeterian] = React.useState('');
  const [filt, setFilt] = React.useState([]);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  
  let str = "";

  return (
    <Box sx={{display: "flex",flexWrap: "wrap", gap: 2, flexFlow: "row wrap", alignItems: "stretch", justifyContent: "center"}}>
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={categories}
      getOptionLabel={(option) => option}
      defaultValue={[]}      
      value={filt}
      onChange={(e, values) => {setFilt(values)}} 

      renderInput={(params) => (
        <TextField {...params} label="limitTags" placeholder="Favorites" />
      )}
      sx={{ minWidth: 300 }}
    />


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

    <FormControlLabel control={<Switch/>} value={vegetarian} onChange={(e, value) => setVegeterian(value)} label="Вегетарианское" sx={{color: "grey",  minWidth: 120}}/>
    
    <Button variant='contained' type='submit' onClick={(e)=>{
      e.preventDefault();
      str="";
      let f='';
      if(sort) str+="&sorting="+sort;
      if(filt) 
        for(f in filt)
          str+="&categories="+filt[f];
      if(vegetarian) str+="&vegetarian=true";
      console.log(str);
      setFilters(str);
    }}>Применить</Button>
    </Box>
  );
}

const categories = [
  'Wok',
  'Pizza',
  'Soup', 
  'Dessert',
  'Drink'
];