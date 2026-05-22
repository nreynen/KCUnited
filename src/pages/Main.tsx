import React, { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAtomValue } from 'jotai';

// import { loginAtom } from '../lib/auth';

import {Layout} from './Layout';

import { Dashboard } from './Dashboard';
import { User } from '../models';
import { NewsItem } from './NewsItem';

type MainProps = {}

export const Main: FunctionComponent<MainProps> = () => {
  // const login = useAtomValue(loginAtom);
  let login:User|undefined;
  
  return (<Layout version="0.1" loginId={login?.id}>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/news/:id' element={<NewsItem/>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>);
}

