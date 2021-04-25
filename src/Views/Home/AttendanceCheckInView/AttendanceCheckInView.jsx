import React, { useCallback, useState } from 'react';
import { ButtonBase } from '@material-ui/core';
import moment from 'moment';
import { InnerHeaderComponent, Inputs } from '../../../Components';
// import { GlobalHistory } from '../../../Helper';

export const AttendanceCheckInView = () => {
  const [activeSideButton, setActiveSideButton] = useState(1);
  const [chekedIn, setCheckedIn] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [checkInValue, setCheckInValue] = useState('');
  const [sideList] = useState([
    {
      key: 1,
      value: 'Attendance Check In/Out',
    },
    {
      key: 2,
      value: 'My Attendance',
    },
    {
      key: 3,
      value: 'Employee Attendance',
    },
    {
      key: 4,
      value: 'Attendance Settings',
    },
  ]);

  const activeSideButtonChange = useCallback((value) => {
    setActiveSideButton(value);
    // if (value === 2) GlobalHistory.push('');
  }, []);

  return (
    <div className='attendance-check-in-wrapper'>
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
      <div className='attendance-check-header'>
        <div className='attendance-check-filter'>
          <div className='dots-vertical'>
            <ButtonBase>
              <span className='mdi mdi-dots-vertical' />
            </ButtonBase>
          </div>
          <div className='filter-button'>
            <ButtonBase>
              <span className='mdi mdi-filter' />
              Filter
            </ButtonBase>
          </div>
          <div className='location-button'>
            <ButtonBase>Location</ButtonBase>
          </div>
        </div>
        <div className='attendance-check-search'>
          <div className='leave-button'>
            <ButtonBase>Add New Leave</ButtonBase>
          </div>
          <div className='search-text'>
            <Inputs
              onInputChanged={() => {}}
              endAdornment={<span className='mdi mdi-magnify px-2' />}
              wrapperClasses='theme-primary'
              fieldClasses='inputs theme-primary ml-2'
            />
          </div>
        </div>
      </div>
      <div className='attendance-check-content'>
        {!chekedIn ? (
          <div className='attendance-card'>
            <div>Welcome to Silverscreen</div>
            <div className='inner-content'>
              <div className='attendance-bar-code'>
                <img
                  src='https://jet-marking.com/wp-content/uploads/2017/04/pasted-image-0-1.png'
                  alt='bar-code'
                />
              </div>
              Or
              <div className='attendance-bar-number'>47853</div>
            </div>
            <div className='card-button'>
              <ButtonBase onClick={() => setCheckedIn(true)}>Enter to the company</ButtonBase>
            </div>
          </div>
        ) : (
          <div className='attendance-card'>
            <div className='user-header-title'>Hala! Abdul Aziz</div>
            <div className='attendance-user-image'>
              <img src='http://i.imgur.com/74sByqd.jpg' alt='user-id' />
            </div>
            <div className='user-title'>Abdul Aziz Kabalan</div>
            <div className='user-sub-title'>CEO, Director</div>
            <div className='user-pin-input'>
              <Inputs
                value={!logedIn ? checkInValue : `Checked In at ${moment(new Date()).format('hh:mm DD/mm/yyy')}`}
                onInputChanged={(event) => setCheckInValue(event.target.value)}
                wrapperClasses='theme-solid'
                fieldClasses='inputs theme-solid mt-2'
                inputPlaceholder='Type your 4 digits employee pin'
              />
            </div>
            <div className='card-button mt-1'>
              {logedIn ? (
                <ButtonBase onClick={() => {}}>Ok</ButtonBase>
              ) : (
                <ButtonBase onClick={() => setLogedIn(true)}>Check In</ButtonBase>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
