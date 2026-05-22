import React, { FunctionComponent, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
// import { useAtom } from 'jotai';
// import { useNavigate } from 'react-router-dom';

// import { fetch_all, fetch_one } from '../lib/server_helper';

// @ts-ignore
// import Logo from "../images/logo_trans.png";

// import MenuIcon from '@mui/icons-material/Menu';

import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
} from '@mui/material';
import { Typography } from '../components/interface';

import all_news from '../lib/news';
import { useParams } from 'react-router-dom';

// import { loginAtom } from '../lib/auth';

const { DateTime } = require("luxon");

type DashboardProps = {};

export const NewsItem: FunctionComponent<DashboardProps> = () => {
  // const navigate = useNavigate();
  const theme = useTheme();
  // const [login, setLogin] = useAtom(loginAtom);

  const params = useParams();

  const [objectId, setObjectId] = useState<number | undefined>();
  const [news, setNews] = useState<any>();








  useEffect(() => {
    // console.log(params);
    setObjectId(parseInt(params.id?.toString() || '0', 10));
  }, [params]);
  useEffect(() => {
    // console.log(objectId);
    if (!!objectId?.toString()) setNews(all_news()[objectId]);
  }, [objectId]);

  return !!news ? <>
    <Grid container spacing={0}>
      {/* HEADER */}
      <Grid item xs={12} sx={{
        position: 'relative'
      }}>
        <Avatar
          src={news.img}
          sx={{
            width: '100%',
            height: '600px'
          }}
          variant='square'
        />
        {/* <Box sx={{
          position: 'absolute',
          width: '100%',
          left: 0,
          top: '40%',
          textAlign: 'center'
        }}>
          <Typography variant="h1" sx={{
            fontSize: '6em',
            textShadow: '1px 1px 2px pink'
          }}>KC United</Typography>
          <Typography variant="h3" sx={{
            textShadow: '1px 1px 2px pink'
          }}>Different teams. One heart.</Typography>
        </Box> */}
      </Grid>

      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />


      {/* NIEUWS */}
      <Grid item xs={12} sx={{paddingLeft: 2, backgroundColor: theme.palette.opacitated?.sec005}}>
        <Typography variant='h1'>{news?.title}</Typography>
      </Grid>

      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.primary.light}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.main_005}} />

      <Grid item xs={12} sx={{paddingLeft: 2, backgroundColor: theme.palette.opacitated?.main_005}}>
        <Typography variant='h5' sx={{
          marginTop: 1
        }}>Geschreven door {news.author} ~ {DateTime.fromFormat(news.date, "dd/LL/y t").setLocale('nl').toFormat("dd LLLL y t")}</Typography>
      </Grid>

      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.main_005}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.primary.light}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />

      <Grid item xs={12} sx={{paddingLeft: 2, backgroundColor: theme.palette.opacitated?.sec005}}>
        <Typography html>{news?.body}</Typography>
      </Grid>

      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.primary.light}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.main_005}} />






      <Grid item xs={12} sx={{height: '40px', paddingLeft: 2, backgroundColor: theme.palette.opacitated?.main_005}}>
        <Typography variant='body1' sx={{fontSize: '0.8rem', textAlign: 'center'}}>Powered by <a href="https://www.kangacoders.com/" target="_BLANK">KangaCoders</a></Typography>
      </Grid>
    </Grid>
  </> : <><CircularProgress /></>;
}
