import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Display360 from './Display360';
import NoInput from './NoInput';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router basename='/360-display/'>
      <Routes>
        <Route path="/" element={
          <>
            <Display360 />
            <NoInput />
          </>} />
        <Route path="/:imgUrl" element={<Display360 />} />
      </Routes>
    </Router>
  </React.StrictMode>
);