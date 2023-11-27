// useForgotPasswordLogic.js
import {useState} from 'react';

const ForgotPasswordLogic = navigation => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTokenSent, setIstokenSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitEmailAddress = async () => {
    if (!email.trim()) {
      errorMsg('Please Enter the Email Address');
    } else {
      setIsLoading(true);
      await sendToken();
      setIsLoading(false);
      setIstokenSent('123456');
    }
  };

  const errorMsg = msg => {
    setError(true);
    setErrorMessage(msg);
  };

  const verifyPassword = () => {
    if (!token.trim()) {
      setInvalidToken(true);
    } else if (
      !newPassword.trim() ||
      (newPassword && newPassword.length <= 7)
    ) {
      setInvalidPassword(true);
    } else if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setIsLoading(true);
      navigation.navigate('Login');
      setIsLoading(false);
    }
  };

  const sendToken = () => {
    setResendClicked(false);
  };

  return {
    email,
    setEmail,
    token,
    setToken,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isTokenSent,
    isLoading,
    setIsLoading,
    resendClicked,
    success,
    invalidToken,
    setInvalidToken,
    invalidPassword,
    setInvalidPassword,
    passwordMismatch,
    setPasswordMismatch,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    submitEmailAddress,
    sendToken,
    verifyPassword,
  };
};

export default ForgotPasswordLogic;
