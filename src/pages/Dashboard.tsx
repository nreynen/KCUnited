import React, { FunctionComponent, useEffect } from 'react';
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
  Divider,
  Grid,
} from '@mui/material';
import { Typography } from '../components/interface';
import { Agenda } from '../components/blocks/Agenda';
import { News } from '../components/blocks/News';

import all_news from '../lib/news';
import { useLocation } from 'react-router-dom';

// import { loginAtom } from '../lib/auth';

// const { DateTime } = require("luxon");

type DashboardProps = {};

export const Dashboard: FunctionComponent<DashboardProps> = () => {
  // const navigate = useNavigate();
  const theme = useTheme();
  // const [login, setLogin] = useAtom(loginAtom);
  const { state } = useLocation();


  // scrllto





  useEffect(() => {
    if (!!state?.scrllto) {
      var element = document.getElementById(state?.scrllto);
      var headerOffset = 108;
      // @ts-ignore
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [state]);

  return <>
    <Grid container spacing={0}>
      {/* HEADER */}
      <Grid item xs={12} sx={{
        position: 'relative'
      }}>
        <Avatar
          src="https://placehold.co/600x400"
          sx={{
            width: '100%',
            height: '600px'
          }}
          variant='square'
        />
        <Box sx={{
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
        </Box>
      </Grid>

      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />


      {/* NIEUWS */}
      <Grid item xs={12} sx={{paddingLeft: 2, backgroundColor: theme.palette.opacitated?.sec005}} id="scrollnews">
        <Typography variant='h2'>Nieuws</Typography>
      </Grid>
      {all_news().reverse().slice(0,3).map((news, i) => <Grid item xs={12} md={4} sx={{backgroundColor: theme.palette.opacitated?.sec005}}>
        <News
          img={news.img}
          title={news.title}
          teaser={news.teaser}
          date={news.date}
          readmore={i?.toString()}
        />
      </Grid>)}
      <Grid item xs={12} md={4} sx={{backgroundColor: theme.palette.opacitated?.sec005}}></Grid>
      <Grid item xs={12} md={4} sx={{backgroundColor: theme.palette.opacitated?.sec005}}></Grid>

      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.primary.light}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.main_005}} />



      {/* AGENDA */}
      <Grid item xs={12} sx={{paddingLeft: 2, backgroundColor: theme.palette.opacitated?.main_005}} id="scrollagenda">
        <Typography variant='h2'>Agenda</Typography>
      </Grid>
      <Grid item xs={12} md={3} sx={{backgroundColor: theme.palette.opacitated?.main_005}}>
        <Agenda
          img="https://placehold.co/40x40"
          name="Appels - KC United"
          date="6 juni 2026"
          hour="15h00"
        />
      </Grid>
      <Grid item xs={12} md={3} sx={{backgroundColor: theme.palette.opacitated?.main_005}}></Grid>
      <Grid item xs={12} md={3} sx={{backgroundColor: theme.palette.opacitated?.main_005}}></Grid>
      <Grid item xs={12} md={3} sx={{backgroundColor: theme.palette.opacitated?.main_005}}></Grid>

      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.main_005}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.primary.light}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />


      {/* OVER ONS */}
      <Grid item xs={12} sx={{paddingLeft: 2, backgroundColor: theme.palette.opacitated?.sec005}} id="scrollabout">
        <Typography variant='h2'>Over ons</Typography>
      </Grid>
      <Grid item xs={12} sx={{paddingLeft: 2, backgroundColor: theme.palette.opacitated?.sec005}}>
        <Typography variant='body1'>Lorem ipsum</Typography>
      </Grid>

      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.sec005}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.secondary.main}} />
      <Grid item xs={12} sx={{height: '8px', backgroundColor: theme.palette.primary.light}} />
      <Grid item xs={12} sx={{height: '32px', backgroundColor: theme.palette.opacitated?.main_005}} />






      <Grid item xs={12} sx={{height: '40px', paddingLeft: 2, backgroundColor: theme.palette.opacitated?.main_005}}>
        <Typography variant='body1' sx={{fontSize: '0.8rem', textAlign: 'center'}}>Powered by <a href="https://www.kangacoders.com/" target="_BLANK">KangaCoders</a></Typography>
      </Grid>
    </Grid>
  </>;
}
