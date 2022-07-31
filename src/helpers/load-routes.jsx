import React, { useEffect, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

function LoadRoutes({ children }) {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState('');
  const location = useLocation();
  TopBarProgress.config({
    barColors: {
      0: '#fcd34d',
      1: '#ef4444'
    },
    barThickness: 2.5,
    shadowBlur: 0
  });
  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc('');
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);
  return (
    <>
      {progress && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  );
}

export default LoadRoutes;
