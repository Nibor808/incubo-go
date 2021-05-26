import { FormError } from '../components/Contact';

const ValidateForm = (
  name: string,
  email: string,
  message: string,
  captchaValue: string | null | undefined
) => {
  const errors: FormError = { msg: '', type: '' };

  if (!name) {
    errors.msg = 'But... what should I call you?';
    errors.type = 'name';

    return errors;
  }

  if (!email) {
    errors.msg = 'How about an email?';
    errors.type = 'email';

    return errors;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.msg = "I don't think that one will work.";
    errors.type = 'email';

    return errors;
  }

  if (!message) {
    errors.msg = "Ok I'll guess. You want to talk about...";
    errors.type = 'message';

    return errors;
  }

  if (!captchaValue) {
    errors.msg = 'Please check the captcha';
    errors.type = 'captcha';

    return errors;
  }

  return errors;
};

export default ValidateForm;
