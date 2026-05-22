import React, { ChangeEvent, FunctionComponent } from 'react';
// import { useTheme } from '@mui/material/styles';

import {
  FormControl,
  FormGroup,
  FormLabel,
  Stack,
  Switch
} from '@mui/material';

import { Typography } from './Typography';

type StyledSwitchProps = {
  label: string;
  offLabel?: string;
  onLabel?: string;
  value: boolean;
  readonly?: boolean;
  onChange: (z:boolean|ChangeEvent<HTMLInputElement>) => void;
};

export const StyledSwitch: FunctionComponent<StyledSwitchProps> = ({label, readonly, onChange, value, offLabel, onLabel}) => {
  // const theme = useTheme();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Typography sx={{fontSize: '0.75rem'}}>{label}</Typography>
      </FormLabel>
      <FormGroup aria-label="position" row>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{cursor: 'pointer'}} onClick={(e) => {onChange(false)}}>{offLabel || 'Off'}</Typography>
          <Switch
            disabled={readonly}
            checked={value}
            onChange={(e) => {onChange(e.target.checked)}}
          />
          <Typography sx={{cursor: 'pointer'}} onClick={(e) => {onChange(true)}}>{onLabel || 'On'}</Typography>
        </Stack>
      </FormGroup>
    </FormControl>
  );
}