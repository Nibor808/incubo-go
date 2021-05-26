import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { Errors } from './Contact';

type ContactFormProps = {
  sendMail: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => void;
  errors: Errors;
  showResponse: () => JSX.Element | null;
  recaptchaRef:
    | string
    | ((instance: ReCAPTCHA | null) => void)
    | React.RefObject<ReCAPTCHA>
    | null
    | undefined;
  buttonText: string;
  isSending: boolean;
};

const ContactForm = ({
  sendMail,
  onChange,
  errors,
  showResponse,
  recaptchaRef,
  buttonText,
  isSending,
}: ContactFormProps) => {
  return (
    <div className='row' data-testid='contact-form'>
      <div className='col-1 col-md-1 sidebar' />

      <div className='col-sm-8 col-lg-6'>
        <form onSubmit={sendMail} method='post' id='contact-form'>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <span className='error'>{errors.nameError}</span>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              onChange={ev => onChange(ev, 'name')}
              style={{ border: errors.nameErrorBorder }}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <span className='error'>{errors.emailError}</span>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              onChange={ev => onChange(ev, 'email')}
              style={{ border: errors.emailErrorBorder }}
            />
            <small>
              Your information will never be stored nor shared. Full stop.
            </small>
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Message
            </label>
            <span className='error'>{errors.messageError}</span>
            <textarea
              rows={3}
              className='form-control'
              id='message'
              name='message'
              onChange={ev => onChange(ev, 'message')}
              style={{ border: errors.messageErrorBorder }}
            />
          </div>

          <div className='mb-3'>
            <span className='error'>{errors.captchaError}</span>
            <ReCAPTCHA
              ref={recaptchaRef}
              size='normal'
              sitekey='6LcNF-oUAAAAAEMyOzk5t1xUwJJgXSoVJfggilv2'
            />
          </div>

          <div className='send-div'>
            <button type='submit' disabled={isSending}>
              {buttonText}
            </button>

            {showResponse()}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
