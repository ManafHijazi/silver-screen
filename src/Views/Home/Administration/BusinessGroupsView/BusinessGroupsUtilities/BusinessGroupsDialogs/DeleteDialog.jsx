import React from 'react';
import {
 Button, DialogTitle, DialogActions, Dialog
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DeleteBusinessGroup } from '../../../../../../Services/BusinessGroupsServices';
import { showSuccess } from '../../../../../../Helper';

const DeleteDialog = (props) => {
  const { t } = useTranslation('BusinessGroupsView');
  const handleDeleteButton = async () => {
    await DeleteBusinessGroup(props.deletedId);
    props.close();
    props.reloadData();
    showSuccess(t('DeleteDialog.NotificationDeleteGroup'));
  };

  return (
    <Dialog open={props.open} className='delete-group-dialog'>
      <DialogTitle>
        {t('DeleteDialog.DeleteText')}
        {' '}
        {props.name}
        ?
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => props.close()}
          color='primary'
          className='btns theme-solid bg-cancel'
        >
          {t('DeleteDialog.Cancel')}
        </Button>
        <Button className='btns theme-solid' onClick={handleDeleteButton} variant='contained'>
          {t('DeleteDialog.Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
