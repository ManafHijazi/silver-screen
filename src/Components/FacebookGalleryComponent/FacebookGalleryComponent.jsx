import React, {
 useCallback, useEffect, useRef, useState
} from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DefaultImagesEnum } from '../../Enums';
import { DialogComponent } from '../DialogComponent/DialogComponent';
import { LoadableImageComponant } from '../LoadableImageComponant/LoadableImageComponant';
import { getDownloadableLink } from '../../Helper';
import { useLocalStorage } from '../../Hooks';

export const FacebookGalleryComponent = ({
  data,
  titleText,
  parentTranslationPath,
  translationPath,
  imageInput,
  defaultImage,
  isOpen,
  onOpenChanged,
  keyRef,
  altInput,
  alt,
  activeImageIndex,
}) => {
  const { t } = useTranslation([parentTranslationPath, 'Shared']);
  const [activeImage, setActiveImage] = useState(null);
  const [currentDirection] = useLocalStorage('localization', { isRtl: false });
  const thumbnailWrapperRef = useRef(null);
  const scrollTimer = useRef(null);
  const [scrollCurrentItem, setScrollCurrentItem] = useState(0);
  // const [navigators, setNavigators] = useState({
  //   previous: false,
  //   next: false,
  // });
  const dataReturn = (dataItem, dataPath) => {
    if (!dataPath) return dataItem;
    if (!dataPath.includes('.')) return dataItem[dataPath] || `${dataItem[dataPath]}`;
    let a = dataItem;
    dataPath.split('.').map((item) => {
      a = a[item];
      return item;
    });
    return a;
  };
  const activeImageHandler = useCallback(
    (item, index) => () => {
      setScrollCurrentItem(index);
    },
    []
  );
  const scrollPositionHandler = useCallback(() => {
    const element = thumbnailWrapperRef.current;
    if (
      !(element && element.firstChild && element.firstChild.childNodes.length > scrollCurrentItem)
    )
      return;
    const nodeElement = element.firstChild.childNodes[scrollCurrentItem];
    const isVisable =
      (currentDirection.isRtl &&
        nodeElement.offsetLeft < element.scrollLeft &&
        nodeElement.offsetLeft - nodeElement.offsetWidth >
          element.offsetWidth - element.scrollLeft) ||
      (nodeElement.offsetLeft > element.scrollLeft &&
        nodeElement.offsetLeft + nodeElement.offsetWidth <
          element.offsetWidth + element.scrollLeft);
    if (!isVisable) {
      element.scrollTo({
        left: nodeElement.offsetLeft - 35,
        behavior: 'smooth',
      });
    }
  }, [currentDirection.isRtl, scrollCurrentItem]);

  const toHandler = (direction) => () => {
    // const element = thumbnailWrapperRef.current;
    // if (!getIsScrollable(direction)) return;
    setScrollCurrentItem((item) => {
      let currentItemLocal = item;
      if (direction === 'next') currentItemLocal += 1;
      else currentItemLocal -= 1;
      return currentItemLocal;
    });
  };
  useEffect(() => {
    scrollPositionHandler();
  }, [scrollPositionHandler, scrollCurrentItem]);
  useEffect(() => {
    setActiveImage((data && data.length > scrollCurrentItem && data[scrollCurrentItem]) || null);
  }, [data, scrollCurrentItem]);

  useEffect(() => {
    setScrollCurrentItem(0);
  }, [currentDirection.isRtl]);
  useEffect(() => {
    if (data && data.length > activeImageIndex && data[activeImageIndex]) {
      setActiveImage(data[activeImageIndex]);
      setScrollCurrentItem(activeImageIndex);
    }
  }, [activeImageIndex, data]);
  useEffect(
    () => () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    },
    []
  );
  return (
    <DialogComponent
      titleText={titleText}
      //   maxWidth='sm'
      dialogContent={(
        <div className='facebook-gallery-wrapper'>
          {activeImage && (
            <div className='facebook-gallery-active-wrapper'>
              <div className='facebook-gallery-active-image-wrapper'>
                <LoadableImageComponant
                  classes='facebook-gallery-active-image'
                  alt={
                    (altInput && dataReturn(activeImage, altInput)) || t(`${translationPath}${alt}`)
                  }
                  src={
                    (imageInput &&
                      dataReturn(activeImage, imageInput) &&
                      getDownloadableLink(dataReturn(activeImage, imageInput))) ||
                    defaultImage
                  }
                />
              </div>
            </div>
          )}
          {data && data.length > 0 && (
            <div className='w-100 d-flex-center flex-wrap mb-2'>
              <ButtonBase
                className='btns-icon theme-solid mx-2 mb-2'
                disabled={scrollCurrentItem === 0}
                onClick={toHandler('previous')}
              >
                <span className='mdi mdi-chevron-left' />
              </ButtonBase>
              <ButtonBase
                className='btns-icon theme-solid mx-2 mb-2'
                disabled={scrollCurrentItem >= data.length - 1}
                onClick={toHandler('next')}
              >
                <span className='mdi mdi-chevron-right' />
              </ButtonBase>
            </div>
          )}
          {data && data.length > 0 && (
            <div className='facebook-gallery-thumbnail-wrapper' ref={thumbnailWrapperRef}>
              <div className='facebook-gallery-thumbnail-items-wrapper'>
                {data.map((image, index) => (
                  <ButtonBase
                    onClick={activeImageHandler(image, index)}
                    className={`facebook-gallery-thumbnail-item${
                      (activeImage &&
                        dataReturn(activeImage, imageInput) === dataReturn(image, imageInput) &&
                        ' active-image') ||
                      ''
                    }`}
                    key={`${keyRef}${index + 1}`}
                  >
                    <LoadableImageComponant
                      classes='facebook-gallery-thumbnail-image'
                      alt={
                        (altInput && dataReturn(activeImage, altInput)) ||
                        t(`${translationPath}${alt}`)
                      }
                      src={
                        (imageInput &&
                          dataReturn(image, imageInput) &&
                          getDownloadableLink(dataReturn(image, imageInput))) ||
                        defaultImage
                      }
                    />
                  </ButtonBase>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      isOpen={isOpen}
      saveType='button'
      parentTranslationPath={parentTranslationPath}
      translationPath={translationPath}
      onCloseClicked={onOpenChanged}
      onCancelClicked={onOpenChanged}
    />
  );
};

FacebookGalleryComponent.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  defaultImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(Object.values(DefaultImagesEnum).map((item) => item.defaultImg)),
  ]),
  onOpenChanged: PropTypes.func.isRequired,
  activeImageIndex: PropTypes.number,
  titleText: PropTypes.string,
  altInput: PropTypes.string,
  imageInput: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  translationPath: PropTypes.string,
  keyRef: PropTypes.string,
  isOpen: PropTypes.bool,
  alt: PropTypes.string,
};
FacebookGalleryComponent.defaultProps = {
  defaultImage: DefaultImagesEnum.buildings.defaultImg,
  activeImageIndex: 0,
  titleText: undefined,
  imageInput: null,
  parentTranslationPath: '',
  translationPath: '',
  keyRef: 'imageGalleryRef',
  altInput: null,
  alt: null,
  isOpen: false,
};
