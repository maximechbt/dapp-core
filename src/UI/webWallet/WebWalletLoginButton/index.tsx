import React, { ReactNode } from 'react';
import { useWebWalletLogin } from 'hooks/login/useWebWalletLogin';
import { OnProviderLoginType } from '../../../types';
import { LoginButton } from '../../LoginButton/LoginButton';

export interface WebWalletLoginButtonPropsType
  extends Omit<OnProviderLoginType, 'onLoginRedirect'> {
  className?: string;
  buttonClassName?: string;
  children?: ReactNode;
  loginButtonText?: string;
  disabled?: boolean;
}

export const WebWalletLoginButton: (
  props: WebWalletLoginButtonPropsType
) => JSX.Element = ({
  children,
  token,
  className = 'dapp-web-wallet-login',
  callbackRoute,
  buttonClassName,
  loginButtonText = 'Elrond Web Wallet',
  disabled
}) => {
  const [onInitiateLogin] = useWebWalletLogin({
    callbackRoute,
    token
  });

  const handleLogin = () => {
    onInitiateLogin();
  };

  return (
    <LoginButton
      onLogin={handleLogin}
      className={className}
      btnClassName={buttonClassName}
      text={loginButtonText}
      disabled={disabled}
    >
      {children}
    </LoginButton>
  );
};
