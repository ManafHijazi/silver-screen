import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
// import defaultLogo from '../../../assets/images/defaults/logo-crm.svg';
import {
 showSuccess, showError, GlobalHistory, languageChange
} from '../../../Helper';
import { config } from '../../../config';
// import { ApplicationLogin } from '../../services';
// import { LOGIN } from '../../../store/login/Actions';
import { CheckboxesComponent, Inputs, SelectComponet } from '../../../Components';
// import { LOGIN_SUCCESS } from '../../../store/login/Actions';

const translationPath = '';
const parentTranslationPath = 'LoginView';
function LoginView({ loginResponse }) {
  const { t } = useTranslation('LoginView');
  // const dispatch = useDispatch(LOGIN_SUCCESS);
  // const history = useHistory();
  const [loginDto, setLoginDto] = useState({
    identity: '',
    password: '',
    rememberMe: false,
    organizationId: config.organizationsId,
    applicationId: config.applicationId,
  });
  const [animationStartClasses, setAnimationStartClasses] = useState('');
  const [animationStart, setAnimationStart] = useState(false);
  const [isclick, setisclick] = useState(false);
  const validationHandler = () => {
    if (!loginDto.password || !loginDto.identity) return false;
    if (!loginDto.password) return false;
    return true;
  };
  const handleSubmit = (event) => {
    setisclick(true);
    event.preventDefault();
    if (validationHandler()) {
      // dispatch(LOGIN_SUCCESS(loginDto));
      localStorage.setItem(
        'session',
        JSON.stringify({
          email: 'manaf@gmail.com',
          expiration: '2021-04-26T19:02:09Z',
          fileToken: 'k4LAPeJpEKgraC0ZhsE8Q',
          fullName: 'Manaf Mohammed Hijazi',
          phoneNumber: '0790000000',
          profileImg: '1f0a5901-3d3e-43a1-98c5-d50617fe7272',
          refreshToken: '4277d8a2-7f99-4525-4bf6-08d8f4a5f11f',
          userId: '3311e798-93f9-4f91-bef3-abdfd8d40d81',
          userName: 'hijazi',
        })
      );
      showSuccess('Login Succssfuly');
      setAnimationStartClasses(' in-animate');
      setAnimationStart(true);
      setTimeout(() => {
        GlobalHistory.push('/home');
      }, 300);
      setisclick(false);
    }
  };
  useEffect(() => {
    if (loginResponse && !animationStart) {
      if (loginResponse.token) {
        localStorage.setItem('session', JSON.stringify(loginResponse));
        showSuccess('Login Succssfuly');
        setAnimationStartClasses(' in-animate');
        setAnimationStart(true);
        setTimeout(() => {
          GlobalHistory.push('/home');
        }, 300);
        setisclick(false);
      } else {
        showError(t(`${loginResponse.Message}`));
        setisclick(false);
      }
    }
    return () => {
      // login;
    };
  }, [loginResponse, animationStart, t]);
  const controlsHandler = useCallback(
    (input, process) => (event) => {
      setLoginDto({ ...loginDto, [input]: event.target[process] });
    },
    [setLoginDto, loginDto]
  );
  return (
    <div className='login-wrapper'>
      <div className='login-content-wrapper'>
        <div className='text-section-wrapper'>
          <div className='text-section-content'>
            <span className='texts-header '>{t(`${translationPath}welcome-to`)}</span>
            <span className='texts-header '>SILVER SCREEN</span>
            <span className='texts c-black-dark fz-30px'>{t(`${translationPath}login-desc`)}</span>
          </div>
        </div>
        <div className='box-section-wrapper'>
          <div className='box-content'>
            <div className='d-flex-v-center-h-between'>
              <div className='logo-wrapper'>
                {/* <img src={defaultLogo} className='logo' alt={t(`${translationPath}company-logo`)} /> */}
                <span className='logo-name'>SILVER SCREEN</span>
              </div>
              <div className='px-2'>
                <SelectComponet
                  data={i18next.languages}
                  value={i18next.language}
                  onSelectChanged={languageChange}
                  themeClass='theme-underline'
                />
              </div>
            </div>
            <form noValidate className='form-wrapper' onSubmit={handleSubmit}>
              <Inputs
                idRef='identityRef'
                wrapperClasses='theme-underline'
                label={t(`${translationPath}identity`)}
                inputPlaceholder={t(`${translationPath}ex-desc`)}
                value={loginDto.identity}
                onInputChanged={controlsHandler('identity', 'value')}
              />
              <Inputs
                idRef='passwordRef'
                wrapperClasses='theme-underline'
                type='password'
                label={t(`${translationPath}password`)}
                value={loginDto.password}
                onInputChanged={controlsHandler('password', 'value')}
              />
              <div className='d-flex-v-center-h-between mb-3'>
                <CheckboxesComponent
                  idRef='rememberMeRef'
                  parentTranslationPath={parentTranslationPath}
                  translationPath={translationPath}
                  label='remember-me'
                  singleChecked={loginDto.rememberMe}
                  themeClass='theme-secondary'
                  onSelectedCheckboxClicked={() => {
                    setLoginDto((items) => ({ ...items, rememberMe: !items.rememberMe }));
                  }}
                />
                <Link className='links'>
                  {/* to='/account/IdentityVerificationView' */}
                  {t(`${translationPath}forgot-password`)}
                </Link>
              </div>
              <div className='d-flex-v-center-h-end'>
                <div className={`animated-btn-wrapper${animationStartClasses}`}>
                  <Button
                    className='btns theme-solid'
                    type='submit'
                    disabled={isclick || !loginDto.identity || !loginDto.password}
                  >
                    <span>{t(`${translationPath}start`)}</span>
                  </Button>
                  <span className='mdi mdi-chevron-double-right animated-icon' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='light-shadow' />
      {/* <div className='city-wrapper'>
        <div className='city' />
        <div className='city-shadow' />
      </div> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  const {
    login: { loginResponse },
  } = state;
  return {
    loginResponse,
  };
};
LoginView.propTypes = {
  loginResponse: PropTypes.shape(undefined),
};
LoginView.defaultProps = {
  loginResponse: null,
};
const store = connect(mapStateToProps)(LoginView);

export { store as LoginView };
