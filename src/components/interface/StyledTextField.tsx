import React, { FunctionComponent, useEffect, useState } from 'react';
// import { useTheme } from '@mui/material/styles';

import {
  InputAdornment,
  TextField
} from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

var he = require('he');

type StyledTextFieldProps = {
  sx?: object;
  label: string;
  value: string;
  fullWidth?: boolean;
  disabled?: boolean;
  capitalaction?: boolean;
  error?: boolean;
  id: string;
  min?: number;
  max?: number;
  helperText?: string|React.ReactNode;
  type?: string;
  multiline?: boolean;
  errorArray?: string[];
  onChange: (z:string) => void;
  setEnterPressed?: (v:boolean) => void;
};

export const StyledTextField: FunctionComponent<StyledTextFieldProps> = ({min, max, capitalaction, disabled, label, onChange, sx, error, value, id, type, multiline, fullWidth, errorArray, helperText, setEnterPressed}) => {
  // const theme = useTheme();

  const [actualValue, setActualValue] = useState<string>(value);

  useEffect(() => {
    if (value !== actualValue) setActualValue(value);
  }, [value]);

  return (
    <TextField
      value={actualValue}
      disabled={disabled}
      helperText={helperText}
      id={id}
      error={!!errorArray && errorArray.indexOf(id) > -1}
      type={type}
      variant="outlined"
      multiline={multiline}
      label={he.decode(label)}
      onChange={(e) => {setActualValue(e.target.value); onChange(e.target.value)}}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !!setEnterPressed) {
          setEnterPressed(true);
        }
      }}
      sx={{
        ...(fullWidth ? {
          width: '100%',
          paddingTop: 1,
          paddingBottom: 1
        } : {
          width: 'auto',
          padding: 1
        }),
        'input': {
          padding: 1
        },
        'label[data-shrink=true]': {
          left: fullWidth ? 0 : 8,
          top: 8
        },
        'label[data-shrink=false]': {
          opacity: 0.4
        },
        ...sx
      }}
      InputProps={{
        inputProps: {
          ...(typeof(min) !== 'undefined' ? {min: min} : {}),
          ...(typeof(max) !== 'undefined' ? {max: max} : {})
        },
        endAdornment: !!error ? (<InputAdornment position="end">
          <ErrorIcon style={{color: '#d32f2f'}} />
        </InputAdornment>) : (!!capitalaction ? (<InputAdornment position="end">
          <FontDownloadIcon sx={{
            cursor: 'pointer'
          }} onClick={() => {
            const words = actualValue.trim().toLowerCase().split(" ");
            for (let i = 0; i < words.length; i++) {
              words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }

            setActualValue(words.join(" "));
            onChange(words.join(" "));
          }} />
        </InputAdornment>) : null)
      }}
    />
  );
}