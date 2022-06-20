import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppRoute from './AppRoute';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
      <AppRoute />
      <div className="
        rounded-bl-full
        w-5/12
        w-3/4
        h-12
        h-52
        hidden
        drop-shadow"
      />
    </React.StrictMode>,
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
