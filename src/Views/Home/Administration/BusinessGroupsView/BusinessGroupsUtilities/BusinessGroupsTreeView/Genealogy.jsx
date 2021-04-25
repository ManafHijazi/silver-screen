/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DeleteDialog from '../BusinessGroupsDialogs/DeleteDialog';
import { ContactTypeEnum } from '../../../../../../Enums';

const Genealogy = (props) => {
  const { t } = useTranslation('BusinessGroupsView');
  const [deletedName, setDeletedName] = React.useState('');
  const [deletedId, setDeletedId] = React.useState(0);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const getChildByPairantId = (id) => {
    if (props.response && props.response.result)
      return props.response.result.filter((w) => w.businessGroupsParentId === id);
    return [];
  };

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

  return (
    <>
      {props.isVisible && props.Parent !== null && (
        <li>
          <div
            className={
              props.searchNode &&
              Array.isArray(props.searchNode) &&
              props.searchNode.find((el) => el.businessGroupsId === props.Parent.businessGroupsId) ?
                'searchedCard member-view-box' :
                'member-view-box'
            }
          >
            <div className='member-card no-bottom'>
              <div
                className='member-card-wraper'
                onClick={() =>
                  (getChildByPairantId(props.Parent.businessGroupsId).length > 0 ?
                    setIsVisible(!isVisible) :
                    '')}
              >
                <div className='member-card-action'>
                  <Tooltip title={t('Edit')} placement='top'>
                    <IconButton
                      size='small'
                      className=''
                      onClick={(e) => {
                        e.stopPropagation();
                        props.handleSentData(
                          props.Parent.businessGroupsName,
                          props.Parent.businessGroupsParentName,
                          props.Parent.businessGroupsId,
                          true,
                          props.Parent.businessGroupsParentId
                        );
                        props.setTreeGroup(true);
                        props.setopenAddDialog();
                      }}
                    >
                      <span className='mdi mdi-pencil-outline Edit' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('Delete')} placement='top'>
                    <IconButton
                      size='small'
                      aria-label='Edit'
                      className=''
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletedId(props.Parent.businessGroupsId);
                        setDeletedName(props.Parent.businessGroupsName);
                        setDeleteDialog(true);
                      }}
                    >
                      <span className='mdi mdi-window-close Deleted ' />
                    </IconButton>
                  </Tooltip>
                </div>
                <div
                  style={{
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${pickRandom(AVATARS)})`,
                  }}
                  alt='tag-curve-img'
                  className='tag-curve-img-employee'
                />
                <div className='member-card-name'>
                  {' '}
                  {pickRandom(Names)}
                  {' '}
                </div>
                <div className='member-card-title'> Software ENG </div>
              </div>
              <Grid container justify='center' className='collapseIcon'>
                <Grid item>
                  {isVisible ? (
                    ''
                  ) : (
                    <div
                      className={
                        isVisible ?
                          'triangleDown flex-the-action' :
                          'triangleDown flex-the-action-open'
                      }
                    >
                      <div className='buttom-action'>
                        <IconButton
                          onClick={() =>
                            (getChildByPairantId(props.Parent.businessGroupsId).length > 0 ?
                              setIsVisible(!isVisible) :
                              '')}
                        >
                          <span className='text-num'>{props.index.length + 2}</span>
                        </IconButton>
                      </div>
                    </div>
                  )}
                </Grid>
                <div className={isVisible ? 'add-bbt add-pt-lock' : 'add-bbt add-pt-open'}>
                  <Tooltip title={t('Add')}>
                    <IconButton
                      aria-label='add'
                      className=''
                      onClick={(e) => {
                        e.stopPropagation();
                        props.handleSentData(
                          props.Parent.businessGroupsName,
                          props.Parent.businessGroupsParentName,
                          props.Parent.businessGroupsId,
                          false,
                          props.Parent.businessGroupsParentId
                        );
                        props.setTreeGroup(true);
                        props.setopenAddDialog();
                      }}
                    >
                      <span className='mdi mdi-plus icon-arrow' />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
            </div>
          </div>
          {isVisible && getChildByPairantId(props.Parent.businessGroupsId).length > 0 && (
            <ul>
              {getChildByPairantId(props.Parent.businessGroupsId).map((item, i) => (
                <Genealogy
                  key={`${i + 1}-group`}
                  searchNode={props.searchNode}
                  isVisible={isVisible}
                  isTree={props.isTree}
                  setTreeGroup={(x) => props.setTreeGroup(x)}
                  reloadData={() => props.reloadData()}
                  Parent={item}
                  response={props.response}
                  handleSentData={props.handleSentData}
                  setopenAddDialog={() => props.setopenAddDialog()}
                />
              ))}
            </ul>
          )}
        </li>
      )}
      <DeleteDialog
        isTree={props.isTree}
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        deletedId={deletedId}
        name={deletedName}
        reloadData={() => props.reloadData(props.page + 1, props.rowsPerPage, props.searchedItem)}
      />
    </>
  );
};

export default Genealogy;
