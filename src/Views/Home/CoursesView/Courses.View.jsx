/* eslint-disable no-unused-vars */
import { Button, ButtonBase, Fab } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { InnerHeaderComponent } from '../../../Components';
import { ContactTypeEnum } from '../../../Enums';
import { GlobalHistory } from '../../../Helper';
import wallpaper from '../../../assets/images/defaults/wallpaper-card.png';

const parentTranslationPath = 'CoursesView';
const translationPath = '';

export const CoursesView = () => {
  const { t } = useTranslation(parentTranslationPath);
  const pathName = window.location.pathname.split('/home/')[1].split('/view')[0];
  const [isLoading, setIsLoading] = useState(false);
  const [activeSideButton, setActiveSideButton] = useState(1);
  const count = [1, 2, 1, 2, 1, 2];

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
  const [sideList] = useState([
    {
      key: 1,
      value: t('Requirements'),
    },
    {
      key: 2,
      value: t('Applicants'),
    },
    {
      key: 3,
      value: t('Settings'),
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
      <div className='CoursesView-wraperr'>
        <div className='cards-container'>
          {[1, 2, 3, 4, 5].map((x) => (
            <div className='card-wraper'>
              <div className='card-container'>
                <div className='card'>
                  <img src={wallpaper} alt='tag-curve-img' className='card-img' />
                  <div>
                    <h2>Introduction to Design</h2>
                  </div>
                  <div className='des-text'>
                    {' '}
                    Brainstorm to create a list of constraints that may significantly affect the
                    design of courses
                  </div>
                  <div className='bbt-start'>
                    <Button>
                      <span>{t(`${translationPath}Start Courses`)}</span>
                    </Button>
                  </div>
                  <div className='action-conteaner'>
                    <div className='actions-btt'>
                      <span> 5 Lessons</span>
                    </div>
                    <div className='actions-btt'>
                      <span>45 Peoples</span>
                    </div>
                    <div className='actions-btt-l'>
                      <span> 03 hours</span>
                    </div>
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
