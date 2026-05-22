import React, { FunctionComponent } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Avatar,
  Box,
  Divider,
  Typography
} from '@mui/material';
import { StyledButton } from '../interface';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';

const { DateTime } = require("luxon");
// var he = require('he');

type Props = {
  sx?: object;
  title: string;
  readmore?: string;
  teaser?: string;
  img?: string;
  date?: string;
};

export const News: FunctionComponent<Props> = ({title, readmore, sx, teaser, img, date}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (<Box sx={{
    margin: 1,
    padding: 1,
    backgroundColor: 'white',
    // border: '1px solid transparent',
    // borderColor: theme.palette.primary.main,
    ...sx
  }}>
    <Avatar
      src={img}
      sx={{
        width: '100%',
        height: '200px'
      }}
      variant='square'
    />
    {!!date && <Typography variant="body1" sx={{
      marginTop: 1,
      fontSize: '0.8rem',
      color: theme.palette.secondary.dark
    }}>{DateTime.fromFormat(date, "dd/LL/y t").setLocale('nl').toFormat("dd LLLL y t")}</Typography>}
    <Typography variant="h4" sx={{
      marginTop: 0.5
    }}>{title}</Typography>
    <Divider sx={{backgroundColor: theme.palette.secondary.main}} />
    <Typography variant="body1">{teaser}</Typography>
    {!!readmore && <>
      <StyledButton
        id="readmore"
        onClick={() => {
          navigate(`/news/${readmore}`);
        }}
        label="Lees meer"
        endIcon={<ArrowRightAltIcon />}
        sx={{
          marginTop: 2,
          width: '100%',
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
          }
        }}
      />
    </>}
  </Box>);
}