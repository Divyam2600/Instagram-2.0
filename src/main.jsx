import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import FireBaseContext from './context/firebase';
import { firebaseApp, value } from './lib/firebase';
import { RecoilRoot } from 'recoil';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <FireBaseContext.Provider value={{ firebaseApp, value }}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </FireBaseContext.Provider>
);
