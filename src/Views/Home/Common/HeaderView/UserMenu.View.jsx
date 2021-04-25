import React, {
 memo, useEffect, useState, useCallback, useRef
} from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import {
  getDownloadableLink,
  languageChange,
  showError,
  showSuccess,
  GlobalHistory,
} from '../../../../Helper';
import { CollapseComponent, Spinner } from '../../../../Components';
import { OrganizationUserSearch, UpdateMyProfileImage, uploadFile } from '../../../../Services';

import { UPDATE } from '../../../../store/login/Actions';

const FirstLettersExp = /\b(\w)/gm;

const translationLocation = 'userMenuView.';
export const UserMenuView = memo(({ logout }) => {
  const { t } = useTranslation('HeaderView');
  const dispatch = useDispatch();
  const [imageReq, setImageReq] = useState(null);
  const [languageToggler, setLanguageToggler] = useState(false);
  const loginResponse = useSelector((state) => state.login.loginResponse);
  const [isLoading, setIsLoading] = useState(false);
  const uploaderRef = useRef(null);
  const [languages] = useState([
    {
      key: 'en',
      value: `${translationLocation}english`,
    },
    {
      key: 'ar',
      value: `${translationLocation}arabic`,
    },
  ]);
  useEffect(() => {
    if (loginResponse) setImageReq(loginResponse);
  }, [loginResponse]);
  const languageClicked = useCallback(languageChange);

  const languageTogglerClicked = () => {
    setLanguageToggler(!languageToggler);
  };
  const getOrganizationUserSearch = useCallback(async () => {
    setIsLoading(true);
    const response = await OrganizationUserSearch({
      userName: loginResponse.userName,
      pageIndex: 0,
      pageSize: 25,
    });
    if (response && response.result) {
      setIsLoading(false);
      localStorage.setItem(
        'activeUserItem',
        JSON.stringify(response.result.find((item) => item.id === loginResponse.userId))
      );
      if (window.location.pathname.includes('home/Users/edit'))
        window.location.href = `/home/Users/edit?id=${loginResponse.userId}`;
      else GlobalHistory.push(`/home/Users/edit?id=${loginResponse.userId}`);
    } else setIsLoading(false);
  }, [loginResponse]);
  const editProfileHandler = () => {
    getOrganizationUserSearch();
  };
  const fileChanged = useCallback(
    async (event) => {
      if (!event.target.value) return;
      setIsLoading(true);
      const response = await uploadFile({ file: event.target.files[0] });
      if (response) {
        const profileImageRes = await UpdateMyProfileImage(response.uuid);
        if (profileImageRes) {
          if (JSON.parse(localStorage.getItem('session')).userId === profileImageRes.id) {
            const updatedState = JSON.parse(localStorage.getItem('session'));
            const update = { ...updatedState, profileImg: profileImageRes.profileImg };
            localStorage.setItem('session', JSON.stringify(update));
            dispatch(UPDATE(update));
          }
          if (
            localStorage.getItem('activeUserItem') &&
            JSON.parse(localStorage.getItem('activeUserItem')).id === profileImageRes.id
          ) {
            const updateActiveUser = JSON.parse(localStorage.getItem('activeUserItem'));
            localStorage.setItem(
              'activeUserItem',
              JSON.stringify({ ...updateActiveUser, profileImg: profileImageRes.profileImg })
            );
            if (window.location.pathname.includes('home/Users/edit'))
              window.location.href = `/home/Users/edit?id=${profileImageRes.id}`;
          }
          showSuccess(t(`${translationLocation}image-changed-successfully`));
        } else showError(t(`${translationLocation}save-image-failed`));
        setIsLoading(false);
      } else {
        showError(t(`${translationLocation}upload-image-failed`));
        setIsLoading(false);
      }
    },
    [dispatch, t]
  );

  return (
    <div className='cards'>
      <div className='card-content'>
        <Spinner isActive={isLoading} isAbsolute />
        <div className='d-flex-column-center'>
          <div className='p-relative'>
            {loginResponse && loginResponse.fullName && (!imageReq || !imageReq.profileImg) && (
              <Avatar className='avatars-wrapper'>
                {loginResponse.fullName.match(FirstLettersExp).join('')}
              </Avatar>
            )}
            {imageReq && imageReq.profileImg && (
              <img
                src={getDownloadableLink(imageReq.profileImg)}
                alt={t('user-image')}
                className='user-img'
              />
            )}
            <input
              type='file'
              className='d-none'
              onChange={fileChanged}
              accept='image/*'
              ref={uploaderRef}
            />
            <ButtonBase className='btns-icon theme-outline-dark btns-small mx-0 user-btn'>
              <span className='mdi mdi-camera' onClick={() => uploaderRef.current.click()} />
            </ButtonBase>
          </div>
          <p className='c-gray-darker'>{loginResponse && loginResponse.fullName}</p>
          <div className='separator-h' />
          <div className='separator-h' />
          <ButtonBase className='btns theme-menu'>
            <span className='mdi mdi-cog-outline' />
            {' '}
            <span className='mx-3'>{t(`${translationLocation}setting`)}</span>
          </ButtonBase>
          <div className='separator-h' />
          <ButtonBase className='btns theme-menu' onClick={languageTogglerClicked}>
            <span className='mdi mdi-translate' />
            {' '}
            <span className='mx-3'>{t(`${translationLocation}language`)}</span>
          </ButtonBase>
          <div className='separator-h mb-2' />

          <CollapseComponent
            isOpen={languageToggler}
            classes='w-100 px-3'
            component={(
              <>
                {languages.map((item, index) => (
                  <React.Fragment key={`languages${item.key}`}>
                    <ButtonBase
                      className='btns theme-menu'
                      onClick={() => languageClicked(item.key)}
                    >
                      {t(item.value)}
                    </ButtonBase>
                    <div
                      className={`separator-h${index === languages.length - 1 ? ' mb-2' : ''}`}
                    />
                  </React.Fragment>
                ))}
              </>
            )}
          />
        </div>
      </div>
      <div className='card-footer'>
        <ButtonBase className='btns theme-solid mb-2' onClick={editProfileHandler}>
          <span>{t(`${translationLocation}edit-profile`)}</span>
        </ButtonBase>
        <ButtonBase className='btns theme-outline mb-2' onClick={logout}>
          <span>{t(`${translationLocation}logout`)}</span>
        </ButtonBase>
      </div>
    </div>
  );
});
UserMenuView.propTypes = {
  logout: PropTypes.func.isRequired,
};
