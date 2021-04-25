import React, {
 useCallback, useEffect, useRef, useState
} from 'react';
import { ButtonBase, Badge } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import { getDownloadableLink, GlobalHistory, setLogoutAction } from '../../../../Helper';
import { UserMenuView } from './UserMenu.View';
import { useOnClickOutside } from '../../../../Hubs';
import { LOGOUt } from '../../../../store/login/Actions';
import { CollapseComponent } from '../../../../Components';

const FirstLettersExp = /\b(\w)/gm;
const parentTranslationPath = 'HeaderView';
// const translationPath = '';
export const Header = ({ headerHeightChanged }) => {
  const { t } = useTranslation(parentTranslationPath);
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const loginResponse = useSelector((state) => state.login.loginResponse);
  const userProfileRef = useRef(null);
  const notificationsRef = useRef(null);
  const eventsRef = useRef(null);
  const [imageReq, setImageReq] = useState(null);
  const [activeHeaderButton, setActiveHeaderButton] = useState(1);
  const [headerList] = useState([
    {
      key: 1,
      value: 'Dashboard',
      icon: 'mdi mdi-home',
    },
    {
      key: 2,
      value: 'Contacts',
      icon: 'mdi mdi-account-box',
    },
    {
      key: 3,
      value: 'Company',
      icon: 'mdi mdi-domain',
    },
    {
      key: 4,
      value: 'Projects',
      icon: 'mdi mdi-bag-checked',
    },
    {
      key: 5,
      value: 'Website',
      icon: 'mdi mdi-web',
    },
  ]);
  const [isOpenMenu, setIsOpenMenu] = useState({
    userProfile: false,
    notifications: false,
    events: false,
  });
  const userProfileClicked = () => {
    setIsOpenMenu({ ...isOpenMenu, userProfile: !isOpenMenu.userProfile });
  };
  const logoutClicked = () => {
    localStorage.removeItem('session');
    dispatch(LOGOUt());
    setTimeout(() => {
      GlobalHistory.push('/account/login');
    }, 100);
  };

  const activeHeaderButtonChange = useCallback((value) => {
    setActiveHeaderButton(value);
    // if (value === 2) GlobalHistory.push('/Contacts/view');
  }, []);

  setLogoutAction(logoutClicked);
  useOnClickOutside(userProfileRef, () =>
    setIsOpenMenu((item) =>
      (item.userProfile ?
        {
            ...item,
            userProfile: false,
          } :
        item)));
  useOnClickOutside(notificationsRef, () =>
    setIsOpenMenu((item) =>
      (item.notifications ?
        {
            ...item,
            notifications: false,
          } :
        item)));
  useOnClickOutside(eventsRef, () =>
    setIsOpenMenu((item) =>
      (item.events ?
        {
            ...item,
            events: false,
          } :
        item)));
  useEffect(() => {
    headerHeightChanged(headerRef.current.clientHeight);
  }, [headerHeightChanged]);
  useEffect(() => {
    if (loginResponse) setImageReq(loginResponse);
  }, [loginResponse]);
  return (
    <div className='master-header-wrapper'>
      <div className='header-wrapper' ref={headerRef}>
        <div className='section px-3 header-logo-wrapper'>
          {/* <span role='img' aria-label={t('logo')} className='img-logo' /> */}
          Silver Screen
        </div>
        <div className='section w-100 header-categories-wrapper'>
          <div className='header-categories-item'>
            {headerList.map((item) => (
              <ButtonBase
                className={`header-categories-button ${
                  item.key === activeHeaderButton ? 'is-active' : ''
                }`}
                onClick={() => activeHeaderButtonChange(item.key)}
              >
                <span className={`px-2 ${item.icon}`} />
                {item.value}
              </ButtonBase>
            ))}
          </div>
          <div className='header-search-wrapper'>
            <ButtonBase>
              <span className='mdi mdi-magnify' />
            </ButtonBase>
          </div>
        </div>
        <div className='section'>
          <div className='header-items-wrapper'>
            <div className='header-item'>
              <Badge badgeContent={54}>
                <ButtonBase>
                  <span className='mdi mdi-plus' />
                </ButtonBase>
              </Badge>
            </div>
            <div className='header-item'>
              <Badge badgeContent={32}>
                <ButtonBase>
                  <span className='mdi mdi-checkbox-multiple-marked' />
                </ButtonBase>
              </Badge>
            </div>
            <div className='header-item'>
              <Badge badgeContent={16}>
                <ButtonBase>
                  <span className='mdi mdi-calendar-month-outline' />
                </ButtonBase>
              </Badge>
            </div>
            <div className='header-item'>
              <Badge badgeContent={27}>
                <ButtonBase>
                  <span className='mdi mdi-forum' />
                </ButtonBase>
              </Badge>
            </div>
            <div className='header-item'>
              <Badge badgeContent={6}>
                <ButtonBase>
                  <span className='mdi mdi-video' />
                </ButtonBase>
              </Badge>
            </div>
            <div className='header-item'>
              <Badge badgeContent={24}>
                <ButtonBase>
                  <span className='mdi mdi-email' />
                </ButtonBase>
              </Badge>
            </div>
            <div className='header-item'>
              <Badge badgeContent={4}>
                <ButtonBase>
                  <span className='mdi mdi-bell' />
                </ButtonBase>
              </Badge>
            </div>
          </div>
          <div className='p-relative' ref={userProfileRef}>
            <ButtonBase
              className='btns theme-transparent user-button-wrapper'
              onClick={userProfileClicked}
            >
              {loginResponse && loginResponse.fullName && (!imageReq || !imageReq.profileImg) && (
                <Avatar className='avatars-wrapper theme-small'>
                  {loginResponse.fullName.match(FirstLettersExp).join('')}
                </Avatar>
              )}
              {imageReq && imageReq.profileImg && (
                <img
                  src={getDownloadableLink(imageReq.profileImg)}
                  alt={t('user-image')}
                  className='user-image'
                />
              )}
              {imageReq && imageReq.fullName && (
                <div className='user-name-wrapper'>
                  <span className='user-name-text'>{imageReq.fullName}</span>
                  <span className='mdi mdi-chevron-down mx-2' />
                </div>
              )}
            </ButtonBase>
            <CollapseComponent
              isOpen={isOpenMenu.userProfile}
              top={headerRef.current ? headerRef.current.clientHeight : 60}
              component={<UserMenuView logout={logoutClicked} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {
  headerHeightChanged: PropTypes.func.isRequired,
};
