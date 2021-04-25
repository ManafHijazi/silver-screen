import React, {
 memo, useState, useEffect, useCallback
} from 'react';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import { toCamelCase, GlobalHistory, GlobalTranslate } from '../../../../Helper';
import { ImportFileNotificationHub, ProcessStatusMethod } from '../../../../Hubs';
import { GetMyImportProcess } from '../../../../Services/File';

const translationPath = 'notificationsView.';
let notificationContext;
const getProccessName = (importProcceseType) => {
  if (importProcceseType === 1) return `${translationPath}contacts`;
  if (importProcceseType === 2) return `${translationPath}leads`;
  if (importProcceseType === 3) return `${translationPath}properties`;
  if (importProcceseType === 4) return `${translationPath}units`;
  if (importProcceseType === 5) return `${translationPath}companies`;
  return 'N/A';
};
const getHeaderName = (importProcceseStatus) => {
  if (importProcceseStatus === 1) return `${translationPath}reading-file`;
  if (importProcceseStatus === 2) return `${translationPath}reading-file-failed`;
  if (importProcceseStatus === 3) return `${translationPath}finish-reading-and-start-importing`;
  if (importProcceseStatus === 4) return `${translationPath}imported-successfully`;
  return 'N/A';
};
const getAction = (actionItem) => {
  // const { t } = GlobalTranslate;
  const object = {
    id: actionItem.importProcceseId,
    processName: null,
    type: null,
    header: null,
    text: null,
    withProgress: false,
  };

  object.processName = GlobalTranslate.t(`HeaderView:${getProccessName(actionItem.importProcceseType)}`);
  object.header = GlobalTranslate.t(`HeaderView:${getHeaderName(actionItem.importProcceseStatus)}`);
  if (actionItem.importProcceseStatus === 1) {
    object.text = `${object.header} ${actionItem.fileName}`;
    object.type = 4;
    object.withProgress = true;
  } else if (actionItem.importProcceseStatus === 2) {
    object.text = GlobalTranslate.t(`HeaderView:${translationPath}error-while-reading-file`) + actionItem.fileName;
    object.type = 3;
  } else if (actionItem.importProcceseStatus === 3) {
    object.text = `${object.header} ${object.processName}`;
    object.type = 4;
    object.withProgress = true;
  } else if (actionItem.importProcceseStatus === 4) {
    object.text = `${object.processName} ${object.header}`;
    object.type = 2;
  }

  return object;
};
const NotificationsView = memo(({
 isOpen, top, getCurrentNotificationNumber, loginResponse
}) => {
  const { t } = useTranslation('HeaderView');
  const [currentTab, setCurrentTab] = useState(0);
  const [actions, setActions] = useState([]);
  const [alerts] = useState([]);
  const [notificationsIcons] = useState([
    {
      type: 1,
      classes: 'icons circle-ripple i-cloud',
    },
    {
      type: 2,
      classes: 'icons circle-ripple bg-green-light i-upload',
    },
    {
      type: 3,
      classes: 'circle-ripple bg-warning-light mdi mdi-close',
    },
    {
      type: 4,
      classes: 'icons circle-ripple bg-info i-upload',
    },
    {
      type: 5,
      classes: 'icons circle-ripple bg-warning-light i-shield',
    },
  ]);
  const actionsHandler = useCallback((data) => {
    data.map((item) => {
      setActions((elements) => {
        const localActions = elements;
        const itemIndex = elements.findIndex((element) => element.id === item.importProcceseId);
        if (itemIndex === -1) return [...elements, { ...getAction(item) }];
        localActions[itemIndex] = getAction(item);
        return [...localActions];
      });
      return null;
    });
  }, []);
  const getIcon = (type) => notificationsIcons.find((item) => item.type === type).classes;
  const getActions = useCallback(() => {
    if (notificationContext) {
      notificationContext.on(ProcessStatusMethod, (data) => {
        if (data) {
          const result = toCamelCase(JSON.parse(data));
          result.time = moment().format('h:mm');
          actionsHandler([result]);
        } else setActions([]);
      });
    }
  }, [actionsHandler]);
  useEffect(() => {
    if (loginResponse) {
      if (!notificationContext) {
        notificationContext = ImportFileNotificationHub();
        notificationContext
          .start()
          .then(() => notificationContext.invoke('GetConnectionId'))
          .catch(() => {});
        GetMyImportProcess(1, 3).then((data) => {
          if (data) actionsHandler(data.result);
          else setActions([]);
        });
      }
    } else notificationContext = null;
  }, [actionsHandler, loginResponse]);
  const goToActions = useCallback(
    (action) => () => {
      if (action.type !== 2) return;
      GlobalHistory.push(`/home/import-details?id=${action.id}`);
    },
    []
  );
  useEffect(() => {
    getActions();
  }, [getActions]);
  const notificationsNumber = useCallback(() => {
    if (currentTab === 0) return actions.filter((item) => item.withProgress).length;
    return alerts.length;
  }, [actions, alerts, currentTab]);
  useEffect(() => {
    getCurrentNotificationNumber(notificationsNumber());
  }, [getCurrentNotificationNumber, notificationsNumber]);
  return (
    <Collapse in={isOpen} className="collapses absolute-collapse" style={{ top }}>
      <div className="cards">
        <div className="card-header">
          <p className="texts-large">
            {`${notificationsNumber()} ${t(
              `${translationPath}${currentTab === 1 ? 'new' : 'in-progress'}`
            )}`}
          </p>
          <p>{t(`${translationPath}user-notification`)}</p>
        </div>
        <div className="card-content p-0">
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            className="tabs-wrapper"
            aria-label="icon tabs example"
          >
            <Tab label={t(`${translationPath}actions`)} />
            <Tab label={t(`${translationPath}alerts`)} />
          </Tabs>
          {currentTab === 0
            && actions.length > 0
            && actions.map((item, index) => (
              <React.Fragment key={`actions${index + 1}`}>
                <div className="separator-h" />
                <ButtonBase className="btns theme-wide br-0" onClick={goToActions(item)}>
                  <span className={getIcon(item.type)} />
                  {' '}
                  <div className="d-inline-flex-column-center-v mx-3">
                    <span className="texts-large">{item.header}</span>
                    <span className="texts-small">{item.text}</span>
                  </div>
                </ButtonBase>
                {item.withProgress && <LinearProgress />}
              </React.Fragment>
            ))}

          <div className="separator-h mb-3" />
        </div>
        <div className="card-footer separator-h s-gray-primary pt-2">
          <ButtonBase className="btns theme-outline mb-1">
            <span>{t(`${translationPath}view-all`)}</span>
          </ButtonBase>
        </div>
      </div>
    </Collapse>
  );
});
const mapStateToProps = (state) => {
  const {
    login: { loginResponse },
  } = state;
  return {
    loginResponse,
  };
};

const store = connect(mapStateToProps)(NotificationsView);
NotificationsView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
  getCurrentNotificationNumber: PropTypes.func.isRequired,
  loginResponse: PropTypes.shape(undefined),
};
NotificationsView.defaultProps = {
  loginResponse: null,
};
export { store as NotificationsView };
