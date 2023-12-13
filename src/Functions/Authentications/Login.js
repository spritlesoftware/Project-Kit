// LoginLogic.js
import {useState} from 'react';

const LoginLogic = navigation => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = () => {
    setIsLoading(false);
    navigation.replace('Logout');
  };

  const onPressSignin = async () => {
    if (!email.trim()) {
      setInvalidEmail(true);
      return;
    } else if (!password.trim()) {
      setInvalidEmail(false);
      setInvalidPassword(true);
      return;
    } else {
      setIsLoading(true);
      setInvalidEmail(false);
      setInvalidPassword(false);
      userLogin();
    }
  };

  const handleEmailChange = text => {
    setApiError(false);
    setInvalidEmail(false);
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setApiError(false);
    setInvalidPassword(false);
    setPassword(text);
  };

  return {
    email,
    password,
    invalidEmail,
    invalidPassword,
    apiError,
    apiErrorMessage,
    isLoading,
    setIsLoading,
    onPressSignin,
    handleEmailChange,
    handlePasswordChange,
  };
};

export default LoginLogic;
