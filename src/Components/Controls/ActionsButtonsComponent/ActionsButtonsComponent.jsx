import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { ActionsButtonsEnum } from '../../../Enums';
import { SelectComponet } from '../SelectComponent/SelectComponent';

const translationPath = 'Shared:actions-buttons.';
const ActionsButtonsComponent = ({
  onActionButtonChanged,
  onActionsButtonClicked,
  onFormTypeSelectChanged,
  withType,
  typeData,
  isDisabled,
  wrapperClasses,
  enableMerge,
  enableBulk,
}) => {
  const { t } = useTranslation('Shared');
  const [activeAction, setActiveAction] = useState(() => ActionsButtonsEnum[1]);
  const [actionData, setActionData] = useState([]);
  const onSelectChanged = useCallback(
    (selectedValue) => {
      setActiveAction(selectedValue);
      if (onActionButtonChanged) onActionButtonChanged(selectedValue.id);
    },
    [onActionButtonChanged, setActiveAction]
  );
  const getActionData = useCallback(() => {
    if (enableMerge)
      setActionData([ActionsButtonsEnum[1], ActionsButtonsEnum[2], ActionsButtonsEnum[3]]);
    else if (enableBulk)
      setActionData([ActionsButtonsEnum[1], ActionsButtonsEnum[3], ActionsButtonsEnum[4]]);
    else setActionData([ActionsButtonsEnum[1], ActionsButtonsEnum[3]]);
  }, [enableBulk, enableMerge]);
  useEffect(() => {
    getActionData();
  }, [getActionData]);
  return (
    <div className={`actions-buttons-wrapper ${wrapperClasses}`}>
      <div className='d-inline-flex'>
        {(!withType || activeAction !== ActionsButtonsEnum[1]) && (
          <Button
            disabled={isDisabled}
            type='button'
            onClick={() => onActionsButtonClicked(activeAction.id)}
            className={`btns theme-solid ${activeAction.classes}`}
          >
            <span>{t(translationPath + activeAction.buttonLabel)}</span>
          </Button>
        )}
        {withType && activeAction === ActionsButtonsEnum[1] && (
          <SelectComponet
            data={typeData}
            defaultValue={-1}
            emptyItem={{ value: -1, text: 'add', isHiddenOnOpen: true }}
            valueInput='id'
            translationPath={translationPath}
            onSelectChanged={onFormTypeSelectChanged}
            wrapperClasses='bg-secondary c-white mx-2'
            themeClass='theme-action-buttons'
            idRef='contactsActionsRef'
            keyValue='actionsbuttons'
            keyLoopBy='id'
            translationPathForData={translationPath}
            textInput='name'
          />
        )}
      </div>
      {onActionButtonChanged && (
        <div className='d-inline-flex'>
          <SelectComponet
            data={actionData}
            defaultValue={ActionsButtonsEnum[1]}
            onSelectChanged={onSelectChanged}
            themeClass='theme-action-buttons'
            idRef='contactsActionsRef'
            keyValue='actionsbuttons'
            keyLoopBy='id'
            translationPathForData={translationPath}
            textInput='label'
          />
        </div>
      )}
    </div>
  );
};
ActionsButtonsComponent.propTypes = {
  onActionButtonChanged: PropTypes.func,
  onFormTypeSelectChanged: PropTypes.func,
  onActionsButtonClicked: PropTypes.func,
  wrapperClasses: PropTypes.string,
  withType: PropTypes.bool,
  typeData: PropTypes.instanceOf(Array),
  isDisabled: PropTypes.bool,
  enableMerge: PropTypes.bool,
  enableBulk: PropTypes.bool,
};

ActionsButtonsComponent.defaultProps = {
  onActionButtonChanged: undefined,
  onFormTypeSelectChanged: undefined,
  onActionsButtonClicked: undefined,
  withType: false,
  wrapperClasses: '',
  typeData: [],
  isDisabled: false,
  enableMerge: true,
  enableBulk: false,
};

export { ActionsButtonsComponent };
