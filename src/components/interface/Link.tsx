import React, { FunctionComponent } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Typography
} from '@mui/material';

var he = require('he');

type LinkProps = {
  sx?: object;
  label: string;
  onClick: (e:unknown) => void;
  smaller?: boolean
};

export const Link: FunctionComponent<LinkProps> = ({label, onClick, sx, smaller}) => {
  const theme = useTheme();

  return (<Typography
    sx={{
      ...(smaller ? {fontSize: '0.8rem'} : {}),
      color: theme.palette.secondary?.main,
      cursor: 'pointer',
      ...sx
    }} onClick={(e) => {
      onClick(e);
    }}>{he.decode(label)}</Typography>);
}