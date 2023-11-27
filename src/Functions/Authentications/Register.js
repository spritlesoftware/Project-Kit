// RegisterLogic.js
import {useState} from 'react';

// Custom hook for handling logic related to user registration
const RegisterLogic = navigation => {
  // State variables for user input and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);

  // Custom function for user signup logic
  const userSignUp = () => {
    setisLoading(false);
    navigation.navigate('Login'); // Navigate to the Login screen after successful signup
  };

  // Function to handle user signup button press
  const onPressSignUp = async () => {
    if (!email.trim()) {
      setInvalidEmail(true);
      return;
    } else if (!password.trim()) {
      setInvalidEmail(false);
      setInvalidPassword(true);
      return;
    } else if (!confirmPassword.trim()) {
      setInvalidEmail(false);
      setInvalidConfirmPassword(true);
      return;
    } else {
      setisLoading(true);
      setInvalidEmail(false);
      setInvalidPassword(false);
      userSignUp(); // Perform user signup
    }
  };

  // Function to handle email input change
  const handleEmailChange = text => {
    setApiError(false);
    setInvalidEmail(false);
    setEmail(text);
  };

  // Function to handle password input change
  const handlePasswordChange = text => {
    setApiError(false);
    setInvalidPassword(false);
    setPassword(text);
  };

  // Function to handle confirm password input change
  const handleConfirmPasswordChange = text => {
    setApiError(false);
    setInvalidConfirmPassword(false);
    setConfirmPassword(text);
  };

  // Returning values and functions to be used by the Register component
  return {
    email,
    password,
    confirmPassword,
    invalidEmail,
    invalidPassword,
    invalidConfirmPassword,
    apiError,
    apiErrorMessage,
    isLoading,
    onPressSignUp,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};

export default RegisterLogic;
