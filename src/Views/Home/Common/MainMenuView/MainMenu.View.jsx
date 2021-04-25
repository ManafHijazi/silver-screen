import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonBase, Fade, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Zoom from '@material-ui/core/Zoom';
import { HomeRoutes, MainMenu } from '../../../../routes';
import { useHashChange } from '../../../../Hooks';
import { GlobalHistory } from '../../../../Helper';
import { AddingList } from '../lists/AddingList/AddingList';

const getActiveGroup = () => {
  const activeSubMenu = HomeRoutes.find((item) =>
    (item.isExact ?
      window.location.pathname.match(item.layout ? item.layout + item.path : item.path) :
      window.location.pathname.includes(item.layout ? item.layout + item.path : item.path)));
  if (!activeSubMenu) {
    const mainMenu = MainMenu.find((item) =>
      (item.routerLink && item.routerLinkActiveOptions.exact ?
        window.location.pathname.match(item.routerLink) :
        window.location.pathname.includes(item.routerLink)));
    return mainMenu ? mainMenu.groupId : -1;
  }
  return activeSubMenu.groupId;
};
const getActiveSubItem = (exact, routerLink) =>
  (exact ?
    window.location.pathname.match(routerLink) :
    window.location.pathname.includes(routerLink));
const getSortedSubMenu = (openGroupId) =>
  HomeRoutes.filter((item) => item.groupId === openGroupId && item.showInMenu).sort(
    (a, b) => a.order - b.order
  );

export const MainMenuView = ({ isHover, setIsHover }) => {
  const { t } = useTranslation('Shared');
  const [activeGroupId, setActiveGroupId] = useState(getActiveGroup());
  const [openGroupId, setOpenGroupId] = useState(-1);
  const [hoverMenuIndex, setHoverMenuIndex] = useState(-1);
  const [hoverSubmenuIndex, setHoverSubmenuIndex] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const [activeSideButton, setActiveSideButton] = useState(1);
  const [sideList] = useState([
    {
      key: 1,
      value: 'Employees',
      icon: 'mdi mdi-account',
    },
    {
      key: 2,
      value: 'People',
      icon: 'mdi mdi-account-group',
    },
    {
      key: 3,
      value: 'Organizations',
      icon: 'mdi mdi-hospital-building',
    },
    {
      key: 4,
      value: 'Administration',
      icon: 'mdi mdi-account-tie',
    },
    {
      key: 5,
      value: 'Marketing',
      icon: 'mdi mdi-account-cash-outline',
    },
    {
      key: 6,
      value: 'Scale',
      icon: 'mdi mdi-scale-balance',
    },
  ]);
  const loginResponse = useSelector((state) => state.login.loginResponse);
  const [menu] = useState(MainMenu);
  const activeSideButtonChange = useCallback((value) => {
    setActiveSideButton(value);
  }, []);
  useHashChange(() => setActiveGroupId(getActiveGroup()));
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(
    () => () => {
      setActiveGroupId(getActiveGroup());
    },
    []
  );
  useEffect(() => {
    if (openGroupId === -1) setExpanded(false);
  }, [openGroupId]);
  const menuClicked = useCallback(
    (groupId, routerLink) => {
      localStorage.removeItem('activeItem');
      setOpenGroupId(groupId);
      if (routerLink) {
        setActiveGroupId(groupId);
        GlobalHistory.push(routerLink);
      }
    },
    [setOpenGroupId]
  );
  const subMenuClicked = useCallback((groupId) => {
    setActiveGroupId(groupId);
  }, []);
  const menuHover = useCallback((index) => setHoverMenuIndex(index), [setHoverMenuIndex]);
  const submenuHover = useCallback((index) => setHoverSubmenuIndex(index), [setHoverSubmenuIndex]);
  return (
    <>
      <div className='left-side-menu-wrapper'>
        <div className='left-side-menu-item'>
          {sideList.map((item) => (
            <Tooltip title={item.value} placement='right' TransitionComponent={Zoom}>
              <ButtonBase
                className={`side-menu-button ${item.key === activeSideButton ? 'is-active' : ''}`}
                onClick={() => activeSideButtonChange(item.key)}
              >
                <span className={item.icon} />
              </ButtonBase>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className='menu-wrapper'>
        <div className={`animated-open-close${isHover ? ' is-open' : ' is-close'}`}>
          <div className='filter-by-wrapper'>
            <Fade in={!!isHover} unmountOnExit>
              <div className='filter-by-title px-2'>
                <span className='mdi mdi-filter px-2' />
                {t('filter-by')}
              </div>
            </Fade>
            <ButtonBase className='open-button' onClick={() => setIsHover(!isHover)}>
              <span className={`mdi ${!isHover ? 'mdi-arrow-right' : 'mdi-arrow-left'}`} />
            </ButtonBase>
          </div>
          <div className='main-menu-item-wrapper'>
            {menu
              .sort((a, b) => a.order - b.order)
              .map(
                (item, index) =>
                  (item.roles.length === 0 ||
                    item.roles
                      .map(
                        (role) =>
                          loginResponse &&
                          loginResponse.permissions &&
                          loginResponse.permissions.findIndex(
                            (per) => per.permissionsId === role.permissionsId
                          ) !== -1
                      )
                      .includes(true)) && (
                      <div
                        key={`menuItemRef${index + 1}`}
                        className={
                        activeGroupId === item.groupId ?
                          'active-item-name accordion-wrapper' :
                          'inactive-item-name'
                      }
                      >
                        <Accordion
                          key={`menu${item.groupId}`}
                          className={activeGroupId === item.groupId ? 'menu-item-summary' : ''}
                          expanded={expanded === item.groupId}
                          onChange={handleChange(item.groupId)}
                        >
                          <ButtonBase>
                            <AccordionSummary
                              onClick={() => {
                              menuClicked(item.groupId, item.routerLink);
                              setIsHover(true);
                            }}
                              onMouseEnter={() => {
                              if (!isHover) {
                                if (item.groupId !== 1) menuClicked(item.groupId, item.routerLink);
                                else setOpenGroupId(-1);
                              }
                            }}
                              onTouchStart={() => {
                              if (!isHover) {
                                if (item.groupId !== 1) menuClicked(item.groupId, item.routerLink);
                                else setOpenGroupId(-1);
                              }
                            }}
                              expandIcon={
                              !item.routerLink && <ExpandMoreIcon className='expand-icon-wrapper' />
                            }
                            >
                              <div className='side-menu-item-wrapper'>
                                <div
                                  disabled={item.isDisabled}
                                  className={`btns-menu side-menu-item${
                                  activeGroupId === item.groupId ? ' active' : ''
                                }`}
                                  onMouseEnter={() => menuHover(index)}
                                  onMouseLeave={() => menuHover(-1)}
                                >
                                  <span
                                    className={
                                    activeGroupId === item.groupId ||
                                    openGroupId === item.groupId ||
                                    hoverMenuIndex === index ?
                                      item.iconActive :
                                      item.icon
                                  }
                                  />
                                  <div className='menu-item-name'>{t(item.name)}</div>
                                </div>
                              </div>
                            </AccordionSummary>
                          </ButtonBase>
                          {!item.routerLink && (
                          <Fade in={!!expanded} unmountOnExit>
                            <AccordionDetails>
                              <div className='menu-item-wrapper'>
                                {getSortedSubMenu(openGroupId).map(
                                  (subItem, subIndex) =>
                                    (subItem.roles.length === 0 ||
                                      subItem.roles
                                        .map(
                                          (role) =>
                                            loginResponse &&
                                            loginResponse.permissions.findIndex(
                                              (per) => per.permissionsId === role.permissionsId
                                            ) !== -1
                                        )
                                        .includes(true)) && (
                                        <NavLink
                                          key={`submenu${subIndex + 1}`}
                                          to={
                                          subItem.layout ?
                                            subItem.layout + subItem.path :
                                            subItem.path
                                        }
                                          exact={subItem.isExact}
                                          activeClassName='active menu-active'
                                          className='btns-submenu menu-content-item'
                                          onMouseEnter={() => submenuHover(subIndex)}
                                          onMouseLeave={() => submenuHover(-1)}
                                          onClick={() => subMenuClicked(subItem.groupId)}
                                          disabled={subItem.isDisabled}
                                        >
                                          <span
                                            className={
                                            getActiveSubItem(
                                              subItem.isExact,
                                              subItem.layout ?
                                                subItem.layout + subItem.path :
                                                subItem.path
                                            ) || hoverSubmenuIndex === index ?
                                              subItem.iconActive :
                                              subItem.icon
                                          }
                                          />
                                          <div className='sub-menu-item-name'>{t(subItem.name)}</div>
                                        </NavLink>
                                    )
                                )}
                              </div>
                            </AccordionDetails>
                          </Fade>
                        )}
                        </Accordion>
                      </div>
                  )
              )}
          </div>
          <div className='favorite-by-wrapper'>
            <Fade in={!!isHover} unmountOnExit>
              <div className='filter-by-title px-3'>{t('favorite-list')}</div>
            </Fade>
            <ButtonBase className='favorite-button mr-1' onClick={() => setIsHover(!isHover)}>
              <span className='mdi mdi-playlist-plus' />
            </ButtonBase>
          </div>
          <div className='adding-list-wrapper'>
            <Fade in={!!isHover} unmountOnExit>
              <AddingList />
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
};
MainMenuView.propTypes = {
  isHover: PropTypes.bool.isRequired,
  setIsHover: PropTypes.func.isRequired,
};
