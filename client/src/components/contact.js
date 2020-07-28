import React, { useState, useRef, Suspense } from 'react';
import validateForm from '../utils/validate_form';
import axios from 'axios';
const ContactForm = React.lazy(() => import('./contact_form'));

export default () => {
  const recaptchaRef = useRef({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState({});
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [nameErrorBorder, setNameErrorBorder] = useState('');
  const [emailErrorBorder, setEmailErrorBorder] = useState('');
  const [messageErrorBorder, setMessageErrorBorder] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const sendMail = async ev => {
    ev.preventDefault();

    const emailForm = document.getElementById('email-form');

    const frmError = await validateForm(name, email, message);

    const ERROR_BORDER = '1px solid rgb(211, 0, 57)';

    if (frmError) {
      switch (frmError.type) {
        case 'name':
          setNameErrorBorder(ERROR_BORDER);
          return setNameError(frmError.msg);
        case 'email':
          setEmailErrorBorder(ERROR_BORDER);
          return setEmailError(frmError.msg);
        case 'message':
          setMessageErrorBorder(ERROR_BORDER);
          return setMessageError(frmError.msg);
        default:
          setNameErrorBorder('');
      }
    }

    const recaptchaValue = recaptchaRef.current.getValue();

    if (!recaptchaValue) {
      return setResponse({
        data: {
          Type: 'error',
          Message: 'Please check the captcha',
        },
      });
    } else {
      setButtonClicked(true);
      setResponse({});

      const info = JSON.stringify({
        name,
        email,
        message,
        recaptchaValue,
      });

      const response = await axios.post('/api/sendmail', info);

      if (response.data.Type === 'ok') {
        emailForm.reset();
        recaptchaRef.current.reset();
        setButtonClicked(false);
      }

      setResponse(response);
      setButtonClicked(false);

      setTimeout(() => {
        setResponse({});
      }, 3000);
    }
  };

  const showResponse = () => {
    let klass;

    if (response.data) {
      response.data.Type === 'ok' ? (klass = 'success') : (klass = 'error');

      return <p className={klass}>{response.data.Message}</p>;
    }
  };

  const clearError = () => {
    setNameError('');
    setEmailError('');
    setMessageError('');
    setNameErrorBorder('');
    setEmailErrorBorder('');
    setMessageErrorBorder('');
  };

  const handleChange = (ev, type) => {
    if (type === 'name') setName(ev.target.value);
    else if (type === 'email') setEmail(ev.target.value);
    else if (type === 'message') setMessage(ev.target.value);

    clearError();
  };

  const buttonText = buttonClicked ? 'Sending...' : 'Send';

  return (
    <div data-testid='contact-div'>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactForm
          sendMail={sendMail}
          onChange={handleChange}
          errors={{
            nameError,
            emailError,
            messageError,
          }}
          borders={{
            nameErrorBorder,
            emailErrorBorder,
            messageErrorBorder,
          }}
          showResponse={showResponse}
          recaptchaRef={recaptchaRef}
          buttonText={buttonText}
          buttonClicked={buttonClicked}
        />
      </Suspense>
    </div>
  );
};
