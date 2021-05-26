import React, { Suspense, useRef, useState } from 'react';
import validateForm from '../utils/validate_form';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import ErrorBoundary from './ErrorBoundary';

const ContactForm = React.lazy(() => import('./ContactForm'));

type Response = {
  data: {
    Type: string;
    Message: string;
  };
};

export type MailInfo = {
  name: string;
  email: string;
  message: string;
};

export type FormError = {
  type: string;
  msg: string;
};

export type Errors = {
  nameError: string;
  nameErrorBorder: string;
  emailError: string;
  emailErrorBorder: string;
  messageError: string;
  messageErrorBorder: string;
  captchaError: string;
};

const Contact = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const ERROR_BORDER = '1px solid rgb(211, 0, 57)';
  const contactForm = document.getElementById(
    'contact-form'
  ) as HTMLFormElement;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<Response>({
    data: { Message: '', Type: '' },
  });
  const [errors, setErrors] = useState<Errors>({
    nameError: '',
    nameErrorBorder: '',
    emailError: '',
    emailErrorBorder: '',
    messageError: '',
    messageErrorBorder: '',
    captchaError: '',
  });
  const [isSending, setIsSending] = useState(false);

  const validateValues = (ev: React.FormEvent) => {
    ev.preventDefault();

    const captchaValue = recaptchaRef.current?.getValue();

    const formError: FormError = validateForm(
      name,
      email,
      message,
      captchaValue
    );

    if (formError) {
      switch (formError.type) {
        case 'name':
          setErrors({
            ...errors,
            nameErrorBorder: ERROR_BORDER,
            nameError: formError.msg,
          });

          return false;
        case 'email':
          setErrors({
            ...errors,
            emailErrorBorder: ERROR_BORDER,
            emailError: formError.msg,
          });

          return false;
        case 'message':
          setErrors({
            ...errors,
            messageErrorBorder: ERROR_BORDER,
            messageError: formError.msg,
          });

          return false;

        case 'captcha':
          setErrors({
            ...errors,
            captchaError: formError.msg,
          });

          return false;
        default:
        // Do Nothing
      }
    }

    setResponse({ data: { Message: '', Type: '' } });
    clearErrors();
    return true;
  };

  const sendMail = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (validateValues(ev)) {
      const info: MailInfo = {
        name,
        email,
        message,
      };

      try {
        const response = await axios.post('/api/sendmail', info);
        setIsSending(true);

        setResponse(response);
      } catch (err) {
        setResponse({
          data: {
            Type: 'error',
            Message: 'Oops! We broke it. Please try again later.',
          },
        });
      } finally {
        recaptchaRef.current?.reset();
        setIsSending(false);
        clearFormValues();

        setTimeout(() => {
          contactForm?.reset();
          setResponse({ data: { Message: '', Type: '' } });
        }, 3000);
      }
    }
  };

  const showResponse = () => {
    let klass;

    if (response.data) {
      klass = response.data.Type === 'ok' ? 'success' : 'error';

      return <p className={klass}>{response.data.Message}</p>;
    }

    return null;
  };

  const clearErrors = () => {
    return setErrors({
      nameErrorBorder: '',
      nameError: '',
      emailErrorBorder: '',
      emailError: '',
      messageErrorBorder: '',
      messageError: '',
      captchaError: '',
    });
  };

  const clearFormValues = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    if (type === 'name') setName(ev.target.value);
    else if (type === 'email') setEmail(ev.target.value);
    else if (type === 'message') setMessage(ev.target.value);

    clearErrors();
  };

  const buttonText = isSending ? 'Sending...' : 'Send';

  return (
    <div data-testid='contact-div'>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <ContactForm
            sendMail={sendMail}
            onChange={handleChange}
            errors={{ ...errors }}
            showResponse={showResponse}
            recaptchaRef={recaptchaRef}
            buttonText={buttonText}
            isSending={isSending}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default Contact;
