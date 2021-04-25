/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
 FormControl, TextField, CircularProgress, ButtonBase
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../../Hooks';

export const Inputs = ({
  value,
  isRequired,
  isDisabled,
  idRef,
  onInputChanged,
  fieldClasses,
  wrapperClasses,
  labelClasses,
  translationPath,
  parentTranslationPath,
  labelValue,
  error,
  helperText,
  withLoader,
  autoCompleteParams,
  isLoading,
  variant,
  label,
  inputPlaceholder,
  rows,
  multiline,
  type,
  onInputBlur,
  onKeyUp,
  onKeyDown,
  buttonOptions,
  max,
  maxLength,
  min,
  minLength,
  step,
  endAdornment,
  startAdornment,
  beforeIconClasses,
  afterIconClasses,
  multiple,
  refs,
  isWithError,
  isSubmitted,
  overInputText,
  paddingReverse,
  overInputIcon,
  themeClass,
  defaultValue,
  charactersCounterClasses,
  isWithCharactersCounter,
  onInputFocus,
  onInputClick,
  autoComplete,
}) => {
  const [isBlurOrChanged, setIsBlurOrChanged] = useState(false);
  const { t } = useTranslation(parentTranslationPath);
  const [language] = useLocalStorage('localization', {
    currentLanguage: 'en',
    isRtl: false,
  });
  useEffect(() => {
    setIsBlurOrChanged(false);
  }, [isSubmitted]);
  return (
    <FormControl
      className={`input-wrapper ${wrapperClasses}${
        (startAdornment && ' with-start-andorment') || ''
      } ${themeClass}`}
    >
      {labelValue && (
        <label
          htmlFor={idRef}
          className={`label-wrapper ${labelClasses}${isDisabled ? ' disabled' : ''}`}
        >
          {t(`${translationPath}${labelValue}`)}
        </label>
      )}
      <div
        className={`w-100 p-relative ${
          (isWithCharactersCounter && 'd-flex flex-wrap') || 'd-flex-center'
        }`}
      >
        {beforeIconClasses && (
          <span className={`before-icon-classes-wrapper ${beforeIconClasses}`} />
        )}
        {(overInputText || overInputIcon) && (
          <span className='over-input-wrapper'>
            {overInputIcon && <span className={overInputIcon} />}
            {overInputText && t(`${translationPath}${overInputText}`)}
          </span>
        )}
        <div className='text-field-wrapper'>
          <TextField
            {...autoCompleteParams}
            autoComplete={autoComplete}
            ref={refs}
            required={isRequired}
            disabled={isDisabled}
            className={`inputs ${fieldClasses}`}
            style={
              (language.isRtl && {
                paddingRight: paddingReverse,
              }) || {
                paddingLeft: paddingReverse,
              }
            }
            id={idRef}
            onFocus={onInputFocus}
            label={label && t(`${translationPath}${label}`)}
            placeholder={inputPlaceholder && t(`${translationPath}${inputPlaceholder}`)}
            variant={variant}
            helperText={
              helperText &&
              ((isWithError && (isBlurOrChanged || isSubmitted) && error && helperText) ||
                (!isWithError && t(`${translationPath}${helperText}`)))
            }
            value={value}
            defaultValue={defaultValue}
            error={
              (isWithError && (isBlurOrChanged || isSubmitted) && error) ||
              (!isWithError && !isBlurOrChanged && error)
            }
            rows={rows}
            onClick={onInputClick}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            type={type}
            multiline={multiline}
            onChange={
              ((onInputChanged || isWithError) &&
                ((event) => {
                  if (!isBlurOrChanged) setIsBlurOrChanged(true);
                  if (onInputChanged) onInputChanged(event);
                })) ||
              undefined
            }
            onBlur={(event) => {
              setIsBlurOrChanged(true);
              if (onInputBlur) onInputBlur(event);
            }}
            inputProps={{
              max,
              maxLength,
              min,
              minLength,
              step,
              multiple,
              ...autoCompleteParams.inputProps,
              autoComplete,
            }}
            InputProps={{
              ...autoCompleteParams.InputProps,
              endAdornment:
                (withLoader && isLoading && !endAdornment && (
                  <CircularProgress color='inherit' size={20} />
                )) ||
                endAdornment ||
                (autoCompleteParams.InputProps && autoCompleteParams.InputProps.endAdornment) ||
                undefined,
              startAdornment:
                startAdornment ||
                (autoCompleteParams.InputProps && autoCompleteParams.InputProps.startAdornment) ||
                undefined,
            }}
          />
          {afterIconClasses && (
            <span className={`after-icon-classes-wrapper ${afterIconClasses}`} />
          )}
          {buttonOptions && (
            <ButtonBase
              className={`ml-2-reversed mt-1 ${buttonOptions.className}`}
              onClick={buttonOptions.onActionClicked}
              disabled={buttonOptions.isDisabled}
            >
              <span className={buttonOptions.iconClasses} />
            </ButtonBase>
          )}
        </div>
        {isWithCharactersCounter && (
          <div className={`characters-counter-wrapper ${charactersCounterClasses}`}>
            <span>{(value && value.length) || (defaultValue && defaultValue.length) || 0}</span>
            <span className='px-1'>{t('Shared:charaters')}</span>
          </div>
        )}
      </div>
    </FormControl>
  );
};

Inputs.propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  defaultValue: PropTypes.oneOfType([PropTypes.any]),
  startAdornment: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func, PropTypes.node]),
  endAdornment: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func, PropTypes.node]),
  onInputChanged: PropTypes.func,
  onInputBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  idRef: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  minLength: PropTypes.number,
  step: PropTypes.number,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
  withLoader: PropTypes.bool,
  multiline: PropTypes.bool,
  fieldClasses: PropTypes.string,
  autoCompleteParams: PropTypes.instanceOf(Object),
  wrapperClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  translationPath: PropTypes.string,
  parentTranslationPath: PropTypes.string,
  labelValue: PropTypes.string,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  type: PropTypes.string,
  rows: PropTypes.number,
  beforeIconClasses: PropTypes.string,
  afterIconClasses: PropTypes.string,
  multiple: PropTypes.bool,
  refs: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  isWithError: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  overInputText: PropTypes.string,
  paddingReverse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overInputIcon: PropTypes.string,
  themeClass: PropTypes.oneOf([
    'theme-default',
    'theme-solid',
    'theme-dark',
    'theme-underline',
    'theme-default-dark',
    'theme-transparent',
  ]),
  charactersCounterClasses: PropTypes.string,
  autoComplete: PropTypes.string,
  isWithCharactersCounter: PropTypes.bool,
  onInputFocus: PropTypes.func,
  onInputClick: PropTypes.func,
  buttonOptions: PropTypes.shape({
    className: PropTypes.string,
    iconClasses: PropTypes.string,
    onActionClicked: PropTypes.func,
    isDisabled: PropTypes.bool,
    isRequired: PropTypes.bool,
  }),
};
Inputs.defaultProps = {
  defaultValue: undefined,
  onInputChanged: undefined,
  onInputBlur: undefined,
  onKeyUp: undefined,
  onKeyDown: undefined,
  max: undefined,
  maxLength: undefined,
  min: undefined,
  minLength: undefined,
  step: undefined,
  value: undefined,
  beforeIconClasses: undefined,
  afterIconClasses: undefined,
  isWithError: false,
  isSubmitted: false,
  overInputText: undefined,
  paddingReverse: undefined,
  overInputIcon: undefined,
  themeClass: 'theme-default',
  multiple: false,
  refs: undefined,
  isRequired: false,
  isDisabled: false,
  error: false,
  multiline: false,
  isWithCharactersCounter: false,
  fieldClasses: '', // inputs theme-underline
  labelClasses: '',
  wrapperClasses: '',
  charactersCounterClasses: '',
  translationPath: '',
  parentTranslationPath: '',
  variant: 'standard',
  labelValue: null,
  label: null,
  inputPlaceholder: null,
  helperText: '',
  withLoader: false,
  isLoading: false,
  type: 'text',
  rows: 1,
  autoComplete: 'new-password',
  startAdornment: null,
  endAdornment: null,
  buttonOptions: null,
  onInputFocus: undefined,
  onInputClick: undefined,
  autoCompleteParams: {},
};
