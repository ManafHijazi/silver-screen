import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BreadCrumbRoutes } from '../../routes/BreadCrumbRoutes/BreadCrumbRoutesRoutes';

const getBreadCrumbItems = () => {
  const currentRoute = BreadCrumbRoutes.find(
    (item) => window.location.pathname.split('?')[0] === item.layout + item.path
  );

  if (!currentRoute) return [];
  return currentRoute || [];
};

const Breadcrumb = () => {
  const pathName = window.location.pathname.includes('/home/') ?
    window.location.pathname.split('/home/')[1].split('/view')[0] :
    window.location.pathname;
  const { t } = useTranslation('Shared');
  const [isShown, setIsShown] = useState(false);
  const activeItem = useSelector((state) => state.ActiveItemReducer);

  useEffect(() => {
    if (pathName.includes('/')) setIsShown(true);
    else setIsShown(false);
  }, [pathName]);

  return (
    <Breadcrumbs
      separator={<span className='mdi mdi-chevron-right' />}
      aria-label='breadcrumb'
      className='breadcrumb-wrapper'
    >
      <NavLink
        exact
        to='/home'
        activeClassName='active'
        className='breadcrumb-link'
        onClick={() => setIsShown(false)}
      >
        {t('home')}
      </NavLink>
      {Array.isArray(getBreadCrumbItems().breadcrumbs) &&
        getBreadCrumbItems().breadcrumbs.map((item, index) => (
          <div className='d-flex' key={`breadcumbGroupRef${index + 1}`}>
            {item.groupName && (
              <span className='breadcrumb-group-name'>
                <NavLink
                  to={item.route}
                  key={`breadcrumb${item.itemId + 1}`}
                  exact={item.isExact}
                  onClick={(event) => {
                    setIsShown(false);
                    if (item.isDisabled) event.preventDefault();
                  }}
                  className='breadcrumb-link'
                  activeClassName='active'
                >
                  {t(item.groupName)}
                </NavLink>
                <span className='mdi mdi-chevron-right breadcrumb-seperator' />
              </span>
            )}
            <NavLink
              to={item.route}
              key={`breadcrumb${item.itemId}`}
              exact={item.isExact}
              onClick={(event) => {
                if (index < 1) setIsShown(false);
                if (item.isDisabled) event.preventDefault();
              }}
              className='breadcrumb-link'
              activeClassName='active'
            >
              {t(item.name)}
            </NavLink>
          </div>
        ))}
      {activeItem && activeItem.name && activeItem.id && isShown && (
        <NavLink
          to='/'
          isDisabled
          className='breadcrumb-link'
          activeClassName='active'
          onClick={(event) => event.preventDefault()}
        >
          {`${activeItem && activeItem.name} (${activeItem && activeItem.id})`}
        </NavLink>
      )}
    </Breadcrumbs>
  );
};

export { Breadcrumb };
