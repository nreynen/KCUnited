import React, { FunctionComponent } from 'react';
// import { useTheme } from '@mui/material/styles';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

// import ErrorIcon from '@mui/icons-material/Error';

var he = require('he');

type StyledSelectProps = {
  sx?: object;
  mainSx?: object;
  label: string;
  value: string;
  list: {id:string|number, name:string}[];
  fullWidth?: boolean;
  error?: boolean;
  id: string;
  errorArray?: string[];
  onChange: (z:string) => void;
};

export const StyledSelect: FunctionComponent<StyledSelectProps> = ({label, onChange, sx, error, value, id, fullWidth, list, errorArray, mainSx}) => {
  // const theme = useTheme();

  return (<FormControl fullWidth sx={{
    marginTop: 1,
    marginBottom: 1,
    'label[data-shrink=true]': {
      top: 0
    },
    'label[data-shrink=false]': {
      marginTop: -1
    },
    ...mainSx
  }}>
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      value={value}
      labelId={`${id}-label`}
      id={id}
      error={error || !!errorArray && errorArray.indexOf(id) > -1}
      label={he.decode(label)}
      onChange={(e) => {onChange(e.target.value)}}
      sx={{
        ...(fullWidth ? {
          width: '100%',
        } : {
          width: 'auto',
        }),
        '& .MuiInputBase-input': {
          paddingBottom: 1,
          paddingTop: 1
        },
        ...sx
      }}
    >
      {list.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
    </Select>
  </FormControl>);
}