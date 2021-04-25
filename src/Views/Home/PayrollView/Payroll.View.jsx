/* eslint-disable no-unused-vars */
import {
 Button, ButtonBase, Fab, IconButton
} from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ExpandMoreRounded, MoreVert } from '@material-ui/icons';
import { GlobalHistory } from '../../../Helper';
import { ContactTypeEnum } from '../../../Enums';
import { InnerHeaderComponent } from '../../../Components';

const parentTranslationPath = 'PayrollView';
const translationPath = '';

export const PayrollView = () => {
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

  function createData(img, name, calories, fat, carbs, protein) {
    return {
      img,
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }

  const rows = [
    createData(AVATARS, 'Frozen yoghurt', 'Melisandre', 'Jaime', 'Ferrara', 'Frances'),
    createData(AVATARS, 'Ice cream sandwich', 'Lannister', 'Snow', 'Clifford', 'Harvey'),
    createData(AVATARS, 'Eclair', 'Snow', 'Melisandre', 'Rossini', 'Rossini'),
    createData(AVATARS, 'Frozen yoghurt', 'Melisandre', 'Jaime', 'Ferrara', 'Frances'),
    createData(AVATARS, 'Ice cream sandwich', 'Lannister', 'Snow', 'Clifford', 'Harvey'),
    createData(AVATARS, 'Eclair', 'Snow', 'Melisandre', 'Rossini', 'Rossini'),
    createData(AVATARS, 'Cupcake', 'Lannister', 'Daenerys', 'Roxie', 'Stark'),
    createData(AVATARS, 'Gingerbread', 'ngzxcerbread', 'Daenerys', 'Cersei', 'Arya'),
    createData(AVATARS, 'Frozen yoghurt', 'Melisandre', 'Jaime', 'Ferrara', 'Frances'),
    createData(AVATARS, 'Ice cream sandwich', 'Lannister', 'Snow', 'Clifford', 'Harvey'),
    createData(AVATARS, 'Eclair', 'Snow', 'Melisandre', 'Rossini', 'Rossini'),
    createData(AVATARS, 'Cupcake', 'Lannister', 'Daenerys', 'Roxie', 'Stark'),
    createData(AVATARS, 'Gingerbread', 'ngzxcerbread', 'Daenerys', 'Cersei', 'Arya'),
    createData(AVATARS, 'Cupcake', 'Lannister', 'Daenerys', 'Roxie', 'Stark'),
    createData(AVATARS, 'Gingerbread', 'ngzxcerbread', 'Daenerys', 'Cersei', 'Arya'),
  ];

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
      </div>
      <div className='Payroll-View-wraperr'>
        <TableContainer component={Paper}>
          <Table size='small' className='Table-style' aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Name</TableCell>
                <TableCell align='left'>Basic Salaary</TableCell>
                <TableCell align='left'>Tickets</TableCell>
                <TableCell align='left'>Mobile</TableCell>
                <TableCell align='left'>Allowances</TableCell>
                <TableCell align='center'>
                  <span className='mdi mdi-cog' />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align='left'>
                    <div className='Table-Cell-img-user'>
                      <img src={pickRandom(row.img)} alt='tag-curve-img' className='user-img' />
                    </div>
                    <div>{row.fat}</div>
                  </TableCell>
                  <TableCell align='left' className='row-min-width'>
                    {row.name}
                  </TableCell>
                  <TableCell align='left'>{row.carbs}</TableCell>
                  <TableCell align='left'>{row.protein}</TableCell>
                  <TableCell align='left'>{row.calories}</TableCell>
                  <TableCell align='center'>
                    <div className='dots-vertical'>
                      <ButtonBase>
                        <span className='mdi mdi-dots-vertical' />
                      </ButtonBase>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
