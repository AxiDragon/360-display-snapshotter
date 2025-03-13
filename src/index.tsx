import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Display360 from './Display360';
import NoInput from './NoInput';
import './index.css';
import SnapshotCameraControls from './SnapshotCameraControls';
import CameraApp from './CameraApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <CameraApp />
            <NoInput />
          </>} />
        <Route path="/:imgUrl" element={
          <>
            <CameraApp />
          </>} />
      </Routes>
    </Router>
  </React.StrictMode>
);