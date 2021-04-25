import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Middleware, SetGlobalRerender } from './Helper';
import { SwitchRoute } from './Components/Route/SwitchRoute';
import { AppRoutes } from './routes/AppRoutes/AppRoute';
// const isRtl = true;
// document.body.classList = isRtl ? 'rtl' : 'ltr';
// document.body.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
const App = () => {
  const [render, setRender] = useState(false);
  SetGlobalRerender(setRender, render);
  return (
    <Router>
      <Middleware />
      {/* <Meddilware /> */}
      <SwitchRoute routes={AppRoutes} />
    </Router>
  );
};

export default App;
