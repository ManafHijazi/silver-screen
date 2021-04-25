import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
// import { sideMenuComponentUpdate, sideMenuIsOpenUpdate } from '../../../../../../Helper';
// import { ImportDetailsComponent } from '../ImportDetailsComponent/ImportDetailsComponent';
import { useEventListener } from '../../../../../../Hooks';

export const ImportDetailsCardComponent = ({
 data, translationPath, onLoadMore, isLoading
}) => {
  const { t } = useTranslation('ImportDetailsView');
  // setSelected
  const [selected] = useState(null);
  // const cardClicked = useCallback(
  //   (selectedItem, selectedIndex) => () => {
  //     setSelected(selectedIndex);
  //     sideMenuComponentUpdate(
  //       <ImportDetailsComponent activeItem={selectedItem} translationPath={translationPath} />
  //     );
  //     sideMenuIsOpenUpdate(true);
  //   },
  //   [translationPath]
  // );
  // useEffect(
  //   () => () => {
  //     sideMenuComponentUpdate(null);
  //     sideMenuIsOpenUpdate(false);
  //   },
  //   []
  // );
  const onScrollHandler = useCallback(() => {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.scrollHeight &&
      data.result.length < data.totalCount &&
      isLoading !== true
    )
      onLoadMore();
  }, [data.result.length, data.totalCount, isLoading, onLoadMore]);
  useEventListener('scroll', onScrollHandler);
  useEffect(() => {
    if (
      data.result.length < data.totalCount &&
      document.body.scrollHeight <= document.body.clientHeight &&
      isLoading !== true
    )
      onScrollHandler();
  }, [data.result.length, data.totalCount, isLoading, onScrollHandler]);
  return (
    <div className='import-details-card-wrapper'>
      {data.result.map((item, index) => (
        <div className='item-section' key={`importDetailsCardRef${index + 1}`}>
          <ButtonBase
            className={`box-wrapper texts-truncate${(selected === index && ' selected') || ''}`}
            // onClick={cardClicked(item, index)}
          >
            <div className='d-inline-flex-column px-3 h-100 separator-v s-gray-primary s-reverse'>
              <span>{t(`${translationPath}row`)}</span>
              <span className='d-flex-center'>{item.fileRow}</span>
            </div>
            {(item.isValid && <span className='mdi mdi-check mdi-24px icon-circle px-2' />) || (
              <span className='mdi mdi-message-alert mdi-flip-h mdi-36px c-danger px-2' />
            )}

            <div className='ready-wrapper texts-truncate w-100 px-2'>
              <span>
                {t(`${translationPath}${(item.isValid && 'success') || 'failed-reasons'}`)}
                :
              </span>
              <span className='texts-truncate'>
                {t(`${translationPath}${(item.isValid && 'ready-for-import') || item.reason}`)}
              </span>
            </div>
          </ButtonBase>
        </div>
      ))}
    </div>
  );
};

ImportDetailsCardComponent.propTypes = {
  data: PropTypes.shape({
    result: PropTypes.instanceOf(Array),
    inValidTotalCount: PropTypes.number,
    validTotalCount: PropTypes.number,
    totalCount: PropTypes.number,
  }).isRequired,
  translationPath: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
