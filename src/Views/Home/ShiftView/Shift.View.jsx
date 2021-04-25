/* eslint-disable no-unused-vars */
import { ButtonBase, Fab } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { InnerHeaderComponent } from '../../../Components';
import { ContactTypeEnum } from '../../../Enums';
import { GlobalHistory } from '../../../Helper';

const parentTranslationPath = 'ShiftView';
const translationPath = '';

export const ShiftView = () => {
  const { t } = useTranslation(parentTranslationPath);
  const pathName = window.location.pathname.split('/home/')[1].split('/view')[0];
  const [isLoading, setIsLoading] = useState(false);
  const [activeSideButton, setActiveSideButton] = useState(1);
  const count = [1, 2, 1, 2, 1, 2];
  const AVATARS = [
    ContactTypeEnum.employee.defaultImg,
    ContactTypeEnum.employee2.defaultImg,
    ContactTypeEnum.employee3.defaultImg,
    ContactTypeEnum.employee4.defaultImg,
    ContactTypeEnum.employee5.defaultImg,
    ContactTypeEnum.employee6.defaultImg,
    ContactTypeEnum.employee7.defaultImg,
  ];

  const Names = [
    'Adam Alex',
    'Aaron Ben',
    'Carl  Dan',
    'David  Edward',
    'Fred  Frank',
    'George  Hal',
    'Knutson Lawless',
    'Lawicki  Mccord',
    'McCormack  Miller',
    'Myers  Nugent',
    'Ortiz  Orwig',
    'Ory  Pais',
  ];

  const pickRandom = (array) => {
    if (!Array.isArray(array)) return undefined;
    return array[Math.floor(Math.random() * array.length)];
  };
  const loginResponse = useSelector((state) => state.login.loginResponse);
  const [sideList] = useState([
    {
      key: 1,
      value: 'Employees Shift',
    },
    {
      key: 2,
      value: t('My Shift'),
    },
    {
      key: 3,
      value: 'Shift Settings',
    },
  ]);
  const activeSideButtonChange = useCallback((value) => {
    setActiveSideButton(value);
    // if (value === 2) GlobalHistory.push('');
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
      <div className='hedar-options'> </div>
      <div className='Shift-View-wraperr'>
        <div className='hedar-title'>Shift Plicess </div>
        <div className='cards-container'>
          {[1, 2, 3, 1, 2, 3].map((x) => (
            <div className='card-wraper'>
              <div className='card-container'>
                <div className='card'>
                  <div className='Shift-data'>
                    <div className='Shiftname'> Morning shift </div>
                    <div className='Shifttime'>16:15PM - 05:15AM </div>
                  </div>
                  <div className='Shift-OPTONS'>
                    <span className=''>
                      <Fab size='small' aria-label='Edit' className=''>
                        <span className='mdi mdi-pencil-outline Edit' title={t('Edit')} />
                      </Fab>
                    </span>
                    <span className='OPTONS-conteaner'>
                      <Fab size='small' aria-label='Edit' className=''>
                        <span className='mdi mdi-delete Deleted ' title={t('Edit')} />
                      </Fab>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
//            {[1, 2, 3].map((x) => (
