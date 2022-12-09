import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Switches() {
  return (
    <div>
      <FormControlLabel control={<Switch/>} label="Вегетарианское" sx={{color: "grey",  minWidth: 150 }}/>
    </div>
  );
}