/* eslint-disable no-unused-vars */
import { ButtonBase } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { InnerHeaderComponent } from '../../../Components';
import { GlobalHistory } from '../../../Helper';

const parentTranslationPath = 'ContactsView';
const translationPath = '';

export const ContactsView = () => {
  const { t } = useTranslation(parentTranslationPath);
  const pathName = window.location.pathname.split('/home/')[1].split('/view')[0];
  const [isLoading, setIsLoading] = useState(false);
  const [activeSideButton, setActiveSideButton] = useState(1);
  const loginResponse = useSelector((state) => state.login.loginResponse);
  const [sideList] = useState([
    {
      key: 1,
      value: 'Employees',
    },
    {
      key: 2,
      value: t('ORG Chart'),
    },
    {
      key: 3,
      value: 'Team',
    },
  ]);
  const activeSideButtonChange = useCallback((value) => {
    setActiveSideButton(value);
    if (value === 2) GlobalHistory.push('/home/Administration/Organizational-chart');
  }, []);
  return (
    <div className='view-wrapper'>
      <InnerHeaderComponent
        component={(
          <>
            {sideList.map((item) => (
              <ButtonBase
                className={`header-side-menu-button ${
                  item.key === activeSideButton ? 'is-active' : ''
                }`}
                onClick={() => activeSideButtonChange(item.key)}
              >
                {item.value}
              </ButtonBase>
            ))}
          </>
        )}
      />
      <div className='mt-5'>Contacts View</div>
    </div>
  );
};
