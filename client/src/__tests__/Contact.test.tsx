import ValidateForm from '../utils/validate_form';
import Contact from '../components/Contact';
import { render } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');

test('renders the Contact Component', () => {
  render(<Contact />);
});

describe('Validates Form', () => {
  test('validateForm returns name error when no name present', () => {
    const errors = ValidateForm('', '', '', '');

    expect(errors.type).toEqual('name');
    expect(errors.msg).toEqual('But... what should I call you?');
  });

  test('validateForm returns email error when no email present', () => {
    const errors = ValidateForm('Mike DaRookie', '', '', '');

    expect(errors.type).toEqual('email');
    expect(errors.msg).toEqual('How about an email?');
  });

  test('validateForm returns email error when improperly formatted email passed', () => {
    const errors = ValidateForm('Mike DaRookie', 'test@test', '', '');

    expect(errors.type).toEqual('email');
    expect(errors.msg).toEqual("I don't think that one will work.");
  });

  test('validateForm returns message error when no message present', () => {
    const errors = ValidateForm('Mike DaRookie', 'test@test.ca', '', '');

    expect(errors.type).toEqual('message');
    expect(errors.msg).toEqual("Ok I'll guess. You want to talk about...");
  });

  test('validateForm returns captcha error when no captcha present', () => {
    const errors = ValidateForm('Mike DaRookie', 'test@test.ca', 'message', '');

    expect(errors.type).toEqual('captcha');
    expect(errors.msg).toEqual('Please check the captcha');
  });

  test('validateForm returns no errors with proper info passed', () => {
    const errors = ValidateForm(
      'Mike DaRookie',
      'test@test.ca',
      'message',
      'captchaString'
    );

    expect(errors.type).toEqual('');
    expect(errors.msg).toEqual('');
  });
});

describe('returns properly from axios post to /api/sendmail', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const info = {
    name: 'Mike DaRookie',
    email: 'mike@email.com',
    message: 'Hello there!',
  };

  test('returns success from post', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const mockedResponse: AxiosResponse = {
      data: {
        Type: 'ok',
        Message: "Thanks Got It! I'll be in touch soon.",
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.post.mockResolvedValue(mockedResponse);

    expect(axios.post).not.toHaveBeenCalled();

    const actual = await axios.post('/api/sendmail', info);

    expect(axios.post).toHaveBeenCalled();
    expect(actual.data.Type).toEqual('ok');
    expect(actual.data.Message).toEqual(
      "Thanks Got It! I'll be in touch soon."
    );
  });
});
