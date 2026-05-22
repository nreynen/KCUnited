import React, { FunctionComponent, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
// import { useAtom } from 'jotai';

// import { fetch_all } from '../../lib/server_helper';

// import {
//   Badge,
// } from '@mui/material';

import {
  Dt,
  Typography
} from '../interface';

// const { DateTime } = require("luxon");
var he = require('he');

type Props = {
  sx?: object;
  amount: number;
  base?: number;
  currency?: string;
  simple?: boolean;
  date?: string;
  int?: boolean;
};

export const AnnAm: FunctionComponent<Props> = ({amount, sx, base, currency, simple, date, int}) => {
  // const navigate = useNavigate();
  const theme = useTheme();
  // const [login, setLogin] = useAtom(loginAtom);

  // const [helps, setHelps] = useState<HelpOb[]>([]);

  return (<Typography
    variant="body1"
    sx={{
      textAlign: 'right',
      ...(!!simple ? {
        color: parseFloat((amount || 0).toString()) <= parseFloat((base || 0).toString()) ? theme.palette.secondary.main : theme.palette.primary?.main
      } : {}),
      ...sx
    }}>
      {!!int && amount.toLocaleString("nl-BE")}
      {!int && amount.toLocaleString("nl-BE", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      {!!currency && he.decode(`&nbsp;${currency}`)}
      {!!date && <><br/><span style={{fontSize: '0.5rem', marginTop: -4, display: 'block'}}><Dt d={date} f="dd/LL/y t" /></span></>}
    </Typography>);
}