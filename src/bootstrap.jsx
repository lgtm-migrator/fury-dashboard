import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './app';
// const SayHelloFromC = React.lazy(() => import('furyConnectSwitchToggle/SayHelloFromC'));
// const UserInterface = React.lazy(() => import('furyConnectSwitchInterface/UserInterface'));
// const Sample = React.lazy(() => import('sample_elastic_app/Sample'));

// const FuryConnectSwitchUI = React.lazy(() => import('FuryConnectSwitchUI/FuryConnectSwitchUI'));

ReactDOM.render(
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
      {/* <Sample /> */}
      {/* <FuryConnectSwitchUI /> */}
      {/* <UserInterface />
      <SayHelloFromC /> */}
    </Suspense>
  </>,
  document.getElementById('root')
);