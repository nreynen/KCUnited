import React, { FunctionComponent } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Avatar,
  Box,
  Divider,
  Typography
} from '@mui/material';
// import { StyledButton } from '../interface';

// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import { useNavigate } from 'react-router-dom';

const { DateTime } = require("luxon");
// var he = require('he');

type Props = {
  sx?: object;
  name: string;
  hour?: string;
  img?: string;
  date?: string;
};

export const Agenda: FunctionComponent<Props> = ({name, hour, sx, img, date}) => {
  const theme = useTheme();
  // const navigate = useNavigate();

  return (<Box sx={{
    margin: 1,
    padding: 1,
    backgroundColor: 'white',
    // border: '1px solid transparent',
    // borderColor: theme.palette.primary.main,
    position: 'relative'
  }}>
    <Avatar
      src={img}
      sx={{
        width: '100px',
        height: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        zIndex: 1000
      }}
    />
    {/* <Avatar
      src={Logo}
      sx={{
        width: '100px',
        height: '100px',
        position: 'relative',
        zIndex: 999,
      }}
    /> */}
    <Typography variant="subtitle1" sx={{
      marginTop: 1,
      textAlign: 'center'
    }}>{name}</Typography>
    <Divider sx={{backgroundColor: theme.palette.secondary.main}} />
    <Typography variant="body1" sx={{textAlign: 'center'}}>{date}</Typography>
    <Typography variant="body1" sx={{textAlign: 'center'}}>{hour}</Typography>
  </Box>);
}