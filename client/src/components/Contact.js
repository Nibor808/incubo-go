import React, { useState, useRef, Suspense } from 'react';
import validateForm from '../utils/validate_form';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';
const ContactForm = React.lazy(() => import('./ContactForm'));

const Contact = () => {
  const recaptchaRef = useRef({});
  const ERROR_BORDER = '1px solid rgb(211, 0, 57)';
  const emailForm = document.getElementById('email-form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState({});
  const [errors, setErrors] = useState({
    nameError: '',
    nameErrorBorder: '',
    emailError: '',
    emailErrorBorder: '',
    messageError: '',
    messageErrorBorder: '',
  });
  const [buttonClicked, setButtonClicked] = useState(false);

  const validateValues = ev => {
    ev.preventDefault();

    const recaptchaValue = recaptchaRef.current.getValue();
    const frmError = validateForm(name, email, message);

    if (frmError) {
      switch (frmError.type) {
        case 'name':
          return setErrors({
            nameErrorBorder: ERROR_BORDER,
            nameError: frmError.msg,
          });
        case 'email':
          return setErrors({
            emailErrorBorder: ERROR_BORDER,
            emailError: frmError.msg,
          });
        case 'message':
          return setErrors({
            messageErrorBorder: ERROR_BORDER,
            messageError: frmError.msg,
          });
        default:
        // Do Nothing
      }
    }

    if (!recaptchaValue) {
      return setResponse({
        data: {
          Type: 'error',
          Message: 'Please check the captcha',
        },
      });
    }

    setButtonClicked(true);
    setResponse({});

    const info = JSON.stringify({
      name,
      email,
      message,
      recaptchaValue,
    });

    sendMail(info);
  };

  const sendMail = async info => {
    try {
      const response = await axios.post('/api/sendmail', info);

      setResponse(response);
    } catch (err) {
      setResponse({
        data: {
          Type: 'error',
          Message: 'Oops! We broke it. Please try again later.',
        },
      });
    } finally {
      recaptchaRef.current.reset();
      setButtonClicked(false);
      clearFormValues();

      setTimeout(() => {
        emailForm.reset();
        setResponse({});
      }, 3000);
    }
  };

  const showResponse = () => {
    let klass;

    if (response.data) {
      klass = response.data.Type === 'ok' ? 'success' : 'error';

      return <p className={klass}>{response.data.Message}</p>;
    }
  };

  const clearError = () => {
    return setErrors({
      nameErrorBorder: '',
      nameError: '',
      emailErrorBorder: '',
      emailError: '',
      messageErrorBorder: '',
      messageError: '',
    });
  };

  const clearFormValues = () => {
    setName('');
    setEmail('');
    setMessage('');
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
        <ErrorBoundary>
          <ContactForm
            validateValues={validateValues}
            onChange={handleChange}
            errors={{ ...errors }}
            showResponse={showResponse}
            recaptchaRef={recaptchaRef}
            buttonText={buttonText}
            buttonClicked={buttonClicked}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default Contact;
