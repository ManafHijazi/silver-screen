import React, { useState } from 'react';
// import { Breadcrumb } from '../../Components';
import { Header, MainMenuView } from '../../Views/Home';
import { SwitchRoute } from '../../Components/Route/SwitchRoute';
import { HomeRoutes } from '../../routes/HomeRoutes/HomeRoutes';
import { setLoading, setSideMenuIsOpenCallback } from '../../Helper/Middleware.Helper';

const HomeLayout = () => {
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(true);
  setSideMenuIsOpenCallback(setSideMenuIsOpen);
  const [, setShowLoading] = React.useState(false);
  const [headerHeight, setHeaderHeight] = useState(70);
  const changeShowLoading = (flag) => {
    setShowLoading(flag);
  };
  setLoading(changeShowLoading);

  return (
    <>
      <Header headerHeightChanged={(hieght) => setHeaderHeight(hieght)} />
      <div className='container' style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
        <MainMenuView isHover={isHover} setIsHover={setIsHover} />
        <div
          className={`content-wrapper${isHover ? ' is-open' : ''}${
            (sideMenuIsOpen && ' is-open-side-menu') || ''
          }`}
        >
          <div className='open-close-main-layout'>
            {/* <Breadcrumb /> */}
            <SwitchRoute routes={HomeRoutes} />
          </div>
        </div>
      </div>
    </>
  );
};

export { HomeLayout };
