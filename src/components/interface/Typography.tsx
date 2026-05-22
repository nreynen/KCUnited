import React, { FunctionComponent } from 'react';

import {
  Typography as Typo
} from '@mui/material';

var he = require('he');

type TypographyProps = {
  sx?: object;
  onClick?: (e:unknown) => void;
  children: React.ReactNode | string;
  html?: boolean;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "inherit" | undefined;
  nw_title?: boolean;
  nw_text?: boolean;
};

export const Typography: FunctionComponent<TypographyProps> = ({variant, sx, children, onClick, html, nw_title, nw_text}) => {
  return (!!html && typeof(children) === "string" ? <Typo
    variant={variant}
    sx={{
      ...(!!nw_title ? {
        fontSize: '20px !important',
        fontWeight: 800,
        lineHeight: '24px',
        color: '#57bf93 !important',
        textTransform: 'uppercase',
        fontFamily: ['PPFormula', 'sans-serif'].join(',')
      } : {}),
      ...(!!nw_text ? {
        fontSize: '16px !important',
        lineHeight: '25.6px',
        color: '#185459 !important',
        fontFamily: ['Work Sans', 'sans-serif'].join(','),
        "&.MuiTypography-root p, &.MuiTypography-root > p": {
          fontSize: '16px !important',
          lineHeight: '25.6px',
          color: '#185459 !important',
          fontFamily: ['Work Sans', 'sans-serif'].join(',')
        }
      } : {}),
      ...sx
    }}
    onClick={(e) => {if (!!onClick) onClick(e);}}
    dangerouslySetInnerHTML={{ __html: children }}
  ></Typo> : <Typo
    variant={variant}
    sx={{
      ...(!!nw_title ? {
        fontSize: '20px !important',
        fontWeight: 800,
        lineHeight: '24px',
        color: '#57bf93 !important',
        textTransform: 'uppercase',
        fontFamily: ['PPFormula', 'sans-serif'].join(',')
      } : {}),
      ...(!!nw_text ? {
        fontSize: '16px !important',
        lineHeight: '25.6px',
        color: '#185459 !important',
        fontFamily: ['Work Sans', 'sans-serif'].join(','),
        "&.MuiTypography-root p, &.MuiTypography-root > p": {
          fontSize: '16px !important',
          lineHeight: '25.6px',
          color: '#185459 !important',
          fontFamily: ['Work Sans', 'sans-serif'].join(',')
        }
      } : {}),
      ...sx
    }}
    onClick={(e) => {if (!!onClick) onClick(e);}}
  >
    {typeof(children) === "string" ? he.decode(children.replace(/<[^>]*>?/gm, '')) : children}
  </Typo>);
}