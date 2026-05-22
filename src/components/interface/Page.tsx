import React, { FunctionComponent, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAtom } from 'jotai';

// import { fetch_all } from '../../lib/server_helper';

import {
  Badge,
  Box,
  Divider
} from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UndoIcon from '@mui/icons-material/Undo';

import { StyledIconButton } from './StyledIconButton';
import { Typography } from './Typography';

// import { loginAtom } from '../../lib/auth';

type PageProps = {
  sx?: object;
  actions?: React.ReactNode;
  children: React.ReactNode;
  startEndCrumb?: React.ReactNode;
  title?: string;
  helper?: string;
  old_url?: string;
};

export const Page: FunctionComponent<PageProps> = ({children, sx, title, helper, startEndCrumb, old_url, actions}) => {
  // const navigate = useNavigate();
  // const [login, setLogin] = useAtom(loginAtom);


  return (<Box
    sx={{
      position: 'relative',
      ...sx
    }}>
      <Box sx={{ position: 'relative' }}>
        {!!title && <Typography variant="h1">{title}</Typography>}
        {!!title && <Divider sx={{marginBottom: 2}} />}
        <Box sx={{position: 'absolute', top: -4, right: 0, width: 'auto', textAlign: 'right', zIndex: 1000}}>
          {!!actions && actions}
        </Box>
      </Box>
      <Box>
        {!!startEndCrumb && <Box>{startEndCrumb}</Box>}
        
        {children}

        {!!startEndCrumb && <Box sx={{marginTop: 4}}>{startEndCrumb}</Box>}
      </Box>
    </Box>);
}