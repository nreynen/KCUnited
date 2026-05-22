import { FunctionComponent } from 'react';

// import { loginAtom, renew_sign_in } from '../../lib/auth';
// import { useAtom } from 'jotai';
import React from 'react';

const { DateTime } = require("luxon");

type Props = {
  d?: string;
  o?: string;
  of?: string;
  f?: string;
};

export const Dt: FunctionComponent<Props> = ({d, o, of, f}) => {
  // const [login, setLogin] = useAtom(loginAtom);

  const tz_eu_o = DateTime.now().setZone("Europe/Brussels").offset;
  const tz_o = DateTime.now().offset;

  let dt = DateTime.now();
  if (!!d) dt = DateTime.fromISO(d);
  if (!!o && !of) dt = DateTime.fromFormat(o, "dd/LL/y");
  if (!!o && !!of) dt = DateTime.fromFormat(o, of);

  return (<>{`${dt.setZone("Europe/Brussels").toFormat(f || "dd/LL/y")}${tz_eu_o !== tz_o ? ` (Europe/Brussels)` : ""}`}</>);
}